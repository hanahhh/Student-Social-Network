import { List, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostUser from "../../components/PostUser";
import userService from "../../configs/serviceUser";
import "../../css/UserDetail.scss";
import { getMyPost } from "../../service/post";
import { getUserByID, getUserInfo } from "../../service/user";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { getRoute } from "../../configs/getRoute";

const User = () => {
  const path = `/${useLocation().pathname.split("/")[2]}`;
  const serviceType = getRoute(userService, path);
  const [user, setUser] = useState({});
  const [service, setService] = useState(serviceType);
  const info = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo((res) => {
      if (res.status === 1) {
        setUser(res.data.user);
      } else {
        message.error("Get user failed.");
      }
    });
  }, [service, path]);

  const handleChooseService = (index) => {
    setService(index);
    navigate(`/user${userService[index].to}`);
  };
  return (
    <div className="user-detail">
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
        </div>
      </div>
      <div className="service">
        {userService.map((serviceItem, index) => {
          return (
            <div
              style={
                service === index
                  ? { paddingTop: "10px", borderTop: "2px solid black" }
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
            {userService.map((route, index) => {
              return (
                <Route
                  path={route.to}
                  exact
                  element={<route.element user={user} />}
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

export default User;

/**<div className="post-list">
          <List
            grid={{
              gutter: 16,
              column: 3,
            }}
            dataSource={myPost}
            renderItem={(item, index) => (
              <List.Item>
                <PostUser post={item} key={index} />
              </List.Item>
            )}
          />
        </div> */
