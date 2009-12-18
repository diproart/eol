# Name is used for storing different variations of names of species (TaxonConcept)
#
# These names are not "official."  If they have a CanonicalForm, the CanonicalForm is the "accepted" scientific name for the
# species.
#
# Even common names have an italicized form, which the PHP side auto-generates.  They can't always be trusted, but there are cases
# where a name is both common and scientific, so it must be populated.
#
# You might also want to see NormalizedName.  Name is broken down into unique parts (parsed by NormalizedName) which are linked back
# to a Name via NormalizedLinks
#
# NormalizedName is currently what we search on when we do string searches, then we use the NormalizedLink to find Name objects that
# use the NormalizedName ... and we can then find TaxonConcepts / HierarchyEntries that use the Name.
class Name < SpeciesSchemaModel

  belongs_to :canonical_form

  has_many :taxon_concept_names
  has_many :taxa
  has_many :hierarchy_entries
  has_many :normalized_links
  has_many :mappings

  validates_presence_of   :string
  validates_uniqueness_of :string
  validates_presence_of   :italicized
  validates_presence_of   :canonical_form

  def taxon_concepts
    return taxon_concept_names.collect {|tc_name| tc_name.taxon_concept}.flatten
  end

  def canonical
    return canonical_form.nil? ? 'not assigned' : canonical_form.string
  end

  def italicized_canonical
    # hoping these short-circuit messages help with debugging ... likely due to bad/incomplete fixture data?
    # return "(no canonical form, tc: #{ taxon_concepts.map(&:id).join(',') })" unless canonical_form
    return 'not assigned' unless canonical_form and canonical_form.string and not canonical_form.string.empty?
    return "<i>#{canonical_form.string}</i>"
  end

  # String representation of a Name is its Name#string
  def to_s
    string
  end

  # Duplicate of clean_name function from php code
  def self.clean_name(name)
    name = name.gsub(/[.,;]/," ").gsub(/[\-\(\)\[\]\{\}:&\*?×]/,' \0 ').gsub(/ (and|et) /," & ")
    name = name.gsub(/\s+/, " ").downcase
    name = name.gsub("À","à").gsub("Â","â").gsub("Å","å").gsub("Ã","ã").gsub("Ä","ä")
    name = name.gsub("Á","á").gsub("Æ","æ").gsub("C","c").gsub("Ç","ç").gsub("Č","č")
    name = name.gsub("É","é").gsub("È","è").gsub("Ë","ë").gsub("Í","í").gsub("Ì","ì")
    name = name.gsub("Ï","ï").gsub("Ň","ň").gsub("Ñ","ñ").gsub("Ñ","ñ").gsub("Ó","ó")
    name = name.gsub("Ò","ò").gsub("Ô","ô").gsub("Ø","ø").gsub("Õ","õ").gsub("Ö","ö")
    name = name.gsub("Ú","ú").gsub("Ù","ù").gsub("Ü","ü").gsub("R","r").gsub("Ŕ","ŕ")
    name = name.gsub("Ř","ř").gsub("Ŗ","ŗ").gsub("Š","š").gsub("Š","š").gsub("Ş","ş")
    name.gsub("Ž","ž").gsub("Œ","œ").strip
  end 

end

# == Schema Info
# Schema version: 20081020144900
#
# Table name: names
#
#  id                  :integer(4)      not null, primary key
#  canonical_form_id   :integer(4)      not null
#  namebank_id         :integer(4)      not null
#  canonical_verified  :integer(1)      not null
#  italicized          :string(300)     not null
#  italicized_verified :integer(1)      not null
#  string              :string(300)     not null

