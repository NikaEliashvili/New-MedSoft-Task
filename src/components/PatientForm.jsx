import React, { useState } from "react";
import { Form, Modal, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { dateFormat } from "./PatientsList";

import { useDispatch } from "react-redux";
import { addPatient, updatePatient } from "../redux/patientsSlice";

function AddPatientForm({ handleCancel, openModal, patient }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log("Gender ID: ", patient);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        let modifiedValues = { ...values };
        if (patient) {
          modifiedValues = {
            ...values,
            dob: new Date(values?.dob).getTime(),
            genderId: values?.gender === "მდედრობითი" ? 0 : 1,
          };
        }
        onFinish(modifiedValues);
        setConfirmLoading(true);
        setTimeout(() => {
          handleCancel();
          setConfirmLoading(false);
          form.resetFields(); // Reset form fields
        }, 2000);
      })
      .catch((errorInfo) => {
        console.log("Validation Error:", errorInfo);
      });
  };

  const onFinish = (values) => {
    if (!patient) {
      console.log("Success:", values);
      dispatch(addPatient(values));
    } else {
      console.log("Success:", values, patient.ID);
      dispatch(updatePatient({ ...values, id: patient?.ID }));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="ახალი პაციენტის დამატება:"
        open={openModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            initialValue={!patient ? null : patient?.fullName}
            label="სახელი და გვარი"
            name="fullName"
            rules={[
              {
                required: true,
                message: "შეიყვანეთ სახელი და გვარი",
              },
              {
                pattern: /^[ა-ჰ ]+$/,
                message: "შეიყვანეთ მხოლოდ ქართული ასოები",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : patient?.personalNum}
            label="პირადი ნომერი:"
            name="personalNum"
            rules={[
              {
                required: true,
                message: "გთხოვთ შეიყვანოთ პირადი ნომერი",
              },
              {
                pattern: /^\d+$/,
                message: "გამოიყენეთ მხოლოდ ციფრები",
              },
              {
                pattern: /^\d{11}$/,
                message: "გთხოვთ შეიყვანოთ 11 ციფრი",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : dayjs(patient?.dob, dateFormat)}
            label="დაბ. თარიღი:"
            name="dob"
            format={dateFormat}
            rules={[
              {
                required: true,
                message: "Please input your dob!",
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : patient?.gender}
            name="genderId"
            label="სქესი: "
            rules={[
              {
                required: true,
                message: "Please select your gender!",
              },
            ]}
          >
            <Select placeholder="სქესი...">
              <Select.Option value={"0"}>მდედრობითი</Select.Option>
              <Select.Option value={"1"}>მამრობითი</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : patient?.phone}
            label="მობ. ნომერი:"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : patient?.email}
            label="ელ. ფოსტა:"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddPatientForm;
