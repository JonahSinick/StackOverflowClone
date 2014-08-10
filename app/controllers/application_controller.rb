class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  helper_method :ensure_session_token
  helper_method :sign_in
  helper_method :sign_out
  
  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end
  
  def ensure_session_token(user)
    user.session_token ||= SecureRandom.base64
  end
  
  
  def sign_in(user)
    ensure_session_token(user)
    session[:session_token] = user.session_token
    if session[:previous_url]
      redirect_to ("#" + session[:previous_url])
      session[:previous_url] = nil
    else
      redirect_to root_url
    end

  end


  def sign_out(user)
    if user.guest_id
      user.destroy
    else
      user.session_token = SecureRandom.base64
      session[:session_token] = nil
    end
    redirect_to root_url
  end  
  
end
