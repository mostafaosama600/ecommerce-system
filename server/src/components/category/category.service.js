const CategoryModel = require("./category.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require("../../utils/catchAsync");
const { default: slugify } = require("slugify");

// exports.createCategory = factory.create(CategoryModel);

exports.createCategory = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file?.filename;
  let category = new CategoryModel(req.body);
  await category.save();
  res.status(200).json(category);
});

exports.getCategories = factory.getAll(CategoryModel);
exports.getCategory = factory.getById(CategoryModel);
exports.updateCategory = factory.update(CategoryModel);
exports.deleteCategory = factory.delete(CategoryModel);
