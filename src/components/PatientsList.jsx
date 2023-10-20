import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../redux/patientsSlice";
import { Table } from "antd";

import PatientForm from "./PatientForm";
import Crud from "./Crud";

export const dateFormat = "DD/MM/YYYY";

function PatientsList() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const [dataSource, setDataSource] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(false);
  const [isEditBtn, setIsEditBtn] = useState(false);

  const openCloseAddBtn = (bool) => {
    setIsAddBtn(bool);
  };
  const openCloseEditBtn = (bool) => {
    setIsEditBtn(bool);
  };

  const showModal = () => {
    console.log("Clicked Show button");
    setOpenModal(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    openCloseAddBtn(false);
    openCloseEditBtn(false);
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    console.log(patients);
    setDataSource((prev) => {
      return patients.map((patient) => ({
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
  }, [patients]);

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
        showModal={showModal}
        selectedIndex={selectedIndex}
        setSelectedIndex={() => setSelectedIndex(null)}
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
                  setSelectedIndex(null);
                } else {
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
