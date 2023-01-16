import React from "react";
import "../css/PostUser.scss";

const PostUser = ({ post }) => {
  return (
    <img
      className="post-user"
      src={`${process.env.REACT_APP_IMAGE}/${post.image}`}
      alt="post-image"
    />
  );
};

export default PostUser;
