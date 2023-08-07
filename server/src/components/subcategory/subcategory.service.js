const SubCategoryModel = require("./subcategory.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require("../../utils/catchAsync");
const { default: slugify } = require("slugify");

// exports.createSubCategory = factory.create(SubCategoryModel);

exports.createSubCategory = catchAsyncError(async (req, res) => {
  const { name, category } = req.body;
  let subcategory = new SubCategoryModel({
    name,
    slug: slugify(name),
    category,
  });
  await subcategory.save();
  res.status(200).json(subcategory);
});

exports.getSubCategories = factory.getAll(SubCategoryModel);
exports.getSubCategory = factory.getById(SubCategoryModel);
exports.updateSubCategory = factory.update(SubCategoryModel);
exports.deleteSubCategory = factory.delete(SubCategoryModel);
