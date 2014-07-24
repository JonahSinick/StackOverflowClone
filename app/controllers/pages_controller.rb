class PagesController < ApplicationController
  
  include SessionsHelper
  
  before_action :check_signed_in
  
  def root
  end
  
  private
  
  def check_signed_in
    unless current_user
      redirect_to new_session_url
    end
  end
end
