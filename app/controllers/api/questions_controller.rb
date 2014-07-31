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
        if params[:author_id] && params[:type] = 
          @questions = Question.where(author_id: Integer(params[:author_id])).order("score DESC").page(params[:page]).per(15).find(:all, :select => 'id, title, author_name, author_id, created_at, score')
        elsif params[:voter_id]
          @questions = Question.where(voter_id: Integer(params[:author_id])).pluck(:title).order("score DESC").page(params[:page]).per(15).find(:all, :select => 'id, title, author_name, author_id, created_at, score')
        elsif params[:search] 
          @questions = Question.where("title LIKE ? OR body like ?", "%#{params[:search]}%", "%#{params[:search]}%").order("score DESC").page(params[:page]).per(15)
        else
          @questions = Question.order("score DESC").page(params[:page]).per(15).find(:all, :select => 'id, title, author_name, created_at, score')
        end
      end        
      if params[:all_titles]
        @questions = Question.find(:all, :select => 'id, title, author_name, created_at, score')
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
