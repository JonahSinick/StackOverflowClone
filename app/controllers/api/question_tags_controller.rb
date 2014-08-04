module Api
  class QuestionTagsController < ApiController

    def create      
      @question_tag = QuestionTag.new(question_tag_params)
      @question = Question.find(question_tag_params[:question_id])
      if @question.question_tags.length > 5
        @question_tag << ["This question already has 5 tags."]
        render json: @question_tag.errors.full_messages, status: :unprocessable_entity
      end
      if @question_tag.save
        render json: @question_tag
      else
        render json: @question_tag.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @question_tag = QuestionTag.find(question_tag_params)
      @question_tag.destroy
      render json: {}
    end
    
    def question_tag_params
      params.require(:question_tag).permit(:question_id, :tag_id)
    end
  end
end