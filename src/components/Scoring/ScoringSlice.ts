import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TScoring } from "./Scoring";
import axios from "axios";

export type scoringState = {
  scoringData: TScoring | object;
  isLoading: boolean;
  isSubmitted: boolean;
  error: string;
};
// gender: "MALE",
//     maritalStatus: "MARRIED",
//     dependentAmount: 0,
//     passportIssueDate: "string";
//     passportIssueBranch: "string";
//     employment: {
//         employmentStatus: "UNEMPLOYED" | "SELF_EMPLOYED" | "EMPLOYED" | "BUSINESS_OWNER";
//         employerINN: "number";
//         salary: "number";
//         position: "WORKER" | "MID_MANAGER" | "TOP_MANAGER" | "OWNER";
//         workExperienceTotal: "number";
//         workExperienceCurrent: "number";
//     };
const initialState: scoringState = {
  scoringData: {},
  isLoading: false,
  isSubmitted: false,
  error: "",
};

export const submitScoring = createAsyncThunk<
  void,
  TScoring,
  { rejectValue: string }
>("form/submitScoring", async (data: TScoring, { rejectWithValue }) => {
  console.log({ data });

  try {
    const id = localStorage.getItem("id");

    if (!id) {
      return rejectWithValue("No such id");
    }
    await axios.put(
      `http://localhost:8080/application/registration/${Number(id)}`,
      data
    );
  } catch {
    return rejectWithValue("error");
  }
});

const scoringSlice = createSlice({
  name: "scoring",
  initialState,
  reducers: {
    setScoringData: (state, action) => {
      state.scoringData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsSubmitted: (state, action) => {
        state.isSubmitted = action.payload;
        console.log(action.payload);
        
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitScoring.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(submitScoring.fulfilled, (state) => {
        state.isLoading = false;
        state.isSubmitted = true;
        localStorage.setItem("isSubmitScoring", "true");
      })
      .addCase(submitScoring.rejected, (state) => {
        state.isLoading = false;
        state.isSubmitted = false;
      });
  },
});

export const { setScoringData, setIsLoading, setError, setIsSubmitted } =
  scoringSlice.actions;
export default scoringSlice.reducer;