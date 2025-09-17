import { Layout } from "../../components/MultistepForm/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { multistepFormSchema } from "../../consts/schemas";
import { useNavigate } from "react-router-dom";
import type z from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

function SecondStep() {
  const router = useNavigate();
  const formMethods = useForm({
    resolver: zodResolver(
      multistepFormSchema.pick({
        password: true,
        confirmPassword: true,
      })
    ),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  type FormDataType = z.infer<typeof multistepFormSchema>;

  function onSubmit(data: Pick<FormDataType, "password" | "confirmPassword">) {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    console.log("data", data);
    router("/multistep-form-3");
    //Pick<FormDataType);
  }
  return (
    <div>
      {" "}
      <Layout step={2}>
        {errors && errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        {errors && errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <Input
            placeholder="Password"
            type="password"
            {...formMethods.register("password")}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            {...formMethods.register("confirmPassword")}
          />

          <Button type="submit">Next Step {">"}</Button>
        </form>
      </Layout>
    </div>
  );
}

export default SecondStep;
