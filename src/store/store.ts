import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type FirstAndSecondStep,
  type ThirdStepType,
  type FourthStepType,
} from "../consts/schemas";

type FormType = {
  formData: {
    firstStep: Pick<FirstAndSecondStep, "name" | "username" | "email" | "age">;
    secondStep: Pick<FirstAndSecondStep, "password" | "confirmPassword">;
    thirdStep: ThirdStepType;
    fourthStep: FourthStepType;
  };
  addFormData: (data: {
    firstStep?: Pick<FirstAndSecondStep, "name" | "username" | "email" | "age">;
    secondStep?: Pick<FirstAndSecondStep, "password" | "confirmPassword">;
    thirdStep?: ThirdStepType;
    fourthStep?: FourthStepType;
  }) => void;
  deleteFormData: () => void;
};

export const useStore = create<FormType>()(
  persist(
    //persist takes 2 parameters ((set,get)=>)
    (set) => ({
      formData: {
        firstStep: { name: "", username: "", email: "", age: 0 },
        secondStep: { password: "", confirmPassword: "" },
        thirdStep: { languages: false, programmingLanguages: false },
        fourthStep: { experience: false, desiredSalary: "" },
      },

      addFormData: (data) => {
        console.log("State", data);
        return set((state) => ({ formData: { ...state.formData, ...data } }));
      },
      deleteFormData: () =>
        set(() => ({
          formData: {
            firstStep: { name: "", username: "", email: "", age: 0 },
            secondStep: { password: "", confirmPassword: "" },
            thirdStep: { languages: false, programmingLanguages: false },
            fourthStep: { experience: false, desiredSalary: "" },
          },
        })),
    }),
    {
      name: "multi-step-form-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
