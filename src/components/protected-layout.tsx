import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};
