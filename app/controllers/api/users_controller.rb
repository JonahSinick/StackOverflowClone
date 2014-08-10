module Api
  class UsersController < ApiController


    def show
      @user = User.includes(:questions, :answers, :comments, :votes).find(params[:id])
      render :show
    end

    def index
      if params[:page] == - 1
        @users = User.order("karma DESC").find(:all, :select => 'id, username, description, karma, email')
      else
        @users = User.order("karma DESC").page(params[:page]).per(15).find(:all, :select => 'id, username, description, karma, email')
      end
      render json: @users      
    end
    

    def update
      @user = User.find(params[:id])

      if @user.update_attributes(user_params)
        render json: @user
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    
    def user_params
      params.require(:user).permit(:username, :description, :karma)
    end

  end
end