import { lazy } from "react";
import type { RouteObject } from "react-router";
import { DashboardLayout } from "@/components/layout/Dashboard-layout";

// Bundle split for each section
const Billing = lazy(() => import("@/featuers/billing/Billing.view"));
const Statistics = lazy(() => import("@/featuers/statistics/Statistics.view"));
const Setting = lazy(() => import("@/featuers/setting/Setting.view"));
const Users = lazy(() => import("@/featuers/users/Users.view"));
const UserDetails = lazy(
  () => import("@/featuers/user-details/User-details.view")
);
const BreakerPanels = lazy(
  () => import("@/featuers/breaker-panels/Brealer-panels.view")
);
const BreakerPanel = lazy(
  () => import("@/featuers/breaker-panel/Breaker-panel.view")
);

export const router: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "user-details",
        element: <UserDetails />,
      },
      {
        path: "breaker-panels",
        children: [
          {
            index: true, // /breaker-panels
            element: <BreakerPanels />,
          },
          {
            path: "user/:id", // /breaker-panels/user/:id
            element: <BreakerPanel />,
          },
        ],
      },
    ],
  },
];
