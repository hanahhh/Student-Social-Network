import { List, message } from "antd";
import React, { useEffect, useState } from "react";
import PostUser from "../../../components/PostUser";
import { getMyPost } from "../../../service/post";

const OwnPost = () => {
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    getMyPost({}, {}, {}, (res) => {
      if (res.status === 1) {
        setMyPost(res.data.result);
      } else {
        message.error("You have no post.");
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

export default OwnPost;
