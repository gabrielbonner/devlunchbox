class LunchboxesController < ApplicationController
   skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @markers = Marker.all
  end

  def create
    puts "These are the params: #{params.inspect}"
    marker = Marker.new(
      name: params['name'],
      description: params['description'],
      latitude: params['latitude'],
      longitude: params['longitude'],
      tagwords: params['tags']
      )
    if marker.save
        render json: [{ :confirmation => "Your lunchbox marker was saved to the database." }], :status => 200
    else
        render :json => [{ :error => "An error was encountered while attempting to save your marker. Please try again." }], :status => 304
    end
  end

end
