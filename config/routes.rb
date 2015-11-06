Rails.application.routes.draw do
  get 'start', to: 'travelers#auth'
  post 'auth', to: 'travelers#auth'

  get 'travelers', to: 'travelers#list'

  post 'update_destinations', to: 'travelers#update_destinations'

  get 'find_wishlist_city', to: 'travelers#find_wishlist_city'

  get 'logout', to: 'travelers#logout'

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root 'travelers#auth'
end
