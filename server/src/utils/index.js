exports.allRequires = (app) => {
  app.use("/api/v1/categories", require("../components/category/category.api"));
  app.use(
    "/api/v1/subcategories",
    require("../components/subcategory/subcategory.api")
  );
  app.use("/api/v1/brands", require("../components/brand/brand.api"));
  app.use("/api/v1/products", require("../components/product/product.api"));
  app.use("/api/v1/users", require("../components/user/user.api"));
  app.use("/api/v1/reviews", require("../components/review/review.api"));
  app.use("/api/v1/addresses", require("../components/address/address.api"));
};
