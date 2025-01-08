import { configureStore } from "@reduxjs/toolkit";
import accordionReducer from './components/Accordion/AccordionSlice'
import tabReducer from './components/Tabs/TabsSlice'

export const store = configureStore({
    reducer: {
        accordion: accordionReducer,
        tab: tabReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;