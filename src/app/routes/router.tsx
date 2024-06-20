import { ClientsPage } from "@/pages/clientsPage";
import { LoginPage } from "@/pages/loginPage";
import { ClientEditPage } from "@/pages/clientEditPage";
import { UserPage } from "@/pages/userPage";
import { createBrowserRouter } from "react-router-dom";
import { RequerAdmin } from "./RequerAdmin/RequerAdmin";
import { Paths } from "@/shared/type";
import "@mantine/notifications/styles.css";
import { Layout } from "../layout";

export const router = createBrowserRouter([
  {
    path: Paths.Login,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: `${Paths.UserPage}/:id`,
        element: <UserPage />,
      },
      {
        path: Paths.Admin,
        element: <RequerAdmin />,
        children: [
          {
            index: true,
            element: <ClientsPage />,
          },
          {
            path: "edit/:id",
            element: <ClientEditPage />,
          },
        ],
      },
    ],
  },
]);
