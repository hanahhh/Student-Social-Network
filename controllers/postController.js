import CONFIG_STATUS from "../config/status.json";
import { deleteOldImagePostListener } from "../listener/imageListener.js";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistPost,
  checkExistPostUser,
  createPost,
  deletePost,
  getAllPost,
  getAllPostByTagID,
  getAllPostByUserID,
  getOwnPost,
  getPostByID,
  updatePostByID,
} from "../service/post.js";
import { checkExistTag, getTagByID, updateTagByID } from "../service/tag.js";
import { checkExistUser, getUserByID } from "../service/user.js";
import { verifyToken } from "../utils/security.js";

export const getAllPostController = async (req, res) => {
  let post_list = await getAllPost();
  dataHandle(post_list, req, res);
};

export const createPostController = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);
  const user_id = decodedToken.data._id;
  const { content, tags, image, user_avatar, user_name } = req.body;
  if (content == null || image == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkUser = checkExistUser(user_id);
    if (!checkUser) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "User is not exists. Please try again.",
      });
    }

    for (let i = 0; i < tags.length; i++) {
      const check = await checkExistTag(tags[i]);
      if (!check) {
        res.status(500).send({
          ...check,
        });
      } else {
        const tag = await getTagByID(tags[i]);
        await updateTagByID(
          {
            post_amount: tag.tag_detail.post_amount + 1,
          },
          tags[i]
        );
      }
    }
    const result = await createPost(req.body, user_id);
    if (result.status != 0) {
      res.status(200).send({
        ...result,
      });
    } else {
      res.status(500).send({
        ...result,
      });
    }
  }
};

export const uploadPostImageController = async (req, res) => {
  const image = req.file;
  if (!image) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Upload failed. File is empty.",
    });
  } else {
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Upload post image successful.",
      data: {
        path: image.path
          .substr(image.path.indexOf("/") + 1)
          .replaceAll("\\", "/"),
      },
    });
  }
};

export const uploadPostImageControllerByID = async (req, res) => {
  const { post_id } = req.params;
  const image = req.file;
  if (post_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Please try again, supplier_id is null.",
    });
  } else {
    const { isExist } = await checkExistPost(post_id);
    if (!isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Please try again, post is not exists.",
      });
    } else if (!image) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Upload failed. File is empty.",
      });
    } else {
      const { post } = await getPostByID(post_id);
      //Dispatch delete old file
      post.image && deleteOldImagePostListener(post.image);
      res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: "Upload supplier avatar successful.",
        data: {
          path: image.path.substr(image.path.indexOf("/") + 1),
        },
      });
    }
  }
};

export const getOwnPostController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);
  const user_id = decodedToken.data._id;
  const post_list = await getOwnPost(user_id);
  dataHandle(post_list, req, res);
};

export const getPostByIDController = async (req, res) => {
  const { post_id } = req.params;
  const { isExist } = await checkExistPost(post_id);
  if (isExist) {
    const post = await getPostByID(post_id);
    const user = await getUserByID(post.post_detail.user_id);
    const returnPost = {
      ...post,
      post_detail: {
        ...post.post_detail,
        user_avatar: user.user.avatar,
        user_name: user.user.name,
      },
    };
    console.log(returnPost);
    dataHandle(post, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Post is not exist.",
    });
  }
};

export const getAllPostByUserIDController = async (req, res) => {
  const { user_id } = req.params;
  const { isExist } = await checkExistUser(user_id);
  if (isExist) {
    const post = await getAllPostByUserID(user_id);
    dataHandle(post, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};

export const getAllPostByTagIDController = async (req, res) => {
  const tagList = req.body;
  // let postList = [];
  // for (let i = 0; i < tagList.length; i++) {
  //   const { isExist } = await checkExistTag(tagList[i]);
  //   if (isExist) {
  const post = await getAllPostByTagID(tagList);
  //postList = postList.concat(post.result);
  //   } else {
  //     res.status(400).send({
  //       status: CONFIG_STATUS.FAIL,
  //       message: "Some tag is not exist.",
  //     });
  //   }
  // }
  dataHandle(post, req, res);
};

export const updatePostByIdController = async (req, res) => {
  const { post_id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);
  const user_id = decodedToken.data._id;

  if (user_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updatePostByID(updates, post_id, user_id);
    if (result.status == 0) {
      res.status(500).send({
        ...result,
      });
    } else {
      res.send({
        ...result,
      });
    }
  }
};

export const deletePostController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);
  const user_id = decodedToken.data._id;
  const { post_id } = req.params;
  const { isExist } = await checkExistPostUser(post_id, user_id);
  if (isExist) {
    const post = await deletePost(post_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete post successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "You are not granted to delete this post.",
    });
  }
};
