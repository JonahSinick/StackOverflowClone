module Api
  class QuestionsController < ApiController
    def create
      @question = Question.new(question_params)

      if @board.save
        render json: @question
      else
        render json: @question.errors.full_messages, status: :unprocessable_entity
      end
    end

    # def destroy
    #   @question = Question.find(params[:id])
    #   @board.try(:destroy)
    #   render json: {}
    # end

    def index
      @questions = Question.order("id").page(params[:page])
      render json: @questions
    end

    def show
      @question = Question.includes(:answers).find(params[:id])
      render :show
    end

    private

    def question_params
      params.require(:question).permit(:title)
    end
  end
end
