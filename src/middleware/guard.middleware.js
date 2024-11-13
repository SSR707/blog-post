import { statusCodes } from "../utils/index.js"
import { Comment , Artical} from "../model/index.js"

export const isAdmin = (req , res , next) => {
  if(req.user.role === 'admin' || req.user.role === 'supperAdmin'){
    return next()
  }
  return res.status(statusCodes.FORBIDDEN).send({ message: "Admin huquqiga ega emas!" })
}

export const isSupperAdmin = (req , res , next) => {
  if(req.user.role === 'supperAdmin'){
    return next();
  }
  return res.status(statusCodes.FORBIDDEN).send({ message: "supperAdmin huquqiga ega emas!" })
}

export const isSupperAdminAndUser = (req , res , next) => {
  if(req.user.role === 'supperAdmin' || req.params.id === req.user.id){
    return next();
  }
  return res.status(statusCodes.FORBIDDEN).send({ message: "huquqiga ega emas!" })
}

export const isAdminAndUser = (req , res , next) => {
  if(req.user.role === 'supperAdmin' || req.params.id === req.user.id || req.user.role === 'admin'){
    return next();
  }
  return res.status(statusCodes.FORBIDDEN).send({ message: "huquqiga ega emas!" })
}

export const isAdminAndUserrComment = async (req , res , next) => {
  const comment = await Comment.findById(req.params.id)
  if(req.user.role === 'supperAdmin' || comment.userId.toString() === req.user.id || req.user.role === 'admin'){
    return next();
  }
  return res.status(statusCodes.FORBIDDEN).send({ message: "huquqiga ega emas!" })
}

export const isAdminAndUserrArtical = async (req , res , next) => {
  const artical = await Artical.findById(req.params.id)
  if(req.user.role === 'supperAdmin' || artical.authorId.toString() === req.user.id || req.user.role === 'admin'){
    return next();
  }
  return res.status(statusCodes.FORBIDDEN).send({ message: "huquqiga ega emas!" })
}