export const SET_SELECTED_PATIENT = "SET_SELECTED_PATIENT";

export const setSelectedPatient = (patient) => ({
  type: SET_SELECTED_PATIENT,
  payload: patient,
});
