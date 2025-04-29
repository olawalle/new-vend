import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./layouts/auth.tsx", [route("/login", "routes/auth/login.tsx"), route("/forgotPassword", "routes/auth/forgotPassword.tsx")]),
  layout("./layouts/dashboard.tsx", [
    route("/dashboard", "routes/dashboard/home.tsx"),
    route("/vendors", "routes/dashboard/vendor-mgt/vendorList.tsx"),
    route("/vendors-details", "routes/dashboard/vendor-mgt/vendorDetails.tsx"),
    route("/customers", "routes/dashboard/customer-mgt/customer-list.tsx"),
    route("/all-orders", "routes/dashboard/order-mgt/all-orders.tsx"),
    route("/order-details", "routes/dashboard/order-mgt/orderDetails.tsx"),
    route("/vendor-products", "routes/dashboard/vendor-mgt/vendor-products.tsx"),


  ]),
] satisfies RouteConfig;
