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
      @questions = Question.all
      if params[:author_id]
        @questions = @questions.where(author_id: Integer(params[:author_id]))
      end
      
      if params[:search]
        @questions = @questions.where("title LIKE ? OR body like ?", "%#{params[:search]}%", "%#{params[:search]}%")
      end
      
      if params[:page]
        @questions = @questions.order("id DESC").page(params[:page]).per(15)
      end
      render json: @questions      
    end

    def show
      @question = Question.includes(:answers, :comments).find(params[:id])
      @question.current_user_vote_get(current_user)
      @question.answers.each do |answer|
        answer.current_user_vote_get(current_user)
        answer.comments.each do |comment|
          comment.current_user_vote_get(current_user)
        end
      end
      @question.comments.each do |comment|
        comment.current_user_vote_get(current_user)
      end
      current_user_vote = Vote.where({votable_id: @question.id, user_id: current_user.id})[0]
      if current_user_vote
        @question.current_user_vote = current_user_vote
      end
      render :show
    end

    private

    def question_params
      params.require(:question).permit(:title, :body, :score)
    end
    

  end
end
