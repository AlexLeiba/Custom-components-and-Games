import { Layout } from "../../components/MultistepForm/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { multistepFormSchema } from "../../consts/schemas";
import { Input } from "../../components/ui/input";
import type z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useStore } from "../../store/store";

// create a layoput which will show on which step you are
// and will be used across all steps
//create store with zustand to keep all form data (in localStorage to not lose data at the reload) and to show at last step all introduced data / to send to backed
//if at a specific step (the prev step wasnt validated) then redirect back

//create a schema with all steps data
//at each step Pick only the fields you need

//also add in schema interseptionUnions To show fields conditionally based on other fields values.
//use react-hook-form with zod resolver
//add array fields with useFieldArray

//at last step show all data and a submit button
//on submit show a success message (with your toast) or errors)

function FirstStep() {
  const {
    addFormData,
    formData: { firstStep },
  } = useStore();
  const router = useNavigate();
  const formMethods = useForm({
    resolver: zodResolver(
      multistepFormSchema.pick({
        name: true,
        username: true,
        email: true,
        age: true,
      })
    ),
    defaultValues: {
      name: firstStep.name || "",
      username: firstStep.username || "",
      email: firstStep.email || "",
      age: firstStep.age || 0,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  type FormDataType = z.infer<typeof multistepFormSchema>;

  function onSubmit(
    data: Pick<FormDataType, "name" | "username" | "email" | "age">
  ) {
    addFormData({ firstStep: data });
    router("/multistep-form-2");
    //Pick<FormDataType);
  }

  return (
    <div>
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <Layout step={1}>
        <h1 className="text-2xl font-bold">First Step</h1>

        {errors && errors.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
        {errors && errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        {errors && errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        {errors && errors.age && (
          <p className="text-red-500">{errors.age.message}</p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <Input placeholder="Name" {...formMethods.register("name")} />
          <Input placeholder="Username" {...formMethods.register("username")} />
          <Input placeholder="Email" {...formMethods.register("email")} />
          <Input
            placeholder="Age"
            type="number"
            {...formMethods.register("age", { valueAsNumber: true })}
          />

          <Button type="submit">Next Step {">"}</Button>
        </form>
      </Layout>
    </div>
  );
}

export default FirstStep;
