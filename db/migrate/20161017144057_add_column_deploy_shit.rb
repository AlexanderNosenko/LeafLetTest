class AddColumnDeployShit < ActiveRecord::Migration
  def change 
  	add_column :locations, :area, :geometry
  end
end
