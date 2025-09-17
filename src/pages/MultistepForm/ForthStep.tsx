import React from "react";
import { Layout } from "../../components/MultistepForm/Layout";
import { fourthStepSchema } from "../../consts/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function ForthStep() {
  const formMethods = useForm({
    resolver: zodResolver(fourthStepSchema),
    defaultValues: {
      desiredSalary: 0,
      experience: true,
    },
  });
  return (
    <div>
      {" "}
      <Layout step={4}></Layout>
    </div>
  );
}

export default ForthStep;
