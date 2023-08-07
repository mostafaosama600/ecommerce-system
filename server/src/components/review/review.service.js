const ReviewModel = require("./review.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");

// exports.createReview = factory.create(ReviewModel);

exports.createReview = catchAsyncError(async (req, res, next) => {
  const isReview = await ReviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });

  if (isReview) {
    return next(new AppError("You have created this review before!", 400));
  }
  let Review = new ReviewModel(req.body);
  await Review.save();
  res.status(200).json({ result: Review });
});

exports.getReviews = factory.getAll(ReviewModel);
exports.getReview = factory.getById(ReviewModel);
// exports.updateReview = factory.update(ReviewModel);

exports.updateReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const isReview = await ReviewModel.findById(id);
  if (isReview.user.toString() == req.user._id.toString()) {
    let Review = await ReviewModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !Review && next(new AppError("Review not found", 400));
    Review && res.status(200).json({ result: Review });
  } else {
    next(new AppError("You are not authorized", 400));
  }
});

exports.deleteReview = factory.delete(ReviewModel);
