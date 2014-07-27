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
    

  end
end