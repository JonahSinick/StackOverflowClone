module Api
  class AnswersController < ApiController
    

    
    def create
      @answer = current_question.answers.new(answer_params)
      @answer.author_id = current_user.id
      @answer.author_name = current_user.username
      if @answer.save
        current_question.answer_count += 1
        current_question.save
        render json: @answer
      else
        render json: @answer.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @answer = Answer.find(params[:id])
      current_question.answer_count -= 1
      current_question.save
      @answer.destroy
      render json: {}
    end

    def update
      @answer = current_question.answers.find(params[:id])

      if @answer.update_attributes(answer_params)
        render json: @answer
      else
        render json: @answer.errors.full_messages, status: :unprocessable_entity
      end
    end



    private


    def current_question
      if params[:answer]
        @question = Question.find(params[:answer][:question_id])
      end
    end

    def answer_params
      params.require(:answer).permit(:body, :question_id)
    end
  end
end