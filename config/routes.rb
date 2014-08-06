SOC::Application.routes.draw do



  root to: 'pages#root'


  resources :users, only: [:new, :create]
  
  resource :session, only: [:new, :create, :destroy, :show]
  
  
  namespace :api, defaults: { format: :json } do
    resources :users, except: [:new, :create]
    resources :questions, except: [:new, :edit]
    resources :answers, only: [:create, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy]
    resources :votes, only: [:create, :destroy, :show, :update]
    resources :tags, except: [:new, :edit]
    resources :favorite_tags, only: [:create, :destroy]
    resources :question_tags, only: [:create, :destroy]
  end
  
end
