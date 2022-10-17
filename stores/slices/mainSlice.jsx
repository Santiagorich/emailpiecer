import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    emailTemplate: null,
    email: null,
  },
  reducers: {
    setEmailTemplate: (state, action) => {
      state.emailTemplate = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSelected: (state, action) => {
      const { index, selindex } = action.payload;
      if (state.emailTemplate[index].selected === selindex) {
        state.emailTemplate[index].selected = null;
      } else {
        state.emailTemplate[index].selected = selindex;
      }
    },
  },
});

export const { setEmailTemplate, setEmail, setSelected } = mainSlice.actions;

export default mainSlice.reducer;
