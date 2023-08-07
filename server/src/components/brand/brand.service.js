const BrandModel = require("./brand.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require("../../utils/catchAsync");
const { default: slugify } = require("slugify");

// exports.createBrand = factory.create(BrandModel);

exports.createBrand = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file?.filename;
  let Brand = new BrandModel(req.body);
  await Brand.save();
  res.status(200).json(Brand);
});

exports.getBrands = factory.getAll(BrandModel);
exports.getBrand = factory.getById(BrandModel);
exports.updateBrand = factory.update(BrandModel);
exports.deleteBrand = factory.delete(BrandModel);
