import { Flex } from "antd";
import React, { useEffect } from "react";

function SelectedPatient({ patient }) {
  if (!patient) {
    return null;
  }

  useEffect(() => {
    const patientInfo = document.querySelector(".patient-info");
    if (patientInfo) {
      patientInfo.classList.add("patient-anim");
      setTimeout(() => {
        patientInfo.classList.remove("patient-anim");
      }, 310);
    }
  }, [patient]);

  const { fullName, personalNum, address, dob, email, gender, phone } = patient;

  return (
    <Flex className="patient-info patient-anim">
      {fullName && <div>{fullName}</div>}
      {personalNum && <div>{personalNum}</div>}
      {dob && <div>{dob}</div>}
      {gender && <div>{gender}</div>}
      {phone && <div>{phone}</div>}
      {email && <div>{email}</div>}
      {address && <div>{address}</div>}
    </Flex>
  );
}

export default SelectedPatient;
