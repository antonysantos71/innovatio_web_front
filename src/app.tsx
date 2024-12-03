import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Login } from "./pages/login";
import { SingUp } from "./pages/sing-up";
import Dashboard from "./pages/dashboard";

import { Toaster } from "./components/ui/toaster";
import AuthProviderWrapper from "./contexts/auth/auth-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Button>hellou</Button>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "sing-up",
    element: <SingUp />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);
export function App() {
  return (
    <AuthProviderWrapper>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProviderWrapper>
  );
}
