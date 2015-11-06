module ApiConnection
	extend ActiveSupport::Concern
	
  def auth_api name
    HTTParty.post(
      "#{CONFIG['api_url']}#{CONFIG['auth_api_path']}", 
      :body => {name: name}.to_json,
      :headers => { 'Content-Type' => 'application/json' }
    )
  end

  def get_travelers_api token
  	HTTParty.get(
  		"#{CONFIG['api_url']}#{CONFIG['travelers_api_path']}",
  		headers: { 'Content-Type' => 'application/json', 'Authorization' => "Token token=#{token}" }
  	)
  end

  def update_destinations_api traveler, token
    HTTParty.patch(
      "#{CONFIG['api_url']}#{CONFIG['travelers_api_path']}/#{traveler['id']}", 
      :body => {destinations: traveler['destinations']}.to_json,
      :headers => { 'Content-Type' => 'application/json', 'Authorization' => "Token token=#{token}" }
    )
  end

  def get_cities query
    HTTParty.get(
      "#{CONFIG['cities_api_url']}?q=#{query}",
      headers: { 'Content-Type' => 'application/json' }
    )
  end
end