import Joi from "joi";

export const articalValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    authorId: Joi.string(),
    categoryId: Joi.string().required()
  });
  return schema.validate(data);
};
