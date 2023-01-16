import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/TheSidebar.scss";
import { logout } from "../redux/slice/auth";
import { logoutUser } from "../service/auth";

const TheSidebar = ({ menu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = `/${useLocation().pathname.split("/")[1]}`;
  const [iconChoosing, setIconChoosing] = useState(menu[0].to);

  useEffect(() => {
    setIconChoosing(path);
  }, [iconChoosing]);

  const handleChooseIcon = (item) => {
    if (item.label === "Logout") {
      dispatch(logout());
      logoutUser();
    }
    setIconChoosing(item.to);
    navigate(item.to);
  };
  return (
    <div className="sidebar">
      {menu.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleChooseIcon(item)}
            className="icon-sidebar"
          >
            {item.to === iconChoosing ? (
              <div>
                <item.iconFill style={{ fontSize: "25px" }} />
                <span className="label">{item.label}</span>
              </div>
            ) : (
              <div>
                <item.icon style={{ fontSize: "25px" }} />
                <span className="label">{item.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TheSidebar;
