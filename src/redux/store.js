import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../redux/patientsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});
