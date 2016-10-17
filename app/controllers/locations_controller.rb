class LocationsController < ApplicationController
  before_action :prepare_location, except: [:new, :create, :index]
  def index  
    @locations = Location.paginate(:page => params[:page], :per_page => 10)
  end

  def show
    respond_to do |format|
      format.html {}
      format.json do
        #require 'rgeo'
        render json:  @location.area.coordinates
      end
    end
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
  end

  def update
  end

  private
  def prepare_location
     @location = Location.find(params[:id])
  end
  def location_params
    params[:location][:area] = 'POLYGON((' + params[:location][:area] + '))'
    params.require(:location).permit(:area, :name)
  end
end
