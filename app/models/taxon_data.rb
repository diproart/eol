#encoding: utf-8
# NOTE - I had to change a whole bunch of "NOT IN" clauses because they weren't working (SPARQL syntax error in my
# version.)  I think this will be fixed in later versions (it works for PL), but for now, this seems to work.
class TaxonData < TaxonUserClassificationFilter

  DEFAULT_PAGE_SIZE = 30

  def self.graph_name_to_resource_id(graph_name)
    graph_name.to_s.split("/").last
  end

  def self.search(options={})
    return nil if options[:querystring].blank?
    options[:per_page] ||= TaxonData::DEFAULT_PAGE_SIZE
    total_results = EOL::Sparql.connection.query(prepare_search_query(options.merge(:only_count => true))).first[:count].to_i
    results = EOL::Sparql.connection.query(prepare_search_query(options))
    TaxonData.add_known_uris_to_data(results)
    WillPaginate::Collection.create(options[:page], options[:per_page], total_results) do |pager|
       pager.replace(results)
    end
  end

  def self.prepare_search_query(options={})
    options[:per_page] ||= TaxonData::DEFAULT_PAGE_SIZE
    options[:page] ||= 1
    if options[:only_count]
      query = "SELECT COUNT(*) as ?count"
    else
      query = "SELECT ?data_point_uri, ?attribute, ?value, ?taxon_concept_id, ?unit_of_measure_uri"
    end
    query += " WHERE {
        ?data_point_uri a <#{DataMeasurement::CLASS_URI}> .
        ?data_point_uri dwc:taxonID ?taxon_id .
        ?taxon_id dwc:taxonConceptID ?taxon_concept_id .
        ?data_point_uri dwc:measurementType ?attribute .
        ?data_point_uri dwc:measurementValue ?value .
        OPTIONAL {
          ?data_point_uri dwc:measurementUnit ?unit_of_measure_uri .
        } . "
    if options[:from] && options[:to]
      query += "FILTER(xsd:float(?value) >= #{options[:from]} AND xsd:float(?value) <= #{options[:to]}) . "
    elsif options[:querystring].is_numeric?
      query += "FILTER(xsd:float(?value) = #{options[:querystring]}) . "
    else
      query += "FILTER(REGEX(?value, '#{options[:querystring]}', 'i')) . "
    end
    if options[:attribute]
      query += "?data_point_uri dwc:measurementType <#{options[:attribute]}> . "
    end
    query += "}"
    unless options[:only_count]
      query += " LIMIT #{options[:per_page]} OFFSET #{((options[:page].to_i - 1) * options[:per_page])}"
    end
    return query
  end

  # TODO - break down into friendlier syntax. :)
  def get_data
    return @rows if @rows
    rows = TaxonDataSet.new(data, taxon_concept_id: taxon_concept.id, language: user.language)
    rows.each do |row|
      if user_added_data = TaxonData.get_user_added_data(row[:data_point_uri])
        row[:user] = user_added_data.user
        row[:user_added_data] = user_added_data
        row[:source] = row[:user]
      end
      if row[:graph]
        row[:resource_id] = TaxonData.graph_name_to_resource_id(row[:graph])
      end
    end
    # bulk preloading of resources/content partners
    resources = Resource.find_all_by_id(rows.collect{ |r| r[:resource_id] }.compact.uniq, :include => :content_partner)
    rows.each do |row|
      if resource_id = row[:resource_id].to_i
        if resource = resources.detect{ |r| r.id == resource_id }
          row[:source] = resource.content_partner
        end
      end
    end

    TaxonData.add_known_uris_to_data(rows)
    TaxonData.replace_taxon_concept_uris(rows, :target_taxon_concept_id)
    TaxonData.preload_target_taxon_concepts(rows)
    rows.sort
    known_uris = rows.select { |d| d[:attribute].is_a?(KnownUri) }.map { |d| d[:attribute] }
    KnownUri.preload_associations(known_uris,
                                  [ { :toc_items => :translations },
                                    { :known_uri_relationships_as_subject => :to_known_uri },
                                    { :known_uri_relationships_as_target => :from_known_uri } ] )
    @categories = known_uris.flat_map(&:toc_items).uniq.compact
    @rows = rows
  end

  def get_data_for_overview
    picker = TaxonDataExemplarPicker.new(self)
    picker.pick(get_data)
  end

  def categories
    get_data unless @categories
    @categories
  end

  private

  def self.get_user_added_data(value)
    if value && matches = value.to_s.match(UserAddedData::URI_REGEX)
      uad = UserAddedData.find(matches[1])
      return uad if uad
    end
    nil
  end

  def data
    (measurement_data + association_data).delete_if{ |k,v| k[:attribute].blank? }
  end

  def measurement_data(options = {})
    selects = "?attribute ?value ?unit_of_measure_uri ?data_point_uri ?graph"
    query = "
      SELECT DISTINCT #{selects}
      WHERE {
        GRAPH ?graph {
          ?data_point_uri a <#{DataMeasurement::CLASS_URI}> .
          ?data_point_uri dwc:measurementType ?attribute .
          ?data_point_uri dwc:measurementValue ?value .
          OPTIONAL {
            ?data_point_uri dwc:measurementUnit ?unit_of_measure_uri
          }
        } .
        {  ?data_point_uri dwc:taxonConceptID <#{UserAddedData::SUBJECT_PREFIX}#{taxon_concept.id}> }
        UNION {
          ?data_point_uri dwc:occurrenceID ?occurrence .
          ?occurrence dwc:taxonID ?taxon .
          ?data_point_uri <http://eol.org/schema/measurementOfTaxon> 'true' .
          GRAPH ?resource_mappings_graph {
            ?taxon dwc:taxonConceptID <#{UserAddedData::SUBJECT_PREFIX}#{taxon_concept.id}>
          }
        }
      }
      LIMIT 800"
    EOL::Sparql.connection.query(query)
  end

  def association_data(options = {})
    selects = "?attribute ?value ?target_taxon_concept_id ?inverse_attribute ?data_point_uri ?graph"
    query = "
      SELECT DISTINCT #{selects}
      WHERE {
        GRAPH ?resource_mappings_graph {
          ?taxon dwc:taxonConceptID <#{UserAddedData::SUBJECT_PREFIX}#{taxon_concept.id}> .
          ?value dwc:taxonConceptID ?target_taxon_concept_id
        } .
        GRAPH ?graph {
          ?occurrence dwc:taxonID ?taxon .
          ?target_occurrence dwc:taxonID ?value .
          ?data_point_uri a <#{DataAssociation::CLASS_URI}> .
          {
            ?data_point_uri dwc:occurrenceID ?occurrence .
            ?data_point_uri <http://eol.org/schema/targetOccurrenceID> ?target_occurrence .
            ?data_point_uri <http://eol.org/schema/associationType> ?attribute
          }
          UNION
          {
            ?data_point_uri dwc:occurrenceID ?target_occurrence .
            ?data_point_uri <http://eol.org/schema/targetOccurrenceID> ?occurrence .
            ?data_point_uri <http://eol.org/schema/associationType> ?inverse_attribute
          }
        } .
        OPTIONAL {
          GRAPH ?mappings {
            ?inverse_attribute owl:inverseOf ?attribute
          }
        }
      }
      LIMIT 800"
    EOL::Sparql.connection.query(query)
  end

  def self.add_known_uris_to_data(rows)
    known_uris = KnownUri.where(["uri in (?)", uris_in_data(rows)])
    rows.each do |row|
      replace_with_uri(row, :attribute, known_uris)
      replace_with_uri(row, :value, known_uris)
      replace_with_uri(row, :unit_of_measure_uri, known_uris)
      if taxon_id = KnownUri.taxon_concept_id(row[:value])
        row[:target_taxon_concept_id] = taxon_id
      end
    end
  end

  def self.replace_with_uri(hash, key, known_uris)
    uri = known_uris.find { |known_uri| known_uri.matches(hash[key]) }
    hash[key] = uri if uri
  end

  def self.replace_taxon_concept_uris(rows, taxon_concept_uri_key)
    rows.each do |r|
      if r.has_key?(taxon_concept_uri_key)
        r[taxon_concept_uri_key] = KnownUri.taxon_concept_id(r[taxon_concept_uri_key])
      end
    end
  end

  def self.uris_in_data(rows)
    uris  = rows.map { |row| row[:attribute] }.select { |attr| attr.is_a?(RDF::URI) }
    uris += rows.map { |row| row[:value] }.select { |attr| attr.is_a?(RDF::URI) }
    uris += rows.map { |row| row[:unit_of_measure_uri] }.select { |attr| attr.is_a?(RDF::URI) }
    uris.map(&:to_s).uniq
  end

  def self.preload_target_taxon_concepts(rows)
    rows_with_taxon_data = rows.select{ |row| row.has_key?(:target_taxon_concept_id) }
    # bulk lookup all concepts for every row that has one
    taxon_concepts = TaxonConcept.find_all_by_id(rows_with_taxon_data.collect{ |row| row[:target_taxon_concept_id] }.
      compact.uniq, :include => [ { :preferred_common_names => :name },
                                  { :preferred_entry => { :hierarchy_entry => { :name => :ranked_canonical_form } } } ] )
    # now distribute the taxon concept instances to the appropriate rows
    rows_with_taxon_data.each do |row|
      if taxon_concept = taxon_concepts.detect{ |tc| tc.id.to_s == row[:target_taxon_concept_id] }
        row[:target_taxon_concept] = taxon_concept
      end
    end
    rows
  end

end
