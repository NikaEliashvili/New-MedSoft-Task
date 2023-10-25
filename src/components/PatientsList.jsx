import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPatient } from "../redux/patientActions";
import { fetchPatientsData } from "../axiosFunctions";
import { Table } from "antd";

import PatientForm from "./PatientForm";
import Crud from "./Crud";
import SelectedPatient from "./SelectedPatient";

const apiUrl = "https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/";

export const dateFormat = "DD/MM/YYYY";

function PatientsList() {
  const [patientsData, setPatientsData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(false);
  const [isEditBtn, setIsEditBtn] = useState(false);
  const [isDeleteBtn, setIsDeleteBtn] = useState(false);

  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.selectedPatient);
  function updatePatientsData(newData) {
    setPatientsData(newData);
  }

  const openCloseAddBtn = (bool) => {
    setIsAddBtn(bool);
  };
  const openCloseEditBtn = (bool) => {
    setIsEditBtn(bool);
  };
  const setDelete = () => {
    setIsDeleteBtn((prev) => !prev);
  };

  const showModal = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    openCloseAddBtn(false);
    openCloseEditBtn(false);
    setOpenModal(false);
  };

  useEffect(() => {
    axios.get(apiUrl).then((res) => setPatientsData(res.data));
  }, [isAddBtn, isEditBtn, isDeleteBtn]);

  useEffect(() => {
    setDataSource((prev) => {
      return patientsData.map((patient) => ({
        key: patient?.id,
        id: patient?.id,
        fullName: patient?.fullName,
        personalNum: patient?.personalNum,
        dob: new Date(patient?.dob).toLocaleDateString("en-GB"),
        gender: patient?.genderId == 0 ? "მდედრობითი" : "მამრობითი",
        genderId: patient?.genderId,
        phone: patient?.phone,
        email: patient?.email,
        address: patient?.address,
      }));
    });
  }, [patientsData, fetchPatientsData]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "პაციენტის გვარი სახელი",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "პ. ნომერი",
      dataIndex: "personalNum",
      key: "personalNum",
    },
    {
      title: "დაბ. თარიღი",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "სქესი",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "მობ. ნომერი",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ელ. ფოსტა",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "მისამართი",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <Crud
        openCloseAddBtn={openCloseAddBtn}
        openCloseEditBtn={openCloseEditBtn}
        handleCancelParent={handleCancel}
        showModal={showModal}
        selectedIndex={selectedIndex}
        setSelectedIndex={() => setSelectedIndex(null)}
        setDelete={setDelete}
        isDeleteBtn={isDeleteBtn}
        updatePatientsData={updatePatientsData}
      />
      <div className="table-container">
        <Table
          rowClassName={(curRow) =>
            curRow.id === selectedIndex ? "active" : ""
          }
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                if (record.id === selectedIndex) {
                  dispatch(setSelectedPatient(null));
                  setSelectedIndex(null);
                } else {
                  console.log(record);
                  dispatch(setSelectedPatient(record));
                  setSelectedIndex(record.id);
                }
              },
            };
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
      <SelectedPatient patient={selectedPatient} />
      {(openModal && isAddBtn && (
        <PatientForm
          patient={null}
          openModal={openModal}
          handleCancel={handleCancel}
        />
      )) ||
        (openModal && isEditBtn && (
          <PatientForm
            patient={
              dataSource?.filter((patient) => patient.id === selectedIndex)[0]
            }
            openModal={openModal}
            handleCancel={handleCancel}
          />
        ))}
    </>
  );
}

export default PatientsList;
