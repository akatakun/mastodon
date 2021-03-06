require 'rails_helper'

RSpec.describe Notification, type: :model do
  describe '#from_account' do
    pending
  end

  describe '#target_status' do
    let(:notification) { Fabricate(:notification, activity_type: type, activity: activity) }
    let(:status)       { Fabricate(:status) }
    let(:reblog)       { Fabricate(:status, reblog: status) }
    let(:favourite)    { Fabricate(:favourite, status: status) }
    let(:mention)      { Fabricate(:mention, status: status) }

    context 'type is :reblog' do
      let(:type)     { :reblog }
      let(:activity) { reblog }

      it 'returns status' do
        expect(notification.target_status).to eq status
      end
    end

    context 'type is :favourite' do
      let(:type)     { :favourite }
      let(:activity) { favourite }

      it 'returns status' do
        expect(notification.target_status).to eq status
      end
    end

    context 'type is :mention' do
      let(:type)     { :mention }
      let(:activity) { mention }

      it 'returns status' do
        expect(notification.target_status).to eq status
      end
    end
  end

  describe '#browserable?' do
    let(:notification) { Fabricate(:notification) }

    subject { notification.browserable? }

    context 'type is :follow_request' do
      before do
        allow(notification).to receive(:type).and_return(:follow_request)
      end

      it 'returns false' do
        is_expected.to be false
      end
    end

    context 'type is not :follow_request' do
      before do
        allow(notification).to receive(:type).and_return(:else)
      end

      it 'returns true' do
        is_expected.to be true
      end
    end
  end

  describe '#type' do
    it 'returns :reblog for a Status' do
      notification = Notification.new(activity: Status.new)
      expect(notification.type).to eq :reblog
    end

    it 'returns :mention for a Mention' do
      notification = Notification.new(activity: Mention.new)
      expect(notification.type).to eq :mention
    end

    it 'returns :favourite for a Favourite' do
      notification = Notification.new(activity: Favourite.new)
      expect(notification.type).to eq :favourite
    end

    it 'returns :follow for a Follow' do
      notification = Notification.new(activity: Follow.new)
      expect(notification.type).to eq :follow
    end
  end
end
