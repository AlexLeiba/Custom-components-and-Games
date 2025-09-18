import * as z from "zod";

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

const languagesUnionSchema = z.discriminatedUnion("languages", [
  z.object({
    languages: z.literal(true), //if has is checked and has true value then: otherLanguages will be required
    languageData: z.array(
      z.object({
        name: z.string().min(2),
        level: z.string().min(1),
      })
    ), // when literal is true this field is required / else is optional
  }),
  z.object({
    languages: z.literal(false),
    languageData: z
      .array(
        z.object({ name: z.string().optional(), level: z.string().optional() })
      )
      .optional(),
  }),
]);
const programmingLanguagesUnionSchema = z.discriminatedUnion(
  "programmingLanguages",
  [
    z.object({
      programmingLanguages: z.literal(true), //if has is checked and has true value then: otherLanguages will be required
      programmingLanguagesData: z.array(
        z.object({
          name: z.string().min(2),
          experience: z.string().min(1),
        })
      ), // when literal is true this field is required / else is optional
    }),
    z.object({
      programmingLanguages: z.literal(false),
      programmingLanguagesData: z
        .array(
          z.object({
            name: z.string().optional(),
            experience: z.string().optional(),
          })
        )
        .optional(),
    }),
  ]
);

export const thirdStepSchema = z
  .object({
    //third step
    languages: z.boolean(),
    programmingLanguages: z.boolean(),
  })
  .and(languagesUnionSchema)
  .and(programmingLanguagesUnionSchema);

//
const experienceSchema = z.discriminatedUnion("experience", [
  z.object({
    experience: z.literal(true),
    orgName: z.array(
      z.object({ orgName: z.string().min(2), orgExperience: z.string().min(1) })
    ),
  }),
  z.object({
    experience: z.literal(false),
    orgName: z
      .array(
        z.object({
          orgName: z.string().min(2),
          orgExperience: z.string().min(1),
        })
      )
      .optional(),
  }),
]);

export const fourthStepSchema = z
  .object({
    // fourth step
    desiredSalary: z.string().min(1, "Salary must be a positive number"),
    experience: z.boolean(),
  })
  .and(experienceSchema);
