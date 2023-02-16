import { Layout } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TheContent from "../container/TheContent";
import TheSidebar from "../container/TheSidebar";
import { getAllCategory } from "../redux/action/category";
import { getAllSchool } from "../redux/action/school";
import { getAllSubjects, getTopSubject } from "../redux/action/subject";
import { getAllTags } from "../redux/action/tags";
import routes from "../routes";
import { getAllowedNav, getAllowedRoute } from "../service/auth";
import _nav from "../_nav";

const TheLayout = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let allowedNav, allowedRoute;
  if (auth.data) {
    allowedRoute = getAllowedRoute(routes, auth.data.role);
    allowedNav = getAllowedNav(_nav, auth.data.role);
    dispatch(getAllTags());
    dispatch(getAllSchool());
    dispatch(getAllSubjects());
    dispatch(getAllCategory());
    dispatch(getTopSubject());
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
