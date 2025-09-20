import { Layout } from "../../components/MultistepForm/Layout";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fourthStepSchema } from "../../consts/schemas";
import type z from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { useStore } from "../../store/store";
import { useContext, useState } from "react";
import { ToastContext } from "../../context/ToastProvider";
import { SubmittedData } from "./SubmittedData";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FourthStep() {
  const navigate = useNavigate();
  const [submittedData, setSubmittedData] = useState(false);
  const { triggerToast } = useContext(ToastContext);
  const {
    addFormData,
    deleteFormData,
    formData: { fourthStep },
  } = useStore();
  const formMethods = useForm({
    resolver: zodResolver(fourthStepSchema),
    defaultValues: {
      desiredSalary: fourthStep?.desiredSalary || "",
      experience: fourthStep?.experience || false,
      orgName: fourthStep?.orgName || [],
    },
    shouldUnregister: true, // <-- important
  });

  const {
    handleSubmit,
    formState: { errors },

    control,
  } = formMethods;

  type FormDataType = z.infer<typeof fourthStepSchema>;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orgName",
  });

  const isExperienceChecked = useWatch({ control, name: "experience" });

  function onSubmit(data: FormDataType) {
    addFormData({ fourthStep: data });

    triggerToast({
      message: "Form submitted successfully",
      type: "success",
    });
    setSubmittedData(true);
  }

  function closeAndDeleteSubmittedData() {
    setSubmittedData(false);
    deleteFormData();
    navigate("/multistep-form-1");
  }
  return (
    <div>
      {" "}
      <Layout step={4}>
        {errors && errors?.orgName && (
          <p className="text-red-500">
            Experience details fields are required{" "}
          </p>
        )}

        {errors && errors?.desiredSalary && (
          <p className="text-red-500">Desired salary field is required </p>
        )}
        {submittedData && (
          <>
            <X
              onClick={closeAndDeleteSubmittedData}
              className="cursor-pointer"
            />
            <SubmittedData />
          </>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex gap-2 items-center">
            <p>Have Experience?</p>
            <Controller
              control={control}
              name="experience"
              render={({ field }) => {
                return (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                );
              }}
            />
          </div>

          <div className="flex gap-2 items-start flex-col">
            <p>Desired Salary</p>
            <Controller
              control={control}
              name="desiredSalary"
              render={({ field }) => {
                return (
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col"
                    value={field.value.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1000" id="1000" />
                      <label htmlFor="1000">1000</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2000" id="2000" />
                      <label htmlFor="2000">2000</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4000" id="4000" />
                      <label htmlFor="4000">4000</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8000" id="8000" />
                      <label htmlFor="8000">8000</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10000" id="10000" />
                      <label htmlFor="10000">10000</label>
                    </div>
                  </RadioGroup>
                );
              }}
            />
          </div>

          {isExperienceChecked && (
            //first element of an array of known languages

            <>
              {fields.length === 0 ? (
                <>
                  <div className="border p-2 rounded-md">
                    <p>Your experience</p>
                    <Input
                      placeholder="Company Name"
                      {...formMethods.register(`orgName.${0}.orgName`)}
                    />
                    <Input
                      placeholder="Experience in years"
                      {...formMethods.register(`orgName.${0}.orgExperience`)}
                    />
                  </div>
                </>
              ) : (
                <>
                  {fields.map((data, index) => {
                    console.log("first", index);
                    return (
                      <div key={data.id}>
                        <div className="border p-2 rounded-md flex flex-col gap-2">
                          <p>Your experience</p>
                          <Input
                            placeholder="Company Name"
                            {...formMethods.register(
                              `orgName.${index}.orgName`
                            )}
                          />
                          <Input
                            placeholder="Experience in years"
                            {...formMethods.register(
                              `orgName.${index}.orgExperience`
                            )}
                          />
                          <Button
                            className="w-20"
                            variant={"destructive"}
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {/* ADD+ another language */}
              <Button
                className="w-40"
                onClick={() => append({ orgName: "", orgExperience: "" })} //will add a new field array (In which we already have one element set When there weren't any elements in the fields)
              >
                Add experience +
              </Button>
            </>
          )}

          {/* To add a new array and then add values to it */}

          <Button type="submit">Submit application</Button>
        </form>
      </Layout>
    </div>
  );
}

export default FourthStep;
