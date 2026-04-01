import React, { useEffect } from "react";

function ApiRequestSinglePage() {
  const [data, setData] = React.useState<any>(null);
  useEffect(() => {
    const urlParams = window.location.pathname.split("/").at(-1);

    async function fetchData() {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${urlParams}`,
      );

      const jsonData = await data.json();
      setData(jsonData);
    }

    fetchData();
  }, []);
  return (
    <div>
      <h1>Api Request Single Page</h1>
      {data ? (
        <div data-test="api-data" className="border p-2">
          <p data-test="api-title">Title: {data.title}</p>
          <p data-test="api-completed">Completed: {data.completed}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ApiRequestSinglePage;
