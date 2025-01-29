import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "./formUtils";
import axios, { AxiosResponse } from "axios";
import { TOfferProps } from "../LoanOffers/LoanOffers";
import { FormData } from "./formUtils";

const initialState: FormState = {
  formData: {},
  amount: 0,
  isLoading: false,
  isSubmitted: false,
  loanOffers: [] as TOfferProps[],
  error: "",
};

export const submitPrescoring = createAsyncThunk<
  TOfferProps[],
  FormData,
  { rejectValue: string }
>("form/submitPrescoring", async (data: FormData, { rejectWithValue }) => {
  console.log("submitPrescoring");

  try {
    const response: AxiosResponse = await axios.post<
      AxiosResponse<TOfferProps[]>
    >("http://localhost:8080/application", data);

    localStorage.setItem("offers", JSON.stringify(response.data));
    return response.data;
  } catch {
    return rejectWithValue("error");
  }
});

const prescoringSlice = createSlice({
  name: "prescoring",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
      console.log("setFormData", state.formData);
    },
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoanOffers: (state, action: PayloadAction<TOfferProps[]>) => {
      state.loanOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPrescoring.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        submitPrescoring.fulfilled,
        (state, action: PayloadAction<TOfferProps[]>) => {
          state.isLoading = false;
          state.isSubmitted = true;
          state.loanOffers = action.payload;
          localStorage.setItem("isSubmit", "true");
          localStorage.setItem(
            "id",
            JSON.stringify(action.payload[0].applicationId)
          );
        }
      )
      .addCase(submitPrescoring.rejected, (state) => {
        state.isLoading = false;
        state.isSubmitted = false;
      });
  },
});

export const { setAmount, setFormData, setIsSubmitted, setLoanOffers, setIsLoading } =
  prescoringSlice.actions;
export default prescoringSlice.reducer;
