import { User } from "../model/index.js";
import { searchAdminValidation } from "../schema/rquets.schema.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";

export const userProfileCon = async (req, res, next) => {
  try {
    const payload = req.user;
    const currentUser = await User.findOne({ email: payload.sub });
    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }

    return res.send(currentUser);
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: users,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).send({
        stasus: errorMessages.NO,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: user,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const searchUser = async (req, res, next) => {
  try {
    const { error, value } = searchAdminValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const search = req.query.fullname || "";
    const user = await User.find({fullname : {$regex: search,$options: "i"}});
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).send({
        stasus: errorMessages.NO,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: user,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};


export const filterUser = async (req, res, next) => {
  try {
    const user = await User.find({ ...req.query });
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).send({
        stasus: errorMessages.NO,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: user,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getPageUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: users,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.USER_NOT_FOUND,
      });
    }
    const newUserData = { ...user._doc, ...req.body };
    const newUser = await User.findByIdAndUpdate(req.params.id, newUserData);
    return res.status(statusCodes.OK).send({
      status: "Seccuss",
      id: newUser._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.USER_NOT_FOUND,
      });
    }
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    return res.status(statusCodes.OK).send({
      status: "Seccuss",
      data: deleteUser._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
