class PagesController < ApplicationController
  
  include SessionsHelper
    
  def root
  end
  
  private
  
  def check_signed_in
    unless current_user
      redirect_to new_session_url
    end
  end
end
