import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchemeSingUp = z.object({
  name: z
    .string()
    .min(3, {
      message: "O nome precisa ter pelo menos 3 caracteres.",
    })
    .max(50),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido",
  }),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .max(20, "A senha não pode ter mais de 20 caracteres."),

  confirmPassword: z
    .string()
    .min(8, "A confirmação da senha deve ter pelo menos 8 caracteres.")
    .max(20, "A confirmação da senha não pode ter mais de 20 caracteres."),
});

type FormData = z.infer<typeof formSchemeSingUp>;

export function SingUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchemeSingUp),
  });

  const onCreateUserForm = (data: FormData) => {
    console.log("Form data:", data);
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
          className="w-1/2 space-y-6"
          onSubmit={handleSubmit(onCreateUserForm)}
        >
          <h1 className="text-2xl text-center">Cadastro</h1>
          <div>
            <Label>Nome:</Label>
            <Input
              placeholder="Digite seu nome"
              className="text-sm"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-600  text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label>Email:</Label>
            <Input
              placeholder="Digite seu email"
              className="text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600  text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label>Senha:</Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              className="text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600  text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label>Confirmar senha:</Label>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              className="text-sm"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-600  text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="bg-slate-100 border-slate-100" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Li e concordo com os termos de uso
              </label>
            </div>
          </div>
          <div>
            <Button className="bg-slate-200 text-zinc-950 hover:bg-slate-300 w-full text-center">
              criar conta
            </Button>
            <p className="text-zinc-400 mt-1">
              Já tem uma conta?{" "}
              <a href="/login" className="underline">
                login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
