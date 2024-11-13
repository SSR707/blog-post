import Joi from "joi";

export const verifyValidation = (data) => {
    const schema = Joi.object({
        otp: Joi.string().required(),
        email:Joi.string().required(),
    })
    return schema.validate(data)
}

export const forgetPassValidation = (data) => {
    const schema = Joi.object({
        otp: Joi.string().required(),
        new_password:Joi.string().required(),
    })
    return schema.validate(data)
}

export const searchAdminValidation = (data) => {
    const schema = Joi.object({
        fullname: Joi.string().required(),
    })
    return schema.validate(data)
}

export const searchBlogsValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
    })
    return schema.validate(data)
}

export const  nameValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    })
    return schema.validate(data)
}

export const  contentComentaryValidation = (data) => {
    const schema = Joi.object({
        content: Joi.string().required(),
    })
    return schema.validate(data)
}