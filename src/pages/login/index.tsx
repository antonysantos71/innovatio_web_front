import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-provider/useAuth";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formScheme = z.object({
  email: z.string().email("Por favor, insira um e-mail válido"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres"),
});

type FormData = z.infer<typeof formScheme>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formScheme),
  });

  const { authenticate } = useAuth();
  const navigate = useNavigate();  


const onSubmitLogin = async (data: FormData) => {
  const success = await authenticate(data.email, data.password);
  if (!success) {
    toast({
      className: "bg-green-500 border-green-400 text-black",
      title: "Success", 
      description: `Login successful for ${data.email}`,
    });
    navigate("/dashboard"); 
  } else {
    toast({
      title: "Error",
      description: "Invalid email or password",
    });
  }
};

  return (
    <div className="flex text-slate-100 h-screen">
      <div className="flex items-center justify-center w-1/2 h-full">
        <img
          src="src\assets\logo transparente 2.png"
          alt=""
          className="w-1/2"
        />
      </div>
      <div className="flex items-center justify-center h-full flex-1 bg-slate-900">
        <form
          onSubmit={handleSubmit(onSubmitLogin)}
          className="w-1/2 space-y-6"
        >
          <h1 className="text-2xl text-center">Login</h1>
          <div>
            <Label>Email:</Label>
            <Input
              {...register("email")}
              placeholder="Digite seu email"
              className="text-sm"
            />
            {errors.email && (
              <p className="text-red-600  text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label>Senha:</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Digite sua senha"
              className="text-sm"
            />
            {errors.password && (
              <p className="text-red-600  text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="bg-slate-100 border-slate-100" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mostrar a senha
              </label>
            </div>
            <a href="#" className="text-zinc-400 underline">
              esqueceu a senha?
            </a>
          </div>
          <div>
            <Button className="bg-slate-200 text-zinc-950 hover:bg-slate-300 w-full text-center">
              Acessar plataforma
            </Button>

            <p className="text-center my-1">ou</p>
            <div className="space-y-2">
              <Button className="bg-slate-200 text-zinc-950 hover:bg-slate-300 w-full text-center">
                <img
                  src="src\assets\logo-google.png"
                  alt="google"
                  className="w-6 h-6"
                />
                continuar com o google
              </Button>
              <Button className="bg-slate-200 text-zinc-950 hover:bg-slate-300 w-full text-center">
                <img
                  src="src\assets\logo-facebook.png"
                  alt="google"
                  className="w-6 h-6"
                />
                continuar com o facebook
              </Button>
            </div>
            <p className="text-zinc-400 mt-1">
              Já tem uma conta?{" "}
              <a href="/sing-up" className="underline">
                cadastrar
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
