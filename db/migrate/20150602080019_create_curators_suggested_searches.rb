class CreateCuratorsSuggestedSearches < ActiveRecord::Migration
  def change
    create_table :curators_suggested_searches do |t|
      t.string   :label, null: false
      t.string   :q
      t.float    :from
      t.float    :to
      t.string   :sort, default: 'desc'
      t.string   :uri, null: false
      t.string   :unit_uri
      t.integer  :taxon_concept_id
      t.timestamps
    end
  end
end