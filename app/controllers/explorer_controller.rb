require 'pry'
require 'json'


class ExplorerController < ApplicationController

	#this controller uses the default view names for each of the following actions
	#TODO - break mywork, product and ingredients into own controllers

	def productview

		  
	end

	def ingredient

	end

	def prototypes

	end

	def documentlibrary
	
	end

	def mywork

		puts "HEEEEELLLLLOOOOO"
		puts ENV["OPP_API_URL"]
	end

	def sites

	end




end
