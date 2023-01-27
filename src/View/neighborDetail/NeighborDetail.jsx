import React from "react";
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserByID } from "../../service/user";
import "../../css/neighbor.scss";
import Posts from "../../components/Posts";
import { educationStatus } from "../../configs/systemStatus";
import userInfoSearch from "../../configs/userInfoSearch";
import { getRoute } from "../../configs/getRoute";

const NeighborDetail = () => {
  const path = `/${useLocation().pathname.split("/")[3]}`;
  const navigate = useNavigate();
  const serviceType = getRoute(userInfoSearch, path);
  const [service, setService] = useState(serviceType);
  const user_id = useLocation().pathname.split("/")[2];
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserByID(user_id, (res) => {
      if (res.status === 1) {
        setUser(res.data.user);
      }
    });
  }, []);
  const handleChooseService = (index) => {
    setService(index);
    navigate(`/neighbor/${user_id}${userInfoSearch[index].to}`);
  };
  console.log(user);
  return (
    <div className="neighbor">
      <div className="user">
        <div className="avatar">
          <img
            src={`${process.env.REACT_APP_IMAGE}/${user.avatar}`}
            alt="avatar"
          />
        </div>
        <div className="detail">
          <p className="user-name">{user.name}</p>
          <p>{user.education}</p>
          <p style={{ fontWeight: "bold" }}>{user.nick_name}</p>
          <p>{user.description}</p>
          {user.educationStatus === educationStatus.DISABLE && (
            <div className="private-account">
              <p>This account is private</p>
            </div>
          )}
          {user.educationStatus !== educationStatus.DISABLE && (
            <div className="bottom-detail">
              <p>CPA - {user.cpa}</p>
            </div>
          )}
        </div>
      </div>
      <div className="service">
        {userInfoSearch.map((serviceItem, index) => {
          return (
            <div
              style={
                service === index
                  ? { paddingTop: "10px", borderTop: "1px solid black" }
                  : { paddingTop: "10px" }
              }
              className="service-item"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                handleChooseService(index);
              }}
            >
              <serviceItem.icon className="icon" />
              <p className="title-icon">{serviceItem.label}</p>
            </div>
          );
        })}
      </div>
      <div className="bottom-box">
        <div className="content">
          <Routes>
            {userInfoSearch.map((route, index) => {
              return (
                <Route
                  path={route.to}
                  exact
                  element={<route.element user_id={user_id} user={user} />}
                  key={index}
                />
              );
            })}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default NeighborDetail;
