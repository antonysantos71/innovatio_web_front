import { useAuth } from "@/contexts/auth-provider/useAuth";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { email } = useAuth();

  if (!email) {
    return <h1 className="text-white">necessario logar</h1>
  }

  return children;
}
