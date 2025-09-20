import { useStore } from "../../store/store";
import React from "react";

export function SubmittedData() {
  const {
    formData: { fourthStep, firstStep, thirdStep },
  } = useStore();

  return (
    <div>
      <p className="text-2xl">Submitted Data</p>

      <p>
        <b>First Step: </b> {JSON.stringify(firstStep)}
      </p>
      <p>
        <b> Second Step:</b> "password":"******","confirmPassword":"******"
      </p>
      <p>
        <b> Third Step:</b> {JSON.stringify(thirdStep)}
      </p>
      <p>
        <b> Fourth Step:</b> {JSON.stringify(fourthStep)}
      </p>
    </div>
  );
}
