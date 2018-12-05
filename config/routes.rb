Rails.application.routes.draw do
  devise_for :users

  root 'groups#index'

  resource :groups, only:[:new, :create, :edit, :update] do
    resource :messages, only:[:index, :create]
  end

  resources :users, only: [:index, :edit, :update]

end
