import { Artical } from "../model/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
import { articalValidation , searchBlogsValidation} from "../schema/index.js";

export const getAllArticals = async (req, res, next) => {
  try {
    const articals = await Artical.find();
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: articals,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getArticalsById = async (req, res, next) => {
  try {
    const articals = await Artical.findById(req.params.id);
    if (!articals) {
      return res.send(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: articals,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const searchArticals = async (req, res, next) => {
  try {
    const { error, value } = searchBlogsValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const search = req.query.title || "";
    const articals = await Artical.find({title: { $regex: search, $options: "i" }});
    console.log(articals)
    if (!articals) {
      return res.status(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: articals,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const filterArticals = async (req, res, next) => {
  try {
    const filter = req.query;
    const articals = await Artical.find({ ...filter });
    if (!articals) {
      return res.status(statusCodes.NOT_FOUND).send({
        message: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: articals,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getPageArticals = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const articals = await Artical.find().skip(skip).limit(limit);
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: articals,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const createArtical = async (req, res, next) => {
  try {
    const { error, value } = articalValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].path,
      });
    }

    const articals = new Artical({ authorId: req.user.id, ...req.body });
    await articals.save();
    return res.status(statusCodes.CREATED).send({
      status: "Created",
      data: articals,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const updateArtical = async (req, res, next) => {
  try {
    const data = await Artical.findById(req.params.id);
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        messages: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    const newArtical = {
      ...data._doc,
      ...req.body,
    };
    const articals = await Artical.findByIdAndUpdate(req.params.id, newArtical);
    return res.status(statusCodes.OK).send({
      status: "Sucsess",
      data: articals._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const deleteArtical = async (req, res, next) => {
  try {
    const data = await Artical.findById(req.params.id);
    if (!data) {
      return res.status(statusCodes.NOT_FOUND).send({
        messages: errorMessages.ARTICLE_NOT_FOUND,
      });
    }
    const artical = await Artical.findByIdAndDelete(req.params.id);
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: artical._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
