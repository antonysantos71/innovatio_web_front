import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Login } from "./pages/login";
import { SingUp } from "./pages/sing-up";
import Dashboard from "./pages/dashboard";
import { AuthProvider } from "./contexts/auth-provider";
import { Toaster } from "./components/ui/toaster";

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
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </AuthProvider>
  );
}
