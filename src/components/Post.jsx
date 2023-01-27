import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Post.scss";
import { getAllPostByTag } from "../service/tags";
import { getUserByID } from "../service/user";

const Post = ({ post, tags, auth }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getUserByID(post.user_id, (res) => {
      if (res.status === 1) {
        setUser(res.data.user);
      }
    });
  }, []);
  const tagList = post.tags.map((tag, index) => {
    return tags?.find((element) => element._id === tag);
  });
  const handleGetAllPostByTag = (id) => {
    const posts = getAllPostByTag(id);
    console.log(posts);
  };
  const handleVisitNeighbor = () => {
    if (post.user_id === auth._id) {
      navigate("/user/post");
    } else {
      navigate(`/neighbor/${post.user_id}/post`);
    }
  };

  return (
    <div className="post">
      <div className="avatar" onClick={handleVisitNeighbor}>
        <img
          src={`${process.env.REACT_APP_IMAGE}/${user?.avatar}`}
          alt="avatar"
          className="avatar-image"
        />
        <span>{user?.name}</span>
      </div>

      <img
        src={`${process.env.REACT_APP_IMAGE}/${post.image}`}
        alt="post-image"
      />
      <div className="content">
        <span>{post?.content}</span>
        <div className="tags">
          {tagList?.map((tag, index) => {
            return (
              <div
                className="tag"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  handleGetAllPostByTag(tag._id);
                }}
              >
                <span>@{tag?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
