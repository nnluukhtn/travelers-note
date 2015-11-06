class TravelersController < ApplicationController
	include ApiConnection

	before_action :authorize_user, except: [:auth, :find_wishlist_city]

  def auth
  	if request.post?
  		begin
  			user_info = auth_api(params[:traveler_name])
  		rescue Exception => e
  			logger.error("Exception when use auth api: #{e}")
  			redirect_to root_path and return
  		end
  		redirect_to root_path and return if user_info.nil? || user_info.code != 200
  		session[:user] = JSON.parse(user_info.body)

  		redirect_to travelers_path
  	else
      redirect_to travelers_path if session[:user]
    end
  end

  def list
  	begin
  		travelers = get_travelers_api(session[:user]['token'])
  	rescue Exception => e
			logger.error("Exception when use travelers api: #{e}")
			not_found and return
		end

		not_found and return if travelers.nil? || travelers.code != 200
		@travelers = JSON.parse(travelers.body)
  end

  def update_destinations
    begin
      destinations = update_destinations_api(params[:traveler], session[:user]['token'])
      destinations = JSON.parse(destinations.body)
    rescue Exception => e
      logger.error("Exception when use update destinations api: #{e}")
      render :json => {}, status: 400
    end

    respond_to do |format|
      format.json { render :json => {destinations: destinations} }
    end
  end

  def logout
  	session[:user] = nil
  	redirect_to root_path
  end

  def find_wishlist_city
    begin
      cities = get_cities(params[:q])
      cities = JSON.parse(cities.body)
      puts "cities: #{cities}"
      result = {
        q: params[:q],
        suggestions: cities.select{|s| s.present? }.map!{
          |s| {value: s, data: s.gsub(/(?=( City)|\,).*/, '')}
        }
      }
      puts "result: #{result}"
    rescue Exception => e
      logger.error("Exception when use cities api: #{e}")
      result = {q: params[:q], suggestions: []}
    end

    respond_to do |format|
      format.json { render :json => result }
    end
  end

  private

  def authorize_user
  	not_found if session[:user].nil?
  end
end
