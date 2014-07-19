module UsersHelper
  
  
  def ensure_session_token(user)
    user.session_token ||= SecureRandom.base64
  end
  
  
  def sign_in(user)
    session[:session_token] = user.session_token
    redirect_to root_url
  end
  
  def user_params
    params.require(:user).permit(:username, :email, :password, :session_token)
  end
  
  
  
end
