# frozen_string_literal: true

module HomeConcern
  extend ActiveSupport::Concern
  included { before_action :authenticate_user! }

  def index
    @body_classes           = 'app-body'
    @token                  = current_session.token
    @web_settings           = Web::Setting.find_by(user: current_user)&.data || {}
    @admin                  = Account.find_local(Setting.site_contact_username)
    @streaming_api_base_url = Rails.configuration.x.streaming_api_base_url
  end

  private

  def authenticate_user!
    redirect_to(find_redirect_path_from_request) unless user_signed_in?
  end

  def find_redirect_path_from_request
    return account_path(Account.first) if single_user_mode?

    case request.path
    when %r{\A/web/statuses/(?<status_id>\d+)\z}
      status_id = Regexp.last_match[:status_id]
      status = Status.where(visibility: [:public, :unlisted]).find(status_id)
      return short_account_status_path(status.account, status) if status.local?
    when %r{\A/web/accounts/(?<account_id>\d+)\z}
      account_id = Regexp.last_match[:account_id]
      account = Account.find(account_id)
      return short_account_path(account) if account.local?
    when %r{\A/web/timelines/tag/(?<tag>.+)\z}
      return tag_path(URI.decode(Regexp.last_match[:tag]))
    end
    about_path
  end
end