import React, { useState } from "react";
import { Form, Modal, Input, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { setSelectedPatient } from "../redux/patientActions";
import dayjs from "dayjs";
import { dateFormat } from "./PatientsList";
import { AddPatientData, updatePatientData } from "../axiosFunctions";

function AddPatientForm({ handleCancel, openModal, patient }) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        let modifiedValues = { ...values };
        if (patient) {
          modifiedValues = {
            ...values,
            dob: new Date(values?.dob).getTime(),
            genderId: parseInt(values?.genderId),
          };
        }
        onFinish(modifiedValues);
        setConfirmLoading(true);
        setTimeout(() => {
          handleCancel();
          setConfirmLoading(false);
          form.resetFields();
        }, 1000);
      })
      .catch((errorInfo) => {
        console.log("Validation Error:", errorInfo);
      });
  };

  const onFinish = (values) => {
    if (!patient) {
      AddPatientData(values);
    } else {
      updatePatientData({ ...values, id: patient?.id });
      dispatch(setSelectedPatient(values));
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
                required: false,
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
                message: "გთხოვთ შეიყვანოთ დაბადების თარიღი",
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            initialValue={
              !patient
                ? null
                : (patient?.genderId == 1 && "მამრობითი") ||
                  (patient?.genderId == 0 && "მდედრობითი")
            }
            name="genderId"
            label="სქესი: "
            rules={[
              {
                required: true,
                message: "აირჩიეთ სქესი!",
              },
            ]}
          >
            <Select placeholder="სქესი...">
              <Select.Option value={"1"}>მამრობითი</Select.Option>
              <Select.Option value={"0"}>მდედრობითი</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : patient?.phone}
            label="მობ. ნომერი:"
            name="phone"
            type="phone"
            rules={[
              {
                required: false,
              },
              {
                pattern: /^5/,
                message: "მობ. ნომერი უნდა იწყებოდეს 5-ით",
              },
              {
                pattern: /^\d{9}$/,
                message: "მობ. ნომერი უნდა შეიცავდეს 9 ციფრს!",
              },
              {
                pattern: /\d/,
                message: "გამოიყენეთ მხოლოდ ციფრები!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : patient?.email}
            label="ელ. ფოსტა:"
            name="email"
            type="email"
            rules={[
              {
                required: false,
              },
              {
                pattern:
                  /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
                message: "მიუთითეთ სწორი ელ.ფოსტა",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={!patient ? null : patient?.address}
            label="მისამართი:"
            name="address"
            type="address"
            rules={[
              {
                required: false,
              },
              {
                pattern: /^[ა-ჰ ]+$/,
                message: "შეიყვანეთ მხოლოდ ქართული ასოები",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddPatientForm;
