module Api
  class VotesController < ApiController

    def create
      @vote = Vote.new(vote_params)
      if @vote.votable_type == "Question"
        @vote = current_question.votes.new(vote_params)
      elsif @vote.votable_type == "Answer"
        @vote = current_answer.votes.new(vote_params)
      end      
      @vote.user_id = current_user.id
      if @vote.save
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @vote = Vote.find(params[:id])
      if @vote.update_attributes(vote_params)
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
    end





    def destroy
      @vote = Vote.find(params[:id])
      @vote.destroy
      render json: {}
    end
    #
    #
    def current_question
      return Question.find(vote_params[:votable_id])
    end

    def current_answer
      return Answer.find(vote_params[:votable_id])
    end

    def current_object
      current_question || current_answer
    end
    # #
    # #
    def vote_params
      params.permit(:votable_id, :votable_type, :value, :user_id)
    end

  end
end