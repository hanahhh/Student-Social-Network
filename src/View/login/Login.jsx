import { Col, Divider, Form, Input, message, Row } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Roles from "../../configs/roles";
import "../../css/FormGuest.scss";
import { userLogin } from "../../redux/action/auth";
import { storeUserData } from "../../service/user";
import { formItemLayout } from "../../configs/form";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(userLogin(values));
  };

  useEffect(() => {
    if (user.status !== 1) {
      user.message.length !== 0 && message.error(user.message);
    } else {
      if (!_.isEmpty(user.data)) {
        storeUserData(user.data);
        if (user.data.role === Roles.ADMIN || Roles.USER) {
          message.success(user.message);
          navigate("/posts");
        } else {
          message.error(user.message);
        }
      } else {
        message.error("User data is empty.");
      }
    }
  }, [user]);
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col
          md={12}
          sm={16}
          justify="center"
          className="col-guest"
          style={{ maxWidth: "450px" }}
        >
          <div style={{ padding: "10px" }}>
            <Form {...formItemLayout} onFinish={onFinish} form={form}>
              <Form.Item
                rules={[
                  {
                    required: true,
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
              <div className="nav-guest">
                <button htmltype="submit" className="button-guest">
                  Login
                </button>{" "}
              </div>
            </Form>
            <Divider style={{ color: "grey", fontSize: "14px" }}>
              Don't have a MyScoreX account?
            </Divider>
            <div className="nav-guest">
              <button
                onClick={() => navigate("/register")}
                className="button-guest"
              >
                Register
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
