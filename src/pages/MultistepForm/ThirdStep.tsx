import { Layout } from "../../components/MultistepForm/Layout";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { thirdStepSchema } from "../../consts/schemas";
import type z from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";

const LANGUAGE_LEVEL = ["beginner", "intermediate", "advanced"] as const;
const EXPERIENCE = [
  "1 Year",
  "2 Years",
  "3 Years",
  "4 Years",
  "5 Years",
  "6 Years",
  "7 Years",
  "8 Years",
  "9 Years",
  "10 Years",
] as const;

function ThirdStep() {
  // const router = useNavigate();
  const formMethods = useForm({
    resolver: zodResolver(thirdStepSchema),
    defaultValues: {
      languages: false,
      programmingLanguages: false,
    },
    shouldUnregister: true, // <-- important
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,

    control,
  } = formMethods;
  console.log("🚀 ~ ThirdStep ~ watch:", watch("languageData"));
  console.log("🚀 ~ ThirdStep ~ watch:", watch("programmingLanguagesData"));

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
    console.log("data=>>>>>>>>>>>>>", data);
    // router("/multistep-form-4");
    //Pick<FormDataType);
  }

  //   useEffect(() => {
  //     if (!isLanguagesChecked) {
  //       reset({
  //         languages: false,
  //
  //         languageData: [],
  //       });
  //     }
  //
  //     if (!isProgrammingLanguagesChecked) {
  //       reset({
  //         programmingLanguages: false,
  //         programmingLanguagesData: [],
  //       });
  //     }
  //   }, [isLanguagesChecked, isProgrammingLanguagesChecked]);
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
              {fields.length === 0 && (
                <div className="border p-2 rounded-md">
                  <p>Languages</p>
                  <Input
                    placeholder="Language Name"
                    {...formMethods.register("languageData.0.name")}
                  />

                  <Controller
                    control={control}
                    name="languageData.0.level"
                    render={({ field }) => {
                      return (
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            {/* <Button>Select Level</Button> */}
                            <p>Select Level</p>
                          </SelectTrigger>

                          <SelectContent>
                            {LANGUAGE_LEVEL.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </div>
              )}

              {fields.map((data, index) => (
                <div key={data.id}>
                  <div className="border p-2 rounded-md flex flex-col gap-2">
                    <p>Languages</p>
                    <Input
                      placeholder="Language Name"
                      {...formMethods.register(`languageData.${index}.name`)}
                    />
                    <Controller
                      control={control}
                      name={`languageData.${index}.level`}
                      render={({ field }) => {
                        return (
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              {/* <Button>Select Level</Button> */}
                              <p>Select Level</p>
                            </SelectTrigger>

                            <SelectContent>
                              {LANGUAGE_LEVEL.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      }}
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
              ))}
              <Button
                className="w-40"
                onClick={() => append({ name: "", level: "advanced" })}
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

                  <Controller
                    control={control}
                    name="programmingLanguagesData.0.experience"
                    render={({ field }) => {
                      return (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            {/* <Button>Select Level</Button> */}
                            <p>Select Level</p>
                          </SelectTrigger>

                          <SelectContent>
                            {EXPERIENCE.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </div>
              ) : (
                programmingLanguagesFields.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="border p-2 rounded-md flex flex-col gap-2"
                    >
                      <p>Programming Languages</p>
                      <Input
                        placeholder="Programming Language Name"
                        {...formMethods.register(
                          `programmingLanguagesData.${index}.name`
                        )}
                      />

                      <Controller
                        control={control}
                        name={`programmingLanguagesData.${index}.experience`}
                        render={({ field }) => {
                          return (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger>
                                {/* <Button>Select Level</Button> */}
                                <p>Select Level</p>
                              </SelectTrigger>

                              <SelectContent>
                                {EXPERIENCE.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );
                        }}
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
                    experience: "advanced",
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
