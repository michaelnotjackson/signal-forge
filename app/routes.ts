import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  layout("shell.tsx", [
    route("dashboard/", "routes/dashboard.tsx")
  ])
] satisfies RouteConfig;
