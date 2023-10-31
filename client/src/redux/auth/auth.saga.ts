import { call, put, takeEvery } from "redux-saga/effects";
import { fetchLoginUserActionTypes } from "./auth.slice";
import { requestToLoginUser } from "../../services/auth.service";

function* workerToFetchLoginUser(action: {
  type: string;
  payload: {
    username?: string;
    email?: string;
    password: string;
  };
}): Generator<unknown, void, null> {
  try {
    yield put({
      type: fetchLoginUserActionTypes.PENDING,
      payload: null,
    });
    const response = yield call(requestToLoginUser, {
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password,
    });

    if (response.type === "Error") {
      // throw new Error(response.errorMessage);
      yield put({
        type: fetchLoginUserActionTypes.REJECTED,
        payload: null,
      });
    }

    if (response) {
      yield put({
        type: fetchLoginUserActionTypes.FULFILLED,
        payload: response,
      });
    } else {
      yield put({
        type: fetchLoginUserActionTypes.REJECTED,
        payload: null,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({
      type: fetchLoginUserActionTypes.REJECTED,
      payload: null,
    });
  }
}

function* watchFetchLoginUserSaga(): Generator<unknown, void, unknown> {
  yield takeEvery(fetchLoginUserActionTypes.REQUEST, workerToFetchLoginUser);
}

export const authSagas = [watchFetchLoginUserSaga()];
