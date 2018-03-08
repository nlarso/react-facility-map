require 'test_helper'

class UnitsControllerTest < ActionDispatch::IntegrationTest
  test 'index' do
    get units_path
    assert_response :success
  end
end
