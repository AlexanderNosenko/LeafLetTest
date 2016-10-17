class Location < ActiveRecord::Base
	validates :name, :area, presence: true
end
