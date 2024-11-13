import { Courses } from "../model/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
import { coursesValidation, nameValidation } from "../schema/index.js";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Courses.find();
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: courses,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getCoursesById = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: course,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const getPageCourses = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const courses = await Courses.find().skip(skip).limit(limit);
    return res.send(statusCodes.OK).send({
      status: "Success",
      data: courses,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const searchCourses = async (req, res, next) => {
  try {
    const { error, value } = nameValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const search = req.query.name || "";
    const course = await Courses.find({ name : {$regex: search,$options: "i"}});
    if (!course) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: course,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const filterCourses = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const course = await Courses.find({ ...filter });
    if (!course) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: course,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const createCourses = async (req, res, next) => {
  try {
    const { error, value } = coursesValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    
    const course = new Courses({ ...req.body });
    await course.save();
    return res.status(statusCodes.CREATED).send({
      status: "Created",
      data: course,
    });
  } catch (error) {
    console.log(error)
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const updateCourses = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    const newData = {
      ...course._doc,
      ...req.body,
    };
    const updateCourse = await Courses.findByIdAndUpdate(
      req.params.id,
      newData
    );
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: updateCourse._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const deleteCourses = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
      });
    }
    const deleteCourse = await Courses.findByIdAndDelete(req.params.id);
    return res.status(statusCodes.OK).send({
      status: "Success",
      data: deleteCourse._id,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};
