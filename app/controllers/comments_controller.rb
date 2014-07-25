module Api
  class CommentsController < ApiController
    
    def create
      @comment = current_question.comments.new(comment_params)
      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = Answer.find(params[:id])
      @comment.destroy
      render json: {}
    end

    def update
      @comment = current_question.comments.find(params[:id])

      if @comment.update_attributes(comment_params)
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    private


    def current_question
      if params[:comment]
        @question = Question.find(params[:comment][:question_id])
      end
    end

    def comment_params
      params.require(:comment).permit(:body, :author_id, :author_name, :commentable_type, :commentable_id)
    end
  end
end