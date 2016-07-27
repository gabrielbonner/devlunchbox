class CreateMarkers < ActiveRecord::Migration
  def change
    create_table :markers do |t|
      t.string   :name
      t.string   :description
      t.string   :tags
      t.string   :latitude
      t.string   :longitude
      t.text     :infowindow

      t.timestamps null: false
    end
  end
end
