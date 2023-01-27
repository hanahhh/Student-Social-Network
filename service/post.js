import CONFIG_STATUS from "../config/status.json";
import { educationStatus } from "../config/systemStatus.js";
import Post from "../models/Post.js";
import { getUserByID } from "./user.js";

export const checkExistPost = async (post_id) => {
  let isExist = Boolean;
  const checkExist = await Post.exists({ _id: post_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const checkExistPostUser = async (post_id, user_id) => {
  let isExist = Boolean;
  const checkExist = await Post.exists({ _id: post_id, user_id: user_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllPost = async () => {
  let result = await Post.find().sort("-created_at");
  result = result.map((item, index) => {
    console.log(item.created_at);
    return {
      _id: item._id,
      user_id: item.user_id,
      content: item.content,
      image: item.image ? item.image.replaceAll("\\", "/") : item.image,
      tags: item.tags,
    };
  });
  return {
    result,
  };
};

export const getOwnPost = async (user_id) => {
  let result = await Post.find({ user_id }, "_id content image tags").sort(
    "-created_at"
  );
  result = result.map((item, index) => {
    return {
      _id: item._id,
      content: item.content,
      image: item.image ? item.image.replaceAll("\\", "/") : item.image,
      tags: item.tags,
    };
  });
  return {
    result,
  };
};

export const getAllPostByUserID = async (user_id) => {
  let result = await Post.find(
    { user_id },
    "_id user_id content image tags"
  ).sort("-created_at");
  const user = await getUserByID(user_id);
  if (user.user.educationStatus === educationStatus.DISABLE) {
    return [];
  }
  result = result.map((item, index) => {
    return {
      _id: item._id,
      user_id: item.user_id,
      content: item.content,
      image: item.image ? item.image.replaceAll("\\", "/") : item.image,
      tags: item.tags,
    };
  });
  return {
    result,
  };
};

export const getAllPostByTagID = async (tagList) => {
  let result = await Post.find(
    { tags: tagList },
    "_id user_id content image tags"
  ).sort("-created_at");
  result = result.map((item, index) => {
    return {
      _id: item._id,
      user_id: item.user_id,
      content: item.content,
      image: item.image ? item.image.replaceAll("\\", "/") : item.image,
      tags: item.tags,
    };
  });
  return {
    result,
  };
};

export const createPost = async ({ user_id, content, image, tags }) => {
  await Post.create({
    user_id,
    content,
    tags,
    image,
  });
  return {
    status: CONFIG_STATUS.SUCCESS,
    message: "The post is created successful.",
  };
};

export const getPostByID = async (post_id) => {
  const post = await Post.findOne(
    { _id: post_id },
    "user_id content image tags"
  );
  const post_detail = {
    _id: post._id,
    user_id: post.user_id,
    content: post.content,
    image: post.image ? post.image.replaceAll("\\", "/") : post.image,
    tags: post.tags,
  };
  return {
    post_detail,
  };
};

export const updatePostByID = async (form, post_id) => {
  const checkExist = await Post.exists({ _id: post_id });
  if (checkExist) {
    const update_result = await Post.findByIdAndUpdate(post_id, form, {
      new: true,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update post successful",
      result: {
        _id: update_result._id,
        user_id: update_result.user_id,
        content: update_result.content,
        image: update_result.image
          ? update_result.image.replaceAll("\\", "/")
          : update_result.image,
        tags: update_result.tags,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "Update post failed, post id is not exist. Please try again",
    };
  }
};

export const deletePost = async (post_id) => {
  const result = await Post.findByIdAndDelete(post_id);
  return {
    result,
  };
};
