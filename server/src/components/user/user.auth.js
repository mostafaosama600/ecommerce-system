const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = catchAsyncError(async (req, res, next) => {
  let isUser = await UserModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("user is already exist", 401));
  req.body.role = "user"; // Set the role to "user"
  let User = await new UserModel(req.body);
  await User.save();
  res.status(200).json({ result: User });
});
exports.signin = catchAsyncError(async (req, res, next) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new AppError("incorrect email or password", 401));
  let token = jwt.sign(
    { name: user.name, userId: user._id },
    process.env.JWT_KEY
  );
  res.status(200).json({ token });
});

exports.signinAdmin = catchAsyncError(async (req, res, next) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  if (user.role !== "admin") {
    return next(new AppError("You have't permission to access this page", 403));
  }
  let token = jwt.sign(
    { name: user.name, userId: user._id },
    process.env.JWT_KEY
  );
  res.status(200).json({ token });
});

exports.ProtectedRoutes = catchAsyncError(async (req, res, next) => {
  let token = req.headers.token;
  if (!token) return next(new AppError("token not provided", 401));
  let decoded = await jwt.verify(token, process.env.JWT_KEY);
  let user = await UserModel.findById(decoded.userId);
  if (!user) return next(new AppError("user not found", 401));
  if (user.changePasswordAt) {
    let changePassword = parseInt(user.changePasswordAt.getTime() / 1000);
    if (changePassword > decoded.iat)
      return next(new AppError("password changed", 401));
  }
  req.user = user;
  next();
});

exports.allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("you are not authorized to access this route", 401)
      );
    next();
  });
};
