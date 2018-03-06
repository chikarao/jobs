require 'exponent-server-sdk'
class API::TokensController < ApplicationController
  def create
    @token = PushToken.where(token: token_params["token"]).first
    if @token.present?

    else
      @token = PushToken.create(token_params)
      message = 'Registration successful'
      exponent.publish(
        exponentPushToken: @token.token,
        sound: 'default',
        message: message,
        data: {text: message}, # Data is required, pass any arbitrary data to include with the notification
      )
    end
    render json: {success: 'message'}
  end
  def new
  end
  def push
    @token = PushToken.where(token: token_params["token"]).first
    message = ''
    if @token.present?
      message = params["token"]["message"]
      exponent.publish(
        exponentPushToken: @token.token,
        sound: 'default',
        message: message,
        data: {text: message}, # Data is required, pass any arbitrary data to include with the notification
      )
    else
      message = 'failed: "' + token_params["token"] + '" does not exist'
    end
    render json: {notification: message}
  end
  private
  def token_params
    params.require(:token).permit(:token)
  end
  def exponent
    @exponent ||= Exponent::Push::Client.new
  end
end
