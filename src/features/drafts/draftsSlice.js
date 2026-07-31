import { createSlice } from "@reduxjs/toolkit";

const draftsSlice = createSlice({
  name: "drafts",
  initialState: {
    current: { title: "", body: "", platformId: null },
  },
  reducers: {
    draftFieldChanged: (state, action) => {
      const { field, value } = action.payload;
      state.current[field] = value;
    },
    draftCleared: (state) => {
      state.current = { title: "", body: "", platformId: null };
    },
  },
});

export const { draftFieldChanged, draftCleared } = draftsSlice.actions;
export default draftsSlice.reducer;
