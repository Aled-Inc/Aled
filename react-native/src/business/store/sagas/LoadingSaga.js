import { all, put, select, takeLatest } from "redux-saga/effects";
import LoadingActions from "../actions/LoadingActions";
import { getLoading } from "../selectors/LoadingSelectors";
import ActionStatus from "../../../utils/ActionStatus";

function* setIdle() {
  const loadingStore = yield select(getLoading);

  if (loadingStore.status !== ActionStatus.idle) {
    yield put(LoadingActions.idle());
  }
}

export default function* () {
  yield all([
    takeLatest(LoadingActions.idle.type, setIdle),
  ]);
}