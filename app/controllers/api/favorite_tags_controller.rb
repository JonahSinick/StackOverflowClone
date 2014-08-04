module Api
  class FavoriteTagsController < ApiController

    def create      
      @favorite_tag = QuestionTag.new(question_tag_params)
      if @favorite_tag.save
        render json: @favorite_tag
      else
        render json: @favorite_tag.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @favorite_tag = QuestionTag.find(favorite_tag_params)
      @favorite_tag.destroy
      render json: {}
    end
    
    def favorite_tag_params
      params.require(:favorite_tag).permit(:user_id, :tag_id)
    end
  end
end