import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./layouts/auth.tsx", [route("/login", "routes/auth/login.tsx")]),
  layout("./layouts/dashboard.tsx", [
    route("/dashboard", "routes/dashboard/home.tsx"),
  ]),
] satisfies RouteConfig;
