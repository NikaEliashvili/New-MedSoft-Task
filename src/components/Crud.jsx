import React, { useState } from "react";
import { Flex, Button, Modal } from "antd";
import { HiOutlinePlus, HiX } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { setSelectedPatient } from "../redux/patientActions";
import { deletePatientData } from "../axiosFunctions";

function Crud({
  openCloseAddBtn,
  openCloseEditBtn,
  showModal,
  selectedIndex,
  setSelectedIndex,
  setDelete,
}) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setSelectedIndex();
    deletePatientData(selectedIndex);

    setTimeout(() => {
      setDelete();
      setIsModalOpen(false);
      setConfirmLoading(false);
      dispatch(setSelectedPatient(null));
    }, 2000);
  };

  const handleCancel = () => {
    setDelete();
    setIsModalOpen(false);
  };
  return (
    <>
      <Flex gap="middle" className="buttons-container">
        <Button
          type="default"
          onClick={() => {
            showModal(true);
            openCloseAddBtn(true);
          }}
        >
          <HiOutlinePlus className="plus icon" size={22} />
          დამატება
        </Button>

        <Button
          type="default"
          disabled={!selectedIndex}
          onClick={() => {
            showModal(true);
            openCloseEditBtn(true);
          }}
        >
          <BiSolidEdit className="edit icon" size={22} />
          რედაქტირება
        </Button>
        <Button
          type="default"
          disabled={!selectedIndex}
          onClick={showDeleteConfirm}
        >
          <HiX className="delete icon" size={22} />
          წაშლა
        </Button>
      </Flex>
      <Modal
        title="წაშლა"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        cancelText="გაუქმება"
        okText="წაშლა"
        okType="danger"
        className="ok-button"
      >
        <p>გსურთ მონიშნული ჩანაწერის წაშლა?</p>
      </Modal>
    </>
  );
}

export default Crud;

/*
Old Code

<Flex gap="middle" className="buttons-container">
        <Button
          type="default"
          onClick={() => {
            showModal(true);
          }}
        >
          <HiOutlinePlus className="plus icon" size={22} />
          დამატება
        </Button>

        <Button type="default" disabled={!selectedIndex}>
          <BiSolidEdit className="edit icon" size={22} />
          რედაქტირება
        </Button>
        <Button type="default" disabled={!selectedIndex}>
          <HiX className="delete icon" size={22} />
          წაშლა
        </Button>
      </Flex>



*/
