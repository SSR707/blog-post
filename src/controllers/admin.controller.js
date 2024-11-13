import { User } from "../model/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
import { registerValidation ,searchAdminValidation } from "../schema/index.js";
export const getAllAdmin = async (req, res, next) => {
  try {
    const data = await User.find({ role: "admin" });
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const gatPageAdmin = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const data = await User.find({ role: "admin" }).skip(skip).limit(limit);
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
export const searchAdmin = async (req, res, next) => {
  try {
    const { error, value } = searchAdminValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const search = req.query.fullname || "";
    const data = await User.find({ role: "admin", or:[{fullname : {$regex: search ,$options: "i"}}] });
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const filterAdmin = async (req, res, next) => {
  try {
    const filter = req.query;

    const data = await User.find({ role: "admin", ...filter });
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getAdminByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ role: "admin", _id: id });
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const createAdmin = async (req, res, next) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const { email, role } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      const user = new User(req.body);
      await user.save();
      return res.status(statusCodes.CREATED).send("created");
    }

    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await User.findOne({ role: "admin", _id: id });
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    const updateData = { ...data._doc, ...body };
    console.log(updateData);
    const admin = await User.findByIdAndUpdate(id, updateData);

    return res.status(statusCodes.OK).send({
      status: "Success",
      data: admin._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const data = await User.findOne({ role: "admin", _id: id });
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    const admin = await User.findByIdAndDelete(req.params.id);

    return res.status(statusCodes.OK).send({
      status: "Success",
      data: admin._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
