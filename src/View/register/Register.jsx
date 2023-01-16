import { Col, Divider, Form, Input, Row, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/FormGuest.scss";
import Roles from "../../configs/roles";
import { register } from "../../service/user";
import REGEX from "../../configs/regex";
import { formItemLayout } from "../../configs/form";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    let data = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: Roles.USER,
    };
    register(data, (res) => {
      if (res.status === 1) {
        message.success(res.message);
        navigate("/login");
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Col md={12} sm={16} justify="center" className="col-guest">
          <Form {...formItemLayout} onFinish={onFinish} form={form}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label={"User name"}
              labelAlign="left"
              name="name"
            >
              <Input placeholder="Please input user name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      let regex_email = new RegExp(REGEX.REGEX_EMAIL);
                      if (regex_email.test(value)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error("Please enter a valid email!")
                        );
                      }
                    } else {
                      return Promise.reject(
                        new Error("Please input your email!")
                      );
                    }
                  },
                },
              ]}
              label={"Email"}
              labelAlign="left"
              name="email"
            >
              <Input placeholder="Please input email" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label={"Password"}
              labelAlign="left"
              name="password"
            >
              <Input.Password placeholder="Please input password" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
              label={"Confirm your password"}
              labelAlign="left"
              name="confirm_password"
            >
              <Input.Password placeholder="Please input password" />
            </Form.Item>
            <div className="nav-guest">
              <button htmltype="submit" className="button-guest">
                Register
              </button>{" "}
            </div>
          </Form>
          <Divider style={{ color: "grey", fontSize: "14px" }}>
            Already have a MyScoreX account?
          </Divider>
          <div className="nav-guest">
            <button onClick={() => navigate("/login")} className="button-guest">
              Login
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
