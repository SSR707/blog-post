import Joi from "joi";

export const coursesValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    categoryId: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};
