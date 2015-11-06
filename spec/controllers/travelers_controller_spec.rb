require 'rails_helper'

RSpec.describe TravelersController, type: :controller do

  describe "GET #auth" do
    it "returns http success" do
      get :auth
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #list" do
    it "returns http success" do
      get :list
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #update_destinations" do
    it "returns http success" do
      get :update_destinations
      expect(response).to have_http_status(:success)
    end
  end

end
