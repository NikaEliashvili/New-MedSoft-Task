import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (patient) => {
    const response = await axios.post(apiUrl, patient);
    return response.data;
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (patient) => {
    console.log("Patient Obj", patient);
    console.log("ID: ", patient.id);
    const response = await axios.put(`${apiUrl}/${patient.id}`, patient);
    return response.data;
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.fulfilled, (state, action) => {
        return action.payload;
      })

      .addCase(addPatient.fulfilled, (state, action) => {
        state.push(action.payload);
      })

      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.findIndex((patient) => {
          return patient.id === action.payload.id;
        });
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        return state.filter((patient) => patient.id !== action.payload);
      });
  },
});

export default patientsSlice.reducer;
