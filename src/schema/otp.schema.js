import Joi from "joi";

export const otpValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        otp_code:Joi.string().required(),
        expires_at: Joi.date()
    })
    return schema.validate(data)
}