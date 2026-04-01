import React, { type FormEvent } from "react";

function TodoTests() {
  const [state, setState] = React.useState<boolean>(false);
  const [todoData, setTodoData] = React.useState<
    { value: string; id: number }[]
  >([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todoValue = formData.get("todo") as string;

    setTodoData((prev) => [
      ...prev,
      {
        value: todoValue,
        id: Date.now(),
      },
    ]);

    setState(false);
  }

  function handleDelete(id: number) {
    setTodoData((prev) => prev.filter((todo) => todo.id !== id));
  }
  return (
    <div>
      <button
        data-test="add-todo-list-button"
        className="border bg-green-300 p-2"
        onClick={() => setState(true)}
      >
        Add new todo list
      </button>
      {state && (
        <form action="" onSubmit={handleSubmit} data-test="todo-form">
          <div className="flex flex-col gap-2">
            <label htmlFor="todo">TODO</label>
            <input
              type="text"
              className="border p-2"
              name="todo"
              data-test="todo-input"
            />
            <button
              type="submit"
              className="p-2 border bg-black text-white"
              data-test="submit-todo-button"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {todoData.map((todo) => (
        <>
          <div key={todo.id} data-test="todo-item" className="border p-2">
            {todo.value}
          </div>
          <button
            data-test="delete-todo-button"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </>
      ))}
    </div>
  );
}

export default TodoTests;
