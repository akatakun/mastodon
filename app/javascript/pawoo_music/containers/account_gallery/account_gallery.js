import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { fetchAccount } from '../../../mastodon/actions/accounts';
import { refreshAccountTimeline, expandAccountTimeline, refreshPinnedStatusTimeline } from '../../../mastodon/actions/timelines';
import AccountHeaderContainer from '../account_header';
import AccountTimelineContainer from '../account_timeline';
import StatusList from '../../components/status_list';
import { makeGetAccount } from '../../../mastodon/selectors';
import MediaPostButton from '../../components/media_post_button';
import { updateTimelineTitle } from '../../actions/timeline';
import { changeFooterType } from '../../actions/footer';

const makeMapStateToProps = () => {
  const getAccount = makeGetAccount();

  const mapStateToProps = (state, props) => {
    const acct = props.match.params.acct;
    const accountId = Number(state.getIn(['pawoo_music', 'acct_map', acct]));

    return {
      accountId,
      account: getAccount(state, accountId),
      statusIds: state.getIn(['timelines', `account:${accountId}`, 'items'], Immutable.List()),
      me: state.getIn(['meta', 'me']),
      isLoading: state.getIn(['timelines', `account:${accountId}`, 'isLoading']),
      hasMore: !!state.getIn(['timelines', `account:${accountId}`, 'next']),
      pinnedStatusIds: state.getIn(['timelines', `account:${accountId}:pinned_status`, 'items'], Immutable.List()),
    };
  };

  return mapStateToProps;
};

@connect(makeMapStateToProps)
export default class AccountGallery extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    accountId: PropTypes.number.isRequired,
    account: ImmutablePropTypes.map.isRequired,
    statusIds: ImmutablePropTypes.list.isRequired,
    me: PropTypes.number,
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    gallery: PropTypes.node,
    pinnedStatusIds: ImmutablePropTypes.list,
  };

  static childContextTypes = {
    displayPinned: PropTypes.bool,
  };

  getChildContext() {
    return { displayPinned: true };
  }

  componentWillMount () {
    const { dispatch, accountId, account } = this.props;
    let displayName = account.get('display_name').length === 0 ? account.get('username') : account.get('display_name');

    if(10 < displayName.length) {
      displayName = displayName.substring(0, 10) + '…';
    }

    dispatch(fetchAccount(accountId));
    dispatch(refreshPinnedStatusTimeline(accountId));
    dispatch(refreshAccountTimeline(accountId));
    dispatch(updateTimelineTitle(`${displayName} のタイムライン`)); /* TODO: intl */
    dispatch(changeFooterType('lobby_gallery'));
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch } = this.props;

    if (nextProps.accountId !== this.props.accountId && nextProps.accountId) {
      const accountId = nextProps.accountId;

      dispatch(fetchAccount(accountId));
      dispatch(refreshPinnedStatusTimeline(accountId));
      dispatch(refreshAccountTimeline(accountId));
    }
  }

  handleScrollToBottom = debounce(() => {
    const { dispatch, isLoading, hasMore, accountId } = this.props;
    if (!isLoading && hasMore) {
      dispatch(expandAccountTimeline(accountId));
    }
  }, 300, { leading: true })

  render () {
    const { accountId, account, statusIds, me, pinnedStatusIds, isLoading, hasMore } = this.props;
    const uniqueStatusIds = pinnedStatusIds.concat(statusIds).toOrderedSet().toList();

    const prepend = (
      <div className='prepend'>
        <AccountHeaderContainer account={account} />
        {me === accountId && <MediaPostButton />}
      </div>
    );

    const gallery = (
      <StatusList
        scrollKey='account_gallery'
        statusIds={uniqueStatusIds}
        hasMore={hasMore}
        isLoading={isLoading}
        isGallery
        prepend={prepend}
        onScrollToBottom={this.handleScrollToBottom}
      />
    );

    return (
      <AccountTimelineContainer accountId={accountId} gallery={gallery} />
    );
  }

};
