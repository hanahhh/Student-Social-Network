import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { formItemLayout } from "../configs/form";
import { getGPARecommendation } from "../service/subjectScore";

const PredictSemester = ({
  semester,
  buttonDisabled,
  user,
  semesterData,
  predictResult,
  setPredictResult,
}) => {
  const [form] = Form.useForm();

  const handleDeleteSubject = (id) => {
    console.log("delete", id);
  };

  const handleEditSubject = (id) => {
    console.log("edit", id);
  };

  const onFinishPredictSemester = () => {
    const gpa = form.getFieldValue().gpa;
    getGPARecommendation(user._id, semester, gpa, (res) => {
      if (res.status === 1) {
        const predicts = res.data;
        setPredictResult(predicts);
      } else {
        message.error(res.message);
      }
    });
  };
  const handlePredictSemester = () => {
    form.resetFields();
    Modal.confirm({
      width: "1000px",
      title: `New Semester`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            onFinish={onFinishPredictSemester}
          >
            <Form.Item
              label="GPA"
              name={"gpa"}
              rules={[
                {
                  required: true,
                  message: "This field is required !",
                },
              ]}
            >
              <Input style={{ width: "60vw" }} placeholder={"GPA desired !"} />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishPredictSemester();
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <Button disabled={buttonDisabled} onClick={handlePredictSemester}>
      Predict semester
    </Button>
  );
};

export default PredictSemester;
