class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    ensure_session_token(@user)
    
    flash.now[:errors] = []
    
    if user_params[:guest_id]
      @user.username = "guest" + rand(1..10000).to_s
      @user.password = SecureRandom.base64
      @user.email = "guest" + rand(1..10000).to_s + '@stackoverflowclone.com'
    elsif params[:user][:password].length == 0
      flash.now[:errors] = ["Password can't be blank"]
    elsif params[:user][:password].length < 6
      flash.now[:errors] = ["Password must be at least 6 characters"]
    end

    if @user.save
      sign_in(@user)
    else
      flash.now[:errors] = flash.now[:errors].concat(@user.errors.full_messages)
      render :new
    end
    
  end
  

  def user_params
    params.require(:user).permit(:username, :email, :password, :session_token, :guest_id)
  end

  
end
