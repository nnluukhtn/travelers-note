require 'rails_helper'

RSpec.describe TravelersController, type: :controller do

  describe 'GET #auth' do
    it 'returns http success' do
      get :auth
      expect(response).to have_http_status(:success)
    end

    describe 'GET #auth after signin' do
      before do
        post :auth, {traveler_name: 'amos'}, format: :json
        @user = session[:user]
      end

      it 'returns http redirect to travelers_url' do
        get :auth
        expect(response).to redirect_to(travelers_url)
      end
    end
  end

  describe 'POST #auth' do

    it 'returns http redirect to root_url with missing params' do
      post :auth
      expect(response).to redirect_to(root_url)
    end

    it 'returns http redirect to root_url with invalid data' do
      post :auth, {traveler_name: 'invalid'}
      expect(response).to redirect_to(root_url)
    end

    it 'returns http redirect to travelers_url with valid data' do
      post :auth, {traveler_name: 'amos'}, format: :json
      expect(response).to redirect_to(travelers_url)
    end
  end

  describe 'GET #list' do
    it 'returns action controller routing error with no authorization header' do
      expect{get :list}.to raise_error( ActionController::RoutingError)
    end

    describe 'GET #list after signin' do
      before do
        post :auth, {traveler_name: 'amos'}, format: :json
        @user = session[:user]
      end

      it 'returns list travelers' do
        session[:user] = @user
        get :list
        expect(response).to have_http_status(:success)
      end
    end
  end

end
