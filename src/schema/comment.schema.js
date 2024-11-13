import Joi from "joi";

export const commentValidation = (data) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    articleId: Joi.string().required(),
    userId: Joi.string(),
    courseId: Joi.string().required(),
  });
  return schema.validate(data);
};
