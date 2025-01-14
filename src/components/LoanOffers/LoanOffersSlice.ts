import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOfferProps } from "./LoanOffers";
import axios, { AxiosResponse } from "axios";


export type OfferState = {
  offers: TOfferProps;
  isLoading: boolean;
  isSubmitted: boolean;
  error: string; 
};

function getInitialState() {
    const stateLS = localStorage.getItem("offers");
    if (stateLS) {
        return JSON.parse(stateLS)[0] as TOfferProps;
    }
    return {} as TOfferProps;
}
const initialState: OfferState = {
    offers: getInitialState(),
    isLoading: false,
    isSubmitted: false,
    error: "",  
};

export const submitOffer = createAsyncThunk<
  void,
  TOfferProps,
  { rejectValue: string }
>("form/submitOffer", async (data: TOfferProps, { rejectWithValue }) => {
  console.log("submitOffer");

  try {
    await axios.post<AxiosResponse<TOfferProps>>(
      "http://localhost:8080/application/apply",
      data
    );
  } catch {
    return rejectWithValue("error");
  }
});

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setIsOfferSubmitted: (state, action: PayloadAction<boolean>) => {
        state.isSubmitted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOffer.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(submitOffer.fulfilled, (state) => {
        state.isLoading = false;
        state.isSubmitted = true;
        localStorage.setItem("isOfferSubmit", JSON.stringify(true));
      })
      .addCase(submitOffer.rejected, (state) => {
        state.isLoading = false;
        state.isSubmitted = false;
        state.error = "Error submitting offer";
      });
  },
});

export const { setIsOfferSubmitted } = offerSlice.actions;
export default offerSlice.reducer;