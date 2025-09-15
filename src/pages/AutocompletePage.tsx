import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContext } from "../context/ToastProvider";
import { AutocompleteInput } from "../components/AutocompleteInput";
import { Loader } from "lucide-react";

function AutocompletePage() {
  const { triggerToast } = useContext(ToastContext);

  const DummyEndpoint = "https://dummyjson.com/products/search";

  const [loading, setLoading] = useState(false);

  async function fetchSuggstions(query: string) {
    setLoading(true);
    if (!query) return [];
    try {
      const response = await fetch(DummyEndpoint + `?q=${query}`);

      const data = await response.json();

      return data.products;
    } catch (error: any) {
      triggerToast({
        type: "error",
        message: error.message,
        duration: 2000,
      });

      return [];
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <AutocompleteInput
        fetchSuggstions={fetchSuggstions}
        dataKey="title"
        loading={loading ? <Loader className="animate-spin" /> : null}
      />
    </div>
  );
}

export default AutocompletePage;
