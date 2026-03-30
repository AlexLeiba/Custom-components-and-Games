import React, { useState } from "react";

function CypressTests() {
  const [form, setForm] = useState({ text: "", number: "" });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("text"));
    console.log(formData.get("number"));
    setForm({
      text: formData.get("text") as string,
      number: formData.get("number") as string,
    });
  }
  return (
    <div>
      <h1 data-test="heading">Hello cypress</h1>

      <p data-test="paragraph">this is a paragraph</p>

      <form
        data-test="form"
        action=""
        className="border p-2 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="text" data-test="label">
            Text:
          </label>
          <input
            data-test="input-text"
            type="text"
            className="borde p-2 bg-yellow-100"
            id="text"
            name="text"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="number" data-test="label">
            Number:
          </label>
          <input
            data-test="input-number"
            type="number"
            className="borde p-2 bg-yellow-100"
            id="number"
            name="number"
          />
        </div>

        <button data-test="button-submit" className="border p-2 bg-gray-400">
          Submit
        </button>
      </form>
      {form.text && form.number && (
        <>
          <p data-test="display-text">Text: {form.text}</p>
          <p data-test="display-number">Number: {form.number}</p>
        </>
      )}
    </div>
  );
}

export default CypressTests;
