class LunchboxesController < ApplicationController
   skip_before_action :verify_authenticity_token

  def index
    @markers = Marker.all
  end

  def create
    puts "These are the params: #{params.inspect}"
    puts params[:tags]

    marker = Marker.new(
      name: params['name'],
      description: params['description'],
      latitude: params['latitude'],
      longitude: params['longitude'],
      tagwords: params['tags']
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
