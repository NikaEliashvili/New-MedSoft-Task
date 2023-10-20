import React, { useState } from "react";
import { Flex, Button, Modal } from "antd";
import { HiOutlinePlus, HiX } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { deletePatient } from "../redux/patientsSlice";

function Crud({
  openCloseAddBtn,
  openCloseEditBtn,
  showModal,
  selectedIndex,
  setSelectedIndex,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const showDeleteConfirm = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedIndex();
    dispatch(deletePatient(selectedIndex));
  };

  const handleCancel = () => {
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
