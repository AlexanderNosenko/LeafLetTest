class LocationsController < ApplicationController
  def index  
    respond_to do |format|
        format.html {@locations = Location.paginate(:page => params[:page], :per_page => 10)}
        format.json do
          #require 'rgeo'
          render json: Location.find(params[:id]).area.coordinates
        end
    end 
  end

  def show
    @location = Location.find(params[:id])
  end

  def new
    @location = Location.new
  end
  def create
    flash[:error] = Location.create(location_params).errors.full_messages
    if flash[:error].blank?
      redirect_to location_path(Location.last), notice: 'Success!' 
    else
      redirect_to new_location_path 
    end
    
  end
  def edit
     @location = Location.find(params[:id])
  end

  def update
    @location = Location.find(params[:id])
  end
  private
  def location_params
    params[:location][:area] = 'POLYGON((' + params[:location][:area] + '))'
    params.require(:location).permit(:area, :name)
  end
end
