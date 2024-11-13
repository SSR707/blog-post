import { Comment } from "../model/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
import { commentValidation , contentComentaryValidation} from "../schema/index.js";

export const getAllComment = async (req, res, next) => {
  try {
    const comment = await Comment.find();
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: comment,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.send(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: comment,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const searchComment = async (req, res, next) => {
  try {
    const { error, value } = contentComentaryValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const search = req.query.content || "";
    const comment = await Comment.find({ content : {$regex: search,$options: "i"}});
    if (!comment) {
      return res.status(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: comment,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const filterComment = async (req, res, next) => {
  try {
    const filter = req.query;
    const comment = await Comment.find({ ...filter });
    if (!comment) {
      return res.status(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: comment,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getPageComment = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const comment = await Comment.find().skip(skip).limit(limit);
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: comment,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { error, value } = commentValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const comment = new Comment({ userId: req.user.id, ...req.body });
    await comment.save();
    return res.status(statusCodes.CREATED).send({
      status: "Created",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const data = await Comment.findById(req.params.id);
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        messages: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    const newComment = {
      ...data._doc,
      ...req.body,
    };
    const comment = await Comment.findByIdAndUpdate(req.params.id, newComment);
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: comment._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const data = await Comment.findById(req.params.id);
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        messages: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    const comment = await Comment.findByIdAndDelete(req.params.id);
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: comment._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
