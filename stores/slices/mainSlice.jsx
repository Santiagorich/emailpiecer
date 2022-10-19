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
      if (!state.emailTemplate.template[index].selected) {
        state.emailTemplate.template[index].selected = [];
      }
      const indexOfsel =
        state.emailTemplate.template[index].selected.indexOf(selindex);
      if (indexOfsel > -1) {
        state.emailTemplate.template[index].selected.splice(indexOfsel, 1);
      } else {
        state.emailTemplate.template[index].selected.push(selindex);
      }
    },
  },
});

export const { setEmailTemplate, setEmail, setSelected } = mainSlice.actions;

export default mainSlice.reducer;
