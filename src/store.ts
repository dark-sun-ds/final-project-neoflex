import { configureStore } from "@reduxjs/toolkit";
import accordionReducer from './components/Accordion/AccordionSlice'
import tabReducer from './components/Tabs/TabsSlice'
import prescoringReducer  from "./components/Form/PrescoringFormSlice";
import offerReducer from './components/LoanOffers/LoanOffersSlice'
import scoringReducer from './components/Scoring/ScoringSlice'

export const store = configureStore({
  reducer: {
    accordion: accordionReducer,
    tab: tabReducer,
    prescoring: prescoringReducer,
    offer: offerReducer,
    scoring: scoringReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;