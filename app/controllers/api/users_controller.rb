module Api
  class UsersController < ApiController


    def show
      @user = User.includes(:questions, :answers, :comments, :votes).find(params[:id])
      render :show
    end


    def index
      if params[:page] == - 1
        @users = User.all
      else
        @users = User.order("id DESC").page(params[:page]).per(15)
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
      params.require(:user).permit(:username, :description)
    end

  end
end