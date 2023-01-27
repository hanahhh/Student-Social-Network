import React, { useEffect, useState } from "react";
import PostUser from "./PostUser";
import { List, message } from "antd";
import { getPostByUserID } from "../service/post";
import { useSelector } from "react-redux";

const Post = ({ user_id }) => {
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    getPostByUserID(user_id, {}, {}, {}, (res) => {
      if (res.status === 1) {
        setMyPost(res.data.result);
      }
    });
  }, []);
  return (
    <div className="post-list">
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
    </div>
  );
};

export default Post;
