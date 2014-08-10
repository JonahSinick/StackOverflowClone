module Api
  class VotesController < ApiController

    def create
      @vote = Vote.new(vote_params)
      if @vote.user_id == current_user.id
        @vote.errors << "User can't vote on own content"
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
      current_object = self.current_object
      @old_score = current_object.score
      @score_from_others = @old_score      
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
      @old_score = current_object.score      
      @score_from_others = @old_score - @vote.value
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
      votable_id = Integer(params[:votable_id])
      if params[:votable_type] == "Question"
        return Question.find(votable_id)
      elsif params[:votable_type] == "Answer"
        return Answer.find(votable_id)
      elsif params[:votable_type] == "Comment"
        return Comment.find(votable_id)
      end
    end  

    
    def set_score_and_karma

      if (params[:votable_type] == "Question") || (params[:votable_type] == "Answer")
        magnitude = 10
      elsif params[:votable_type] == "Comment"
        magnitude = 1
      end
      @new_score = @score_from_others + @vote.value
      @new_karma = object_author.karma + (@new_score - @old_score)*magnitude
      object_author.update_attributes({karma: @new_karma})
      current_object.update_attributes({score: @new_score})
    end
    
    def object_author
      User.find(self.current_object.author_id)
    end
    
    def vote_params
      params.permit(:votable_id, :votable_type, :value, :user_id)
    end

  end
end