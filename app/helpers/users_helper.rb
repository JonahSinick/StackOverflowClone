module UsersHelper
  
  

  
  def user_params
    params.require(:user).permit(:username, :email, :password, :session_token)
  end
  
  
  
end
