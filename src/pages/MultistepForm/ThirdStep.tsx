import { Layout } from "../../components/MultistepForm/Layout";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { thirdStepSchema } from "../../consts/schemas";
import type z from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";

function ThirdStep() {
  const {
    addFormData,
    formData: { thirdStep },
  } = useStore();

  const router = useNavigate();
  const formMethods = useForm({
    resolver: zodResolver(thirdStepSchema),
    defaultValues: {
      languages: thirdStep.languages,
      programmingLanguages: thirdStep.programmingLanguages,
      languageData: thirdStep.languageData,
      programmingLanguagesData: thirdStep.programmingLanguagesData,
    },
    shouldUnregister: true, // <-- important
  });

  const {
    handleSubmit,
    formState: { errors },

    control,
  } = formMethods;

  type FormDataType = z.infer<typeof thirdStepSchema>;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languageData",
  });

  const {
    fields: programmingLanguagesFields,
    append: programmingLanguagesAppend,
    remove: programmingLanguagesRemove,
  } = useFieldArray({
    control,
    name: "programmingLanguagesData",
  });

  const isLanguagesChecked = useWatch({ control, name: "languages" });

  const isProgrammingLanguagesChecked = useWatch({
    control,
    name: "programmingLanguages",
  });

  function onSubmit(data: FormDataType) {
    addFormData({ thirdStep: data });
    router("/multistep-form-4");
  }

  return (
    <div>
      {" "}
      <Layout step={3}>
        {errors && errors?.languageData && (
          <p className="text-red-500">Languages fields are required </p>
        )}
        {errors && errors?.programmingLanguagesData && (
          <p className="text-red-500">
            Programming languages fields are required{" "}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex gap-2 items-center">
            <p>Known Languages</p>
            <Controller
              control={control}
              name="languages"
              render={({ field }) => {
                return (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    Languages
                  </Checkbox>
                );
              }}
            />
          </div>

          <div className="flex gap-2 items-center">
            <p>Known Programming Languages</p>
            <Controller
              control={control}
              name="programmingLanguages"
              render={({ field }) => {
                return (
                  <Checkbox
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  >
                    Programming Languages
                  </Checkbox>
                );
              }}
            />
          </div>

          {isLanguagesChecked && (
            //first element of an array of known languages

            <>
              {fields.length === 0 ? (
                <>
                  <div className="border p-2 rounded-md">
                    <p>Languages</p>
                    <Input
                      placeholder="Language Name"
                      {...formMethods.register(`languageData.${0}.name`)}
                    />
                    <Input
                      placeholder="Language Level"
                      {...formMethods.register(`languageData.${0}.level`)}
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
                          <p>Languages</p>
                          <Input
                            placeholder="Language Name"
                            {...formMethods.register(
                              `languageData.${index}.name`
                            )}
                          />
                          <Input
                            placeholder="Language Level"
                            {...formMethods.register(
                              `languageData.${index}.level`
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
                onClick={() => append({ name: "", level: "" })} //will add a new field array (In which we already have one element set When there weren't any elements in the fields)
              >
                Add language +
              </Button>
            </>
          )}

          {isProgrammingLanguagesChecked && (
            <>
              {programmingLanguagesFields.length === 0 ? (
                <div className="border p-2 rounded-md flex flex-col gap-2">
                  <p>Programming Languages</p>
                  <Input
                    placeholder="Programming Language Name"
                    {...formMethods.register("programmingLanguagesData.0.name")}
                  />
                  <Input
                    placeholder="Experience in Years"
                    {...formMethods.register(
                      "programmingLanguagesData.0.experience"
                    )}
                  />
                </div>
              ) : (
                programmingLanguagesFields.map((data, index) => {
                  return (
                    <div
                      key={data.id}
                      className="border p-2 rounded-md flex flex-col gap-2"
                    >
                      <p>Programming Languages</p>
                      <Input
                        placeholder="Programming Language Name"
                        {...formMethods.register(
                          `programmingLanguagesData.${index}.name`
                        )}
                      />
                      <Input
                        placeholder="Experience in Years"
                        {...formMethods.register(
                          `programmingLanguagesData.${index}.experience`
                        )}
                      />

                      <Button
                        className="w-20"
                        variant={"destructive"}
                        onClick={() => programmingLanguagesRemove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })
              )}
              <Button
                className="w-80"
                onClick={() =>
                  programmingLanguagesAppend({
                    name: "",
                    experience: "",
                  })
                }
              >
                Add Programming Language +
              </Button>
            </>
          )}

          {/* To add a new array and then add values to it */}

          <Button type="submit">Next Step {">"}</Button>
        </form>
      </Layout>
    </div>
  );
}

export default ThirdStep;
