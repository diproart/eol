# A class to crawl over all the taxon pages and refresh them in various ways.
class Crawler
  @queue = "crawler"

  class << self
    def enqueue
      Crawler::SiteMapIndexer.create
      offset = 0
      # GOOG's limit is actually 10MB, which we should check (though it's hard
      # to predict), but this will almost certainly not exceed that!
      limit = 250
      ids = [] # Probably superfluous, but want to be safe because of #while
      begin
        ids = TaxonConcept.published.limit(limit).order(:id).offset(offset).pluck(:id)
        Resque.enqueue(Crawler, from: ids.first, to: ids.last)
        offset += limit
      end while ids.size > 0
    end

    # This is just a test, and it's not actually restricted to mammals, because
    # we don't do IDs specifically by clade... There are about 70K of these.
    def enqueue_all_mammals
      Crawler::SiteMapIndexer.create
      offset = 0
      limit = 250
      all_ids = TaxonConceptsFlattened.descendants_of(1642).pluck(:taxon_concept_id)
      begin
        ids = all_ids[offset..offset+limit]
        Resque.enqueue(Crawler, from: ids.first, to: ids.last)
        offset += limit
      end while offset < all_ids.size
    end

    # This is just a test, and it's not actually restricted to carnivores,
    # because we don't do IDs specifically by clade... There are about 4200 of these.
    def enqueue_all_carnivores
      Crawler::SiteMapIndexer.create
      offset = 0
      limit = 250
      all_ids = TaxonConceptsFlattened.descendants_of(7662).pluck(:taxon_concept_id)
      begin
        ids = all_ids[offset..offset+limit]
        Resque.enqueue(Crawler, from: ids.first, to: ids.last)
        offset += limit
      end while offset < all_ids.size
    end

    def perform(options)
      unless options["from"] && options["to"]
        return EOL.log("Crawler: FAILED... from/to missing: #{options.inspect}",
          prefix: "!")
      end
      EOL.log("Crawler start: (#{options["from"]}-#{options["to"]})", prefix: "C")
      taxa = TaxonConcept.published.
               where(["id >= ? AND id <= ?", options["from"], options["to"]])
      with_output_file(options) do |filename|
        count = taxa.count
        taxa.each_with_index do |concept, index|
          size = add_taxon_to_file(filename, concept)
          EOL.log("#{index}/#{count}: #{concept.id} (#{size})",
            prefix: ".") if size && size > 0 && index % 100 == 0
          # Minimize load on production:
          sleep(1)
        end
      end
      EOL.log("Crawler finished (through #{options["to"]}).")
    end

    def with_output_file(options, &block)
      filename = Crawler::DataFeeder.create(options)
      yield(filename)
      Crawler::SiteMapIndexer.add_sitemap(filename)
    end

    # NOTE: We're NOT adding taxa unless they have traits! This may not be
    # desireable... we might want to know the names and the sameAs's for the
    # page. ...TODO: choose?
    def add_taxon_to_file(filename, concept)
      begin
        pj = PageJson.for(concept.id)
        return unless pj && pj.has_traits?
        Crawler::DataFeeder.add_json(filename, pj.ld)
      rescue => e
        EOL.log("ERROR on page #{concept.id}:", prefix: "!")
        EOL.log_error(e)
        0
      end
    end
  end
end
