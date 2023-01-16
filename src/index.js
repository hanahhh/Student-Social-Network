import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/antd.min.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getAllTags } from "./redux/action/tags";
import { getAllSchool } from "./redux/action/school";
import { getAllCategory } from "./redux/action/category";
import { getAllSubjects } from "./redux/action/subject";

store.dispatch(getAllTags());
store.dispatch(getAllSchool());
store.dispatch(getAllCategory());
store.dispatch(getAllSubjects());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
