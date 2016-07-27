class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer  :marker_id
      t.string   :tagname

      t.timestamps null: false
    end
  end
end
