import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/local";

const initialState = {
  user: getLocalStorage("user_info"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveInfoUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveInfoUser } = userSlice.actions;

export default userSlice.reducer;
