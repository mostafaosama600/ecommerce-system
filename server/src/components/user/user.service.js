const UserModel = require("./user.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");

// exports.createUser = factory.create(UserModel);

exports.createUser = catchAsyncError(async (req, res, next) => {
  let isUser = await UserModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("User already exists", 401));
  req.body.role = "admin"; // Set the role to "admin"
  let user = new UserModel(req.body);
  await user.save();
  res.status(200).json(user);
});

exports.getUsers = factory.getAll(UserModel);
exports.getUser = factory.getById(UserModel);
exports.updateUser = factory.update(UserModel);
exports.deleteUser = factory.delete(UserModel);

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangeAt = Date.now();
  let user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
  !user && next(new AppError("user not found", 400));
  user && res.status(200).json({ result: user });
});
