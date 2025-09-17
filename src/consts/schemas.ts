import * as z from "zod";

const experienceSchema = z.discriminatedUnion("experienceData", [
  z.object({
    experience: z.literal(true),
    name: z.string().min(2, "Experience name should be at least 2 characters"),
  }),
  // z.object({
  //     experience:z.literal(false),
  // })
]);

export const multistepFormSchema = z.object({
  // first step
  name: z.string().min(2, "Name should be at least 2 characters"),
  username: z.string().min(2, "Username should be at least 2 characters"),
  email: z
    .string()
    .min(5, "Email should be at least 5 characters")
    .email("Invalid email format"),
  age: z.number().min(0, "Age must be a positive number").optional(),

  // second step
  password: z.string().min(6, "Password should be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password should be at least 6 characters"),
});

export const thirdStepSchema = z
  .object({
    //third step
    languages: z.boolean().default(false),
    programmingLanguages: z.boolean().default(false),

    //if languages is true
    languageData: z
      .array(
        z.object({
          name: z.string().min(2),
          level: z.enum(["beginner", "intermediate", "advanced"]),
        })
      )
      .optional(), // present only if languages=true

    //   if programmingLanguages is true
    programmingLanguagesData: z
      .array(
        z.object({
          name: z.string().min(2),
          experience: z.string().min(0).max(10),
        })
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    // If languages = true, require languageData
    if (
      data.languages &&
      (!data.languageData || data.languageData.length === 0)
    ) {
      ctx.addIssue({
        path: ["languageData"],
        code: "custom",
        message: "Please provide at least one language",
      });
    }

    // If programmingLanguages = true, require programmingLanguagesData
    if (
      data.programmingLanguages &&
      (!data.programmingLanguagesData ||
        data.programmingLanguagesData.length === 0)
    ) {
      ctx.addIssue({
        path: ["programmingLanguagesData"],
        code: "custom",
        message: "Please provide at least one programming language",
      });
    }
  });

export const fourthStepSchema = z
  .object({
    // fourth step
    desiredSalary: z.union([z.number()]),
    experience: z.boolean().default(false),
  })
  .and(experienceSchema);
