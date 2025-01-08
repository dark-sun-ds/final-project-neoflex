import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  isOpen: boolean;
}

interface AccordionState {
  [accordionId: string]: {
    items: AccordionItem[];
  };
}

const initialState: AccordionState = {};

const accordionSlice = createSlice({
  name: "accordion",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<{ accordionId: string; items: AccordionItem[] }>
    ) => {
      const { accordionId, items } = action.payload;
      state[accordionId] = { items: [...items] };
    },
    toggleItem: (
      state,
      action: PayloadAction<{ accordionId: string; itemId: string }>
    ) => {
      const { accordionId, itemId } = action.payload;
      state[accordionId].items = state[accordionId].items.map((item) => {
        return item.id === itemId ? { ...item, isOpen: !item.isOpen } : item;
      });
    },
    closeOtherItems: (state, action: PayloadAction<{ itemId: string }>) => {
      const { itemId } = action.payload;
      for (const accordionId in state) {
        state[accordionId].items = state[accordionId].items.map((item) =>
          item.id !== itemId ? { ...item, isOpen: false } : item
        );
      }
    },
  },
});

export const { setItems, toggleItem, closeOtherItems } = accordionSlice.actions;
export default accordionSlice.reducer;
