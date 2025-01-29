import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TabState {
  activeTab: string;
}

const initialState: TabState = { activeTab: "About card" };

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      console.log(state.activeTab);
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
