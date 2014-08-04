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
      unless params[:all_titles]
        params[:page] ||= 1
        if params[:user_id] && params[:type] == "authored"
          @questions = Question.where(author_id: Integer(params[:user_id])).order("score DESC").page(params[:page]).per(15).find(:all, :select => 'id, title, author_name, author_id, created_at, score, answer_count')
        elsif params[:user_id] && params[:type] == "upvoted"
          @question_ids = Vote.where(votable_type: "Question", value: 1, user_id: Integer(params[:user_id])).pluck(:votable_id)
          @questions = Question.where(id: @question_ids).order("score DESC").page(params[:page]).per(15).find(:all, :select => 'id, title, author_name, author_id, created_at, score, answer_count')
        elsif params[:search] 
          @questions = Question.where("title LIKE ? OR body like ?", "%#{params[:search]}%", "%#{params[:search]}%").order("score DESC").page(params[:page]).per(15)
        else
          @questions = Question.order("score DESC").page(params[:page]).per(15).find(:all, :select => 'id, title, author_name, created_at, score, answer_count')
        end
      end        
      if params[:all_titles]
        @questions = Question.find(:all, :select => 'id, title, author_name, created_at, score, answer_count')        
      end
      render json: @questions      
    end
    

    def show
      @question = Question.includes(:answers, :comments).find(params[:id])
      render :show
    end

    private

    def question_params
      params.require(:question).permit(:title, :body, :score)
    end
  end
end