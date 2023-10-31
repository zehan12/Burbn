import {
  Action,
  ActionCreatorWithPayload,
  Slice,
  createAction,
  createSlice,
} from "@reduxjs/toolkit";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../constant/general";

interface AuthState {
  loginUser: object;
  fetchLoginUserStatus: string;
  token: string;
  requestToRegisterUser: string;
  registerUserDetails: object;
}

const initialState: AuthState = {
  loginUser: {},
  fetchLoginUserStatus: IDLE,
  token: "",
  requestToRegisterUser: IDLE,
  registerUserDetails: {},
};

// Creating a mapping of all the action types for fetch login user
export const fetchLoginUserActionTypes = {
  REQUEST: "/auth/fetchLoginUser/request",
  PENDING: "/auth/fetchLoginUser/pending",
  REJECTED: "/auth/fetchLoginUser/rejected",
  FULFILLED: "/auth/fetchLoginUser/fulfilled",
};

const fetchLoginUserPendingReducer = (state: AuthState) => {
  state.fetchLoginUserStatus = PENDING;
};

const fetchLoginUserRejectedReducer = (state: AuthState) => {
  state.fetchLoginUserStatus = REJECTED;
};

interface fetchLoginUserFulfilledAction extends Action {
  type: string;
  payload: {
    data: object;
    access_token: string;
  };
}

const fetchLoginUserFulfilledReducer = (
  state: AuthState,
  action: fetchLoginUserFulfilledAction
) => {
  state.loginUser = action.payload.data;
  state.token = action.payload.access_token;
  state.fetchLoginUserStatus = FULFILLED;
};

export const fetchLoginUserRequest: ActionCreatorWithPayload<{
  username?: string;
  email?: string;
  password: string;
}> = createAction(fetchLoginUserActionTypes.REQUEST);

// Create a Auth slice using createSlice
const AuthSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLoginUserActionTypes.PENDING,
      fetchLoginUserPendingReducer
    );
    builder.addCase(
      fetchLoginUserActionTypes.FULFILLED,
      fetchLoginUserFulfilledReducer
    );
    builder.addCase(
      fetchLoginUserActionTypes.REJECTED,
      fetchLoginUserRejectedReducer
    );
  },
});

// Export the action creators generated by createSlice
export const { reset } = AuthSlice.actions;

// Export the reducer function generated by createSlice
export default AuthSlice.reducer;
