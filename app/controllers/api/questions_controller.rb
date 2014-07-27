module Api
  class QuestionsController < ApiController
    def create
      @question = Question.new(question_params)
      @question.author_id = current_user.id
      @question.author_name = current_user.username

      if @question.save
        render json: @question
      else
        render json: @question.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @question = Question.find(params[:id])
      @question.try(:destroy)
      render json: {}
    end

    def index
      if params[:page] == - 1
        @questions = Question.all
      else
        @questions = Question.order("id DESC").page(params[:page]).per(15)
      end
      render json: @questions      
    end

    def show
      @question = Question.includes(:answers, :comments).find(params[:id])
      render :show
    end

    private

    def question_params
      params.require(:question).permit(:title, :body)
    end
  end
end
