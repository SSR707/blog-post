import { Category } from "../model/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
import { categoryValidation, nameValidation } from "../schema/index.js";

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: category,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.send(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: category,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const searchCategory = async (req, res, next) => {
  try {
    const { error, value } = nameValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const search = req.query.name || "";
    const category = await Category.find({ name: {$regex: search,$options: "i"} });
    if (!category) {
      return res.status(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: category,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};


export const filterCategory = async (req, res, next) => {
  try {
    const filter = req.query;
    const category = await Category.find({ ...filter });
    if (!category) {
      return res.status(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: category,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getPageCategory = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const category = await Category.find().skip(skip).limit(limit);
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: category,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const category = new Category({ ...req.body });
    await category.save();
    return res.status(statusCodes.CREATED).send({
      status: "Created",
      data: category,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        messages: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    const newCategory = {
      ...data._doc,
      ...req.body,
    };
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      newCategory
    );
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: category._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        messages: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: category._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
