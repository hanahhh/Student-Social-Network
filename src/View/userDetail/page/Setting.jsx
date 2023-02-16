import React, { useState, useEffect } from "react";
import { Form, Input, message, Radio, Select } from "antd";
import { formItemLayout } from "../../../configs/form";
import UploadImage from "../../../components/UploadImage";
import { useSelector } from "react-redux";
import { getUserInfo, updateUserByID } from "../../../service/user";

const { Option } = Select;

const Setting = () => {
  const user = useSelector((state) => state.auth.data);
  const schools = useSelector((state) => state.school.data);
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    getUserInfo((res) => {
      if (res.status === 1) {
        form.setFieldsValue({ ...res.data.user, image: res.data.user.avatar });
        setImage(res.data.user.avatar);
        setData(res.data.user);
      } else {
        message.error(res.message);
      }
    });
  }, []);

  const onFinish = (values) => {
    if (form.getFieldValue().image !== "")
      values = { ...values, avatar: form.getFieldValue().image };
    updateUserByID(user._id, values, (res) => {
      if (res.status === 1) {
        message.success("Update user successfully !");
        window.location.reload();
      } else {
        message.error(res.message);
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
      <p style={{ fontSize: "24px" }}>Change your profile</p>
      <div className="avatar">
        <p>Change your avatar</p>
        <UploadImage form={form} />
      </div>
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <Form.Item label={"User name"} labelAlign="left" name="name">
          <Input placeholder="Please input user name" />
        </Form.Item>
        <Form.Item label={"Nick name"} labelAlign="left" name="nick_name">
          <Input placeholder="Please input nick name" />
        </Form.Item>
        <Form.Item label={"Email"} labelAlign="left">
          <Input
            placeholder="Please input email"
            disabled={true}
            value={data?.email}
          />
        </Form.Item>
        <Form.Item label={"Description"} labelAlign="left" name="description">
          <Input placeholder="Please input description" />
        </Form.Item>
        <Form.Item label={"Website"} labelAlign="left" name="website">
          <Input placeholder="Please input your website" />
        </Form.Item>
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
          <Select style={{ width: "100%" }} placeholder="select school">
            {schools?.map((school, index) => {
              return (
                <Option value={school._id} key={index}>
                  {school.school_code} - {school.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={"Education"} labelAlign="left" name="education">
          <Input placeholder="Please input your education" />
        </Form.Item>
        <Form.Item
          label={"Show your profile"}
          labelAlign="left"
          name="educationStatus"
        >
          <Radio.Group>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
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
          Update
        </button>{" "}
      </Form>
    </div>
  );
};

export default Setting;
