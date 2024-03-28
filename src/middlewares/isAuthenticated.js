const isAuthenticated = (roles) => {
  return async (req, res, next) => {
    const getRole = roles.find(role => role === req.user.role)
    if(!req.user) return res.status(401).json({message: 'Unauthorized'})
    if(req.user.role !== getRole) return res.status(403).json({
      status:"Error",
      message: `You don't have permission because you are ${req.user.role} and you need to be ${roles}`})
    next()
  }
}

export default isAuthenticated;