SOC::Application.routes.draw do


  resources :comments

  root to: 'pages#root'


  resources :users
  
  resource :session, only: [:new, :create, :destroy]
  
  
  namespace :api, defaults: { format: :json } do
    resources :questions, except: [:new, :edit]
    resources :answers, only: [:create, :update, :destroy]
  end
  
end
