module Api
  class CommentsController < ApiController

    def create
      @comment = Comment.new(comment_params)
      if @comment.commentable_type == "question"
        @comment = current_question.comments.new(comment_params)
      elsif @comment.commentable_type == "answer"
        @comment = current_answer.comments.new(comment_params)
      end
      @comment.author_name = current_user.username
      @comment.author_id = current_user.id
      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
    #   @comment = Comment.find(params[:id])
    #   @comment.destroy
    #   render json: {}
    end
    #
    def update
    #   @comment = current_question.comments.find(params[:id])
    #
    #   if @comment.update_attributes(comment_params)
    #     render json: @comment
    #   else
    #     render json: @comment.errors.full_messages, status: :unprocessable_entity
    #   end
    end

    # private


    def current_question
      if params[:comment]
        return Question.find(params[:comment][:commentable_id])
      end
    end

    def current_answer
      if params[:comment]
        @answer = Answer.find(params[:comment][:commentable_id])
      end
    end

    def comment_params
      params.require(:comment).permit(:body, :author_id, :author_name, :commentable_type, :commentable_id)
    end
  end
end