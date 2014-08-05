class SessionsController < ApplicationController


  def new
    if params[:previous_url]
      session[:previous_url] = params[:previous_url]
      flash.now[:errors] = [params[:errors]]
    end
    @user = User.new
  end
  
  def create
    unless params[:guest]
      @user = User.find_by_email(params[:user][:email])
      if (@user && @user.is_password?(params[:user][:password]))
        sign_in(@user)
      else
        @user = User.new
        flash.now[:errors] = ["Invalid credentials"]
        render :new
      end
    end
    #   u = User.first
    #   last_guest = User.where(guest_id: !nil).last
    #   @user = u.dup :include => [:votes, :favorite_tags, {:questions => [{:answers => :comments}, :comments]}]
    #   @user.username = u.username + last_guest.id.to_s + 1.to_s
    #   @user.email = u.email + last_guest.id.to_s + 1.to_s
    #   @user.session_token = SecureRandom.base64
    #   # @user.questions.each do |question|
    #   #   question.title = question.title + " "
    #   #   question.author_id = @user.id
    #   #   question.author_name = @user.username
    #   # end
    #   # @user.answers.each do |answer|
    #   #   answer.author_id = @user.id
    #   #   answer.author_name = @user.username
    #   # end
    #   # @user.comments.each do |comment|
    #   #   comment.author_id = @user.id
    #   #   answer.author_name = @user.username
    #   # end
    #   # @user.votes.each do |vote|
    #   #   vote.user_id = @user.id
    #   # end
    #   @user.save!
    #   sign_in(@user)
    # end
  end
  
  def destroy
    sign_out(current_user)
  end
  
  def show
    redirect_to root_url
  end
    
end
