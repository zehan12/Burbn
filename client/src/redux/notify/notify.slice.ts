import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

interface Data {
  type: string;
  message: string;
}

interface NotifyState {
  loading: boolean;
  data: Data;
  sound: boolean;
}

const initialState: NotifyState = {
  loading: false,
  data: {
    type: "",
    message: "",
  },
  sound: false,
};

const NotifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    resetNotify: () => initialState,
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNotifyData: (state, action) => {
      state.data.type = action.payload.type;
      state.data.message = action.payload.message;
    },
  },
});

// Export the action creators generated by createSlice
export const { resetNotify, setIsLoading, setNotifyData } = NotifySlice.actions;

// Export the reducer function generated by createSlice
export default NotifySlice.reducer;
