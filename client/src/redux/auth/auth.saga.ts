import { call, put, takeEvery } from "redux-saga/effects";
import { fetchLoginUserActionTypes } from "./auth.slice";
import { requestToLoginUser } from "../../services/auth.service";

type response = {
  type: string;
  errorMessage?: {
    status: string;
    error: string;
  };
  successMessage?: {
    status: string;
    error: string;
  };
};

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

    const response: response = yield call(requestToLoginUser, {
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password,
    });

    if (response.type === "Error") {
      // throw new Error(response.errorMessage);
      yield put({
        type: fetchLoginUserActionTypes.REJECTED,
        payload: {
          error: response?.errorMessage?.error,
        },
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
        payload: {
          error: "Error while login user.",
        },
      });
    }
  } catch (error: unknown) {
    console.error(error);
    yield put({
      type: fetchLoginUserActionTypes.REJECTED,
      payload: {
        error: "error in login",
      },
    });
  }
}

function* watchFetchLoginUserSaga(): Generator<unknown, void, unknown> {
  yield takeEvery(fetchLoginUserActionTypes.REQUEST, workerToFetchLoginUser);
}

export const authSagas = [watchFetchLoginUserSaga()];
