import { all } from "redux-saga/effects";
import { authSaga } from "app/components/PageHeader/slice/saga";

export default function* rootSaga() {
  yield all([authSaga()]);
}
