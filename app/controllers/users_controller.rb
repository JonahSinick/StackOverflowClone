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
  
  def show
    @user = User.includes(:authored_questions, :authored_answers, :authored_comments, :cast_votes).find(params[:id])
    render json: @user
  end
  
  
  def index
    @users = User.all
    render json: @users
  end


  def user_params
    params.require(:user).permit(:username, :email, :password, :session_token)
  end

  
end
