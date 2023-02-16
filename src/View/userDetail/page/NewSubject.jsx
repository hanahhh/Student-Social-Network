import React, { useState } from "react";
import { Form, Input, message, Select } from "antd";
import { formItemLayout } from "../../../configs/form";
import { useSelector } from "react-redux";
import { getAllDepartmentBySchool } from "../../../service/department";
import { createSubject } from "../../../service/subject";

const { Option } = Select;

const NewSubject = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.data);
  const schools = useSelector((state) => state.school.data);
  const categories = useSelector((state) => state.category.data);
  const [department, setDepartment] = useState([]);

  const onFinish = (values) => {
    const newSubject = { ...values, user_id: user._id };
    createSubject(newSubject, (res) => {
      if (res.status === 1) {
        message.success("Create subject successful !");
      } else {
        message.error(res.message);
      }
    });
  };
  const handleChangeSchool = (value) => {
    form.resetFields();
    form.setFieldsValue({
      school_id: value,
    });
    getAllDepartmentBySchool(value, (res) => {
      if (res.status === 1) {
        setDepartment(res.data.result);
      } else {
        setDepartment([]);
      }
    });
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        minWidth: "350px",
        width: "100%",
        padding: "10px",
      }}
    >
      <p style={{ fontSize: "24px" }}>Create new subject</p>
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label={"School"}
          labelAlign="left"
          name="school_id"
        >
          <Select
            style={{ width: "100%" }}
            placeholder="select school"
            onChange={handleChangeSchool}
          >
            {schools?.map((school, index) => {
              return (
                <Option value={school._id} key={index}>
                  {school.school_code} - {school.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label={"Department"}
          labelAlign="left"
          name="department_id"
        >
          <Select style={{ width: "100%" }} placeholder="select department">
            {department?.map((department, index) => {
              return (
                <Option value={department._id} key={index}>
                  {department.sort_name} - {department.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label={"Category"}
          labelAlign="left"
          name="category_id"
        >
          <Select style={{ width: "100%" }} placeholder="select category">
            {categories?.map((category, index) => {
              return (
                <Option value={category._id} key={index}>
                  {category.category_code} - {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label={"Subject name"}
          labelAlign="left"
          name="name"
        >
          <Input placeholder="Please input subject name" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label={"Code"}
          labelAlign="left"
          name="code"
        >
          <Input placeholder="Please input code" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label={"Credits"}
          labelAlign="left"
          name="credits"
        >
          <Input placeholder="Please input credits" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label={"Ratio"}
          labelAlign="left"
          name="ratio"
        >
          <Input placeholder="Please input your ratio" />
        </Form.Item>
        <button
          htmltype="submit"
          className="button-guest"
          style={{
            background: "transparent",
            width: "80px",
            height: "40px",
            border: "1px solid black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create
        </button>{" "}
      </Form>
    </div>
  );
};

export default NewSubject;
