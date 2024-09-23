import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import LoadingActions from '../../../../business/store/actions/LoadingActions';
import { setIdle } from '../../../../business/store/sagas/LoadingSaga';
import { getLoading } from '../../../../business/store/selectors/LoadingSelectors';
import ActionStatus from '../../../../common/utils/ActionStatus';

describe('Loading Saga', () => {
  describe('setIdle saga', () => {
    it('should set to idle if current status is not idle', () => {
      const loadingStore = { status: ActionStatus.loading };
      return expectSaga(setIdle)
        .provide([
          [select(getLoading), loadingStore],
        ])
        .put(LoadingActions.idle())
        .run();
    });

    it('should not set to idle if current status is idle', () => {
      const loadingStore = { status: ActionStatus.idle };
      return expectSaga(setIdle)
        .provide([
          [select(getLoading), loadingStore],
        ])
        .not.put(LoadingActions.idle())
        .run();
    });
  });
});
