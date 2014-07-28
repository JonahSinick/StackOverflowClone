module VotesHelper

  def score 
    count = 0
    self.votes.each do |vote|
      if vote.value > 0
        count += 1
      elsif vote.value < 0
        count -= 1
      end
    end
    count
  end
end
