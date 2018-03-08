Rails.application.routes.draw do
  resources :units, only: :index
  root 'units#index'
end
