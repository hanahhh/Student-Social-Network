import CONFIG_STATUS from "../config/status.json";

export const TryCatch = (f) => async (req, res, next) => {
  try {
    await f(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const errorHandle = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: CONFIG_STATUS.SERVER_ERROR,
    message: err.message,
  });
  console.log(err);
};
