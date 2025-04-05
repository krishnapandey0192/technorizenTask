export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    isSuccess: false,
    message: "Access Denied You are not admin",
  });
};
