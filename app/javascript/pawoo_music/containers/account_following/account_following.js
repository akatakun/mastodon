import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { fetchAccount, fetchFollowing, expandFollowing } from '../../../mastodon/actions/accounts';
import AccountHeaderContainer from '../account_header';
import { makeGetAccount } from '../../../mastodon/selectors';
import AccountTimelineContainer from '../account_timeline';
import AccountList from '../../components/account_list';

const mapStateToProps = (state, props) => {
  const acct = props.match.params.acct;
  const accountId = Number(state.getIn(['pawoo_music', 'acct_map', acct]));
  const getAccount = makeGetAccount();

  return {
    accountId,
    account: getAccount(state, accountId),
    accountIds: state.getIn(['user_lists', 'following', accountId, 'items'], Immutable.List()),
    hasMore: !!state.getIn(['user_lists', 'following', accountId, 'next']),
  };
};

@connect(mapStateToProps)
export default class AccountFollowing extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    accountId: PropTypes.number.isRequired,
    account: ImmutablePropTypes.map.isRequired,
    accountIds: ImmutablePropTypes.list.isRequired,
    hasMore: PropTypes.bool,
  };

  componentDidMount () {
    const { dispatch, accountId } = this.props;

    dispatch(fetchAccount(accountId));
    dispatch(fetchFollowing(accountId));
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch } = this.props;

    if (nextProps.accountId !== this.props.accountId && nextProps.accountId) {
      const accountId = nextProps.accountId;

      dispatch(fetchAccount(accountId));
      dispatch(fetchFollowing(accountId));
    }
  }

  handleScrollToBottom = debounce(() => {
    const { dispatch, accountId } = this.props;
    dispatch(expandFollowing(accountId));
  }, 300, { leading: true });


  render () {
    const { account, accountIds, hasMore } = this.props;

    const Garally = (
      <div className='garally'>
        <AccountList
          scrollKey='account_followers'
          accountIds={accountIds}
          hasMore={hasMore}
          prepend={<AccountHeaderContainer account={account} />}
          onScrollToBottom={this.handleScrollToBottom}
        />
      </div>
    );

    return (
      <AccountTimelineContainer garally={Garally} {...this.props} />
    );
  }

};
