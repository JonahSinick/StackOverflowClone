class UsersController < ApplicationController

  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)

    ensure_session_token(@user)
    if @user.save
      sign_in(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  
end
