require 'rack'

app = proc do |env|
  Rack::File.new('/Users/ben/pif/opp-explorer').call(env)
end

run app