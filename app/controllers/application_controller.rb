class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  Figaro.load #in Rails 4.2 you need to initiaize it before you call it. 
  
  protect_from_forgery with: :exception
end
