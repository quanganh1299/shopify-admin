import DashBoard from "../pages/dashboard/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import { EPath } from "./routesConfig";
import Products from "../pages/products/Products";

export const route = [
  {
    path: EPath.dashboard,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />
      },
      {
        path: EPath.products,
        element: <Products />
      },
      {
        path: EPath.setting,
        element: <h1>Settings</h1>
      }
    ]
  }
]