import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = "https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/";

export const updatePatientA = async (patient) => {
  console.log("Patient Obj", patient);
  console.log("ID: ", patient.id);
  const response = await axios.put(`${apiUrl}/${patient.id}`, patient);
  return response.data;
};

export function fetchPatientsData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(apiUrl).then((res) => setData(res.data));
  }, []);
  return data;
}

export function AddPatientData(patient) {
  axios.post(apiUrl, patient).then((res) => {
    console.log("Patient is Added successfully!");
    console.log(res.data);
    return res.data;
  });
}

export function updatePatientData(patient) {
  console.log("Patient Obj", patient);
  console.log("ID: ", patient.id);
  axios
    .put(`${apiUrl}${patient.id}`, patient)
    .then((res) => {
      console.log("Patient Updated Successfully!");
      return res.data;
    })
    .catch((err) => {
      console.error("Error in updating Patient", err);
    });
}

export function deletePatientData(id) {
  axios
    .delete(`${apiUrl}${id}`)
    .then((res) => {
      console.log("Patient is Deleted successfully!");
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
}
