import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ApiRequestsTests() {
  const router = useNavigate();
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");

      const jsonData = await data.json();

      setData(jsonData);
    }

    fetchData();
  }, []);

  function handleNav(id: number) {
    router(`/requests/${id}`);
  }
  return (
    <div>
      <h1>Api Requests Tests</h1>
      {data
        ? data.map((item: any) => {
            return (
              <div
                onClick={() => handleNav(item.id)}
                data-test="api-data"
                className="border p-2"
                key={item}
              >
                <p data-test="api-title">Title: {item.title}</p>
                <p data-test="api-completed">Completed: {data.completed}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default ApiRequestsTests;
