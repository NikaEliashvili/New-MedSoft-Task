import { SET_SELECTED_PATIENT } from "./patientActions";

const initialState = null;

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PATIENT:
      return action.payload;
    default:
      return state;
  }
};

export default patientReducer;
