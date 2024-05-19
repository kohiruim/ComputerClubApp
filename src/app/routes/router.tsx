import { ClientsPage, LoginPage, ClientEditPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { RequerAdmin } from "./RequerAdmin/RequerAdmin";
import { Paths } from "@/shared";
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
