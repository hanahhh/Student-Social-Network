import { Layout } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TheContent from "../container/TheContent";
import TheSidebar from "../container/TheSidebar";
import routes from "../routes";
import { getAllowedNav, getAllowedRoute } from "../service/auth";
import _nav from "../_nav";

const TheLayout = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  let allowedNav, allowedRoute;
  if (auth.data.role) {
    allowedRoute = getAllowedRoute(routes, auth.data.role);
    allowedNav = getAllowedNav(_nav, auth.data.role);
  } else {
    window.location.href = "/login";
  }

  return (
    <Layout>
      <Layout>
        <TheSidebar menu={allowedNav} />
        <TheContent menu={allowedRoute} />
      </Layout>
    </Layout>
  );
};

export default TheLayout;
