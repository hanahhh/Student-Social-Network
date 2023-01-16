import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "../css/TheContent.scss";
const { Content } = Layout;

const TheContent = ({ menu }) => {
  return (
    <Content className="site-layout theContent">
      <div>
        <Routes>
          {menu.map((route, index) => {
            return (
              <Route
                path={route.path}
                exact
                element={<route.component />}
                key={index}
              />
            );
          })}
        </Routes>
      </div>
    </Content>
  );
};

export default TheContent;
