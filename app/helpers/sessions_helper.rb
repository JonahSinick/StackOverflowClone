module SessionsHelper
  include UsersHelper
  
  def current_user
    User.find_by_session_token(session[:session_token])
  end
  
  def sign_out(user)
    user.session_token = SecureRandom.base64
    session[:session_token] = nil
    redirect_to new_session_url
  end  
  
  
end
