import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

// GOAL:
// 1:RENDER ALL CATEGORIES AND SUBCATEGORIES
// 2:SELECT A CATEGORY, AND AUTO SELECTION OF ALL SUBCATEGORIES
//3:IF SUBCATEGORIES WERE SELECTED, DESELECT THEM
//4:ADD SUBCATEGORY UNDER SELECTED PARENT CAT
//5:DELETE CATEGORY AND ALL ITS SUBCATEGORIES

type CategoriesType = {
  id: number;
  name: string;
  parentCategory: {
    id: number;
  };
  hasChildren: boolean;
  childrenCategories: CategoriesType[];
};

export function TreeData() {
  const [categoriesData, setCategoriesData] = useState<CategoriesType[]>([]); //proof of state

  const [selectedIds, setSelectedIds] = useState<number[]>([]); //ids oc interated cats

  const [categoryValue, setCategoryValue] = useState<string>(""); //?

  const [addNewSubcategory, setAddNewSubcategory] = useState<number>(0); //?

  // console.log("🚀 TREE DATA->>:\n\n\n", categoriesData);
  // console.log("🚀 ~ IDS->>>\n\n", selectedIds);

  async function getAllSubcategories(rootCat: CategoriesType[]) {
    const allNestedCategories = await Promise.all(
      rootCat.map((cat) => {
        return fetchSubcategories(cat); //will do api calls , needs to be async, to await for the response before to return.
      }),
    );

    setCategoriesData(allNestedCategories);
  }

  async function fetchSubcategories(
    catData: CategoriesType,
  ): Promise<CategoriesType> {
    // if no children: return current obj
    if (!catData.hasChildren) {
      return {
        ...catData,
      };
    }

    try {
      //if has children THEN api call
      const childrenCategory = await getCategoryById(catData.id);

      if (!childrenCategory) {
        // return current obj, if the api request resolved in null
        return {
          ...catData,
        };
      }

      if (!childrenCategory.hasChildren) {
        //checkd from the response if it has any other children
        return {
          ...catData,
          childrenCategories: childrenCategory.childrenCategories,
        };
      }

      // we have more children of children, we need to fetch them as well
      // if api response has children
      //ROOT catData is 96
      const nestedChildren = await Promise.all(
        childrenCategory.childrenCategories.map((child) =>
          fetchSubcategories(child),
        ),
      );

      return {
        ...catData, //nested cat data will be copied at each iteration
        childrenCategories: nestedChildren,
      };
    } catch (error) {
      console.log("Error", error);
      return {
        ...catData,
      };
    }

    //   MEANS WE HAVE CHILDREN
    // MAKE REQ FOR NEW CHILD
  }

  useEffect(() => {
    // ACTS AS AN API FETCH OF ROOT CATS
    getAllSubcategories(çategoriesRoot);
  }, []);

  // api call
  async function getCategoryById(id: number) {
    return categories.find((category) => category.id === id);
  }

  // TO find clicked element :return it, use other fn to map through all its children and collect its ids in desc order
  // TO STORE ALL ITS CILDREN IDS
  // TO RETURN THEM
  function handleClickCategory(
    categoriesData: CategoriesType[],
    categoryId: number,
  ) {
    // const ids: number[] = [];

    const foundNode = findSelectedNode(categoriesData, categoryId);

    if (!foundNode) {
      return;
    }

    const collectedSubIds = collectSelectedCategoryIds(foundNode);
    const deselectSubIds = collectSelectedCategoryIds(foundNode);
    // ALL IDS SELECTED IN DESCENDENT ORDER STARTNG FROM THE SELECTED ONE
    // if found selected node: THEN map and collect ids recursively

    setSelectedIds((prev) => {
      // if no ids were selected, just select all collected
      if (prev.length === 0) {
        return [...collectedSubIds];
      }

      const IdsAlreadyExists = prev.some((id) => collectedSubIds.includes(id));

      if (IdsAlreadyExists) {
        return prev.filter((ids) => !deselectSubIds.includes(ids));
      } else {
        return [...prev, ...collectedSubIds];
      }
    });
  }

  function findSelectedNode(
    categoriesData: CategoriesType[],
    categoryId: number,
  ): CategoriesType | null {
    for (const catObj of categoriesData) {
      if (catObj.id === categoryId) {
        return catObj;
      }

      if (catObj.hasChildren) {
        const found = findSelectedNode(catObj.childrenCategories, categoryId);
        if (found) return found;
      }
    }

    return null;
  }

  // collect all ids
  function collectSelectedCategoryIds(selectedNode: CategoriesType) {
    const ids: number[] = [1]; //[91,93]

    ids.push(selectedNode.id); //push first  parent ID

    // if has no more children
    if (selectedNode.childrenCategories.length === 0) {
      return ids;
    }
    // map through each children
    selectedNode.childrenCategories.forEach((cat) => {
      // ids.push(cat.id);
      ids.push(...collectSelectedCategoryIds(cat));
    });

    return ids;
  }

  function handleAddNewCat(selectedParentNode: CategoriesType) {
    console.log("added new cat", categoryValue);
    const newCategoryData = {
      id: Date.now(),
      name: categoryValue,
      parentCategory: { id: selectedParentNode.id },
      hasChildren: false,
      childrenCategories: [],
    };

    const embeddedNewCategory = embedNewSubcategories(
      newCategoryData,
      selectedParentNode,
      categoriesData,
    );
    console.log(
      "🚀 ~ handleAddNewCat ~ embeddedNewCategory:\n\n\n",
      embeddedNewCategory,
    );

    setCategoriesData(embeddedNewCategory); //add new updated cats with new one in Proof of data

    // MAP throu all current cat data
    // WHEN selectedNode === categoryData ID
    // copy all current data, inject new cat under children
    // RETURN parsed value to setCategoriesData
    //  setCategoriesData(())
  }

  function embedNewSubcategories(
    newCategoryData: CategoriesType,
    selectedParentNode: CategoriesType,
    categoriesData: CategoriesType[],
  ) {
    const result = categoriesData.map((cat): CategoriesType => {
      if (cat.id === selectedParentNode.id) {
        // found the parent
        console.log("FOund", cat);
        return {
          ...cat,
          hasChildren: true, //specify that this parent cat alredy has children (in case it hasnt before)
          childrenCategories: [...cat.childrenCategories, newCategoryData], //apply at the end oc children the new one
        };
      }
      if (cat.hasChildren) {
        // recursive into children
        return {
          ...cat,
          childrenCategories: embedNewSubcategories(
            newCategoryData,
            selectedParentNode,
            cat.childrenCategories, //call recursively, this type categories comes from children
          ),
        };
      }

      // unchanged node
      return cat;
    });

    return result;
  }

  function renderCategories(categoriesData: CategoriesType[]) {
    return (
      <div className="ml-2">
        {categoriesData.map((cat) => {
          return (
            <div key={cat.id} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div
                  className="flex gap-2"
                  onClick={() => handleClickCategory(categoriesData, cat.id)}
                >
                  <p className="font-bold">{cat.name}</p>
                  <p>ID: {cat.id}</p>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    checked={selectedIds.includes(cat.id)}
                  />
                </div>
                {addNewSubcategory === cat.id ? (
                  <>
                    <X onClick={() => setAddNewSubcategory(0)} />
                    <input
                      className="border-2 p-1"
                      type="text"
                      value={categoryValue}
                      onChange={(e) => setCategoryValue(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        handleAddNewCat(cat);
                        setAddNewSubcategory(0);
                      }}
                    >
                      ADD
                    </button>
                  </>
                ) : (
                  <Plus onClick={() => setAddNewSubcategory(cat.id)} />
                )}
              </div>
              {/* render children */}
              <div className="ml-8">
                {renderCategories(cat.childrenCategories)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div>{renderCategories(categoriesData)}</div>;
}

// function selectSubcategoriesIds() {
// }
// AFTER i have all my categories parsed.
// based on the ID passed as parameter.
// select all recursively
//OR deselect all recursively: removing or adding to IDS array

// hardcoded database

// TREE CAT
const çategoriesRoot = [
  {
    id: 91,
    name: "ROOT1",
    parentCategory: { id: 91 },
    hasChildren: true,
    childrenCategories: [],
  },
  {
    id: 95,
    name: "ROOT2",
    parentCategory: { id: 95 },
    hasChildren: false,
    childrenCategories: [],
  },
  {
    id: 96,
    name: "ROOT3",
    parentCategory: { id: 96 },
    hasChildren: true,
    childrenCategories: [],
  },
];

// DATA FROM API
const categories = [
  {
    id: 91,
    name: "ROOT1",
    parentCategory: { id: 91 },
    hasChildren: true,
    childrenCategories: [
      {
        id: 92,
        name: "Nested1-ROOT1",
        parentCategory: { id: 91 },
        hasChildren: true,
        childrenCategories: [
          {
            id: 93,
            name: "Nested1-ROOT1-nested",
            parentCategory: { id: 92 },
            hasChildren: false,
            childrenCategories: [],
          },
        ],
      },
      {
        id: 94,
        name: "Nested2-ROOT1",
        parentCategory: { id: 91 },
        hasChildren: false,
        childrenCategories: [],
      },
    ],
  },
  {
    id: 92,
    name: "Nested1-ROOT1",
    parentCategory: { id: 91 },
    hasChildren: true,
    childrenCategories: [
      {
        id: 93,
        name: "Nested1-ROOT1-nested",
        parentCategory: { id: 92 },
        hasChildren: false,
        childrenCategories: [],
      },
    ],
  },
  {
    id: 94,
    name: "Nested2-ROOT1",
    parentCategory: { id: 91 },
    hasChildren: false,
    childrenCategories: [],
  },
  //   /////////////
  {
    id: 95,
    name: "ROOT2",
    parentCategory: { id: 1 },
    hasChildren: false,
    childrenCategories: [],
  },
  // ///////////////
  {
    id: 96,
    name: "ROOT3",
    parentCategory: { id: 1 },
    hasChildren: true,
    childrenCategories: [
      {
        id: 97,
        name: "nested1-ROOT3",
        parentCategory: { id: 96 },
        hasChildren: true,
        childrenCategories: [
          {
            id: 98,
            name: "nested1-ROOT3-nested",
            parentCategory: { id: 95 },
            hasChildren: false,
            childrenCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 97,
    name: "nested1-ROOT3",
    parentCategory: { id: 95 },
    hasChildren: false,
    childrenCategories: [
      {
        id: 98,
        name: "nested1-ROOT3-nested",
        parentCategory: { id: 95 },
        hasChildren: false,
        childrenCategories: [],
      },
    ],
  },
  {
    id: 98,
    name: "nested1-ROOT3-nested",
    parentCategory: { id: 95 },
    hasChildren: false,
    childrenCategories: [],
  },
];
