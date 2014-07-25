SOC::Application.routes.draw do



  root to: 'pages#root'


  resources :users
  
  resource :session, only: [:new, :create, :destroy]
  
  
  namespace :api, defaults: { format: :json } do
    resources :questions, except: [:new, :edit]
    resources :answers, only: [:create, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy]
  end
  
end
