class LunchboxesController < ApplicationController
  def index
    @markers = Marker.all
  end

  def create
    marker = Marker.new(
      name: params[:name],
      description: params[:description],
      tags: params[:tags],
      latitude: params[:latitude],
      longitude: params[:longitude],
      infowindow: params[:infowindow]
      )
    if marker.save
      status 200
      return marker.to_json
    else
      status 422
      return "Your marker instance could not be saved, please try again."
    end
  end

end
