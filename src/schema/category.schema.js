import Joi from "joi";

export const categoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};
