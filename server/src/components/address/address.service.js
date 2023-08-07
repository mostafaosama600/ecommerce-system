const UserModel = require("../user/user.model");
const { catchAsyncError } = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");

exports.addToAddress = catchAsyncError(async (req, res, next) => {
  const { addresses } = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  !addresses && next(new AppError("address not found", 400));
  addresses && res.status(200).json(addresses);
});

exports.removeFromAddress = catchAsyncError(async (req, res, next) => {
  const { addresses } = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.body.address } },
    },
    { new: true }
  );
  !addresses && next(new AppError("address not found", 400));
  addresses && res.status(200).json(addresses);
});

exports.getAllAddress = catchAsyncError(async (req, res, next) => {
  const { addresses } = await UserModel.findById(req.user._id);
  !addresses && next(new AppError("address not found", 400));
  addresses && res.status(200).json(addresses);
});
