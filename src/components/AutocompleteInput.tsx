import { Loader, X } from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "../../lib/utility";

// TO USE THIS COMPONENT PASS THE COMMENT CODE TO THE COMPONENT WHERE YOU WANT TO USE IT
//   const { triggerToast } = useContext(ToastContext);

//   const DummyEndpoint = "https://dummyjson.com/products/search";
//
//   const [loading, setLoading] = useState(false);
//
//   async function fetchSuggstions(query: string) {
//     setLoading(true);
//     if (!query) return [];
//     try {
//       const response = await fetch(DummyEndpoint + `?q=${query}`);
//
//       const data = await response.json();
//
//       return data.products;
//     } catch (error: any) {
//       triggerToast({
//         type: "error",
//         message: error.message,
//         duration: 2000,
//       });
//
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   }

type FetchedData = { title: string; id: number }[];
type Props = {
  fetchSuggstions: (query: string) => Promise<FetchedData>;
  dataKey: "title";
  loading: React.ReactNode;
};
export function AutocompleteInput({
  fetchSuggstions,
  dataKey,
  loading,
}: Props) {
  const [value, setValue] = React.useState("");
  const [select, setSelect] = React.useState("");
  const [searchedData, setSearchedData] = React.useState<FetchedData>([]);

  useEffect(() => {
    function searchData() {
      if (value) {
        const timerId = setTimeout(async () => {
          const response = await fetchSuggstions(value);
          setSearchedData(response);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    }
    searchData();
  }, [value]);

  function handleSelect(value: string) {
    setSelect(value);
    setValue("");
  }

  async function handleClearInput() {
    setValue("");
    setSelect("");
    setSearchedData([]);
  }

  return (
    <div>
      <h1 className="text-2xl">Autocomplete</h1>

      <div className="flex relative">
        <input
          value={value || select}
          type="text"
          className="w-full p-2 border pr-10"
          onChange={(e) => setValue(e.target.value)}
        />
        <X
          onClick={handleClearInput}
          className=" cursor-pointer absolute right-2 top-2"
        />
      </div>
      <div className="w-full items-center justify-center">
        {loading && <Loader className="animate-spin" />}
      </div>
      {/* suggestions */}
      {searchedData.length > 0 && (
        <div className="flex flex-col gap-4 border max-h-32 overflow-y-scroll">
          {searchedData.map((item) => {
            console.log(
              "first",
              item[dataKey].split(new RegExp(`(${value.toLowerCase()})`, "gi"))
            );

            const highlightedText = item[dataKey].split(
              new RegExp(`(${value.toLowerCase()})`, "gi")
            );
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item[dataKey])}
                className="cursor-pointer bg-gray-200 p-2"
              >
                <p>
                  {highlightedText.map((text) => (
                    <span
                      className={cn(
                        text.toLowerCase() === value.toLowerCase() &&
                          "font-bold"
                      )}
                    >
                      {text}
                    </span>
                  ))}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
