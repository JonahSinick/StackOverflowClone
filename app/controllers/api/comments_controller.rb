module Api
  class CommentsController < ApiController

    def create
      @comment = Comment.new(comment_params)

      @comment.author_name = current_user.username
      @comment.author_id = current_user.id
      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy
      render json: {}
    end
    #
    def update
      @comment = Comment.find(params[:id])
      if @comment.update_attributes(comment_params)
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    # private


    def comment_params
      params.require(:comment).permit(:body, :author_id, :author_name, :commentable_type, :commentable_id)
    end
  end
end