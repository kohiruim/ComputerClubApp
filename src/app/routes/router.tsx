import { ClientsPage, LoginPage, ClientEditPage, QuizzesPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { RequerAdmin } from "./RequerAdmin/RequerAdmin";
import { RequerAuth } from "./RequerAuth/RequerAuth";
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
      {
        path: Paths.Quizzes,
        element: <RequerAuth />,
        children: [
          {
            index: true,
            element: <QuizzesPage />,
          },
        ],
      },
    ],
  },
]);
