import jwt from "jsonwebtoken"

export const requireAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies
    if(!token) {
      return res.status(400).json({
        message : "Unauthorized request",
        success : false
      })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if(!decode) {
      return res.status(400).json({
        message : "token is invalid",
        success : false
      })
    }
    req.user = decode.userId
    next()
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}
