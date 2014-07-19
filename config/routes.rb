SOC::Application.routes.draw do
  resources :answers

  resources :questions

  resources :users, only: [:new, :create]
  
  resource :session, only: [:new, :create, :destroy]
  
  root to: 'pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :update, :edit, :destroy]
  end
  
end
