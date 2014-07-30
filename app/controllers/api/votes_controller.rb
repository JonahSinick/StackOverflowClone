module Api
  class VotesController < ApiController

    def create

      @vote = Vote.new(vote_params)
      current_object = self.current_object
      @vote = current_object.votes.new(vote_params)
      @vote.user_id = current_user.id
      if @vote.save
        set_score_and_karma
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @vote = Vote.find(params[:id])
      if @vote.update_attributes(vote_params)
        self.set_score_and_karma
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
        
    def current_object
      votable_id = @vote.votable_id
      if @vote.votable_type == "Question"
        return Question.find(votable_id)
      elsif @vote.votable_type == "Answer"
        return Answer.find(votable_id)
      elsif @vote.votable_type == "Comment"
        return Comment.find(votable_id)
      end
    end  
    
    def set_score_and_karma
      if votable_type = "Question" || "Answer"
        magnitude = 10
      elsif votable_type = "Comment"
        magnitude = 1
      end
      
      score_from_others = Integer(params[:score_from_others])
      new_score = score_from_others + @vote.value
      new_karma = score_from_others + @vote.value * magnitude
      object_author.update_attributes({karma: new_karma})
      current_object.update_attributes({score: new_score})
    end
    
    def object_author
      User.find(self.current_object.author_id)
    end
    
    def vote_params
      params.permit(:votable_id, :votable_type, :value, :user_id)
    end

  end
end