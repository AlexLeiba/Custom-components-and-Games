import { useEffect, useState } from "react";

export function TreeData() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoriesType[]>([]);
  console.log("🚀 ~ DATA->>>\n\n", selectedIds);

  type CategoriesType = {
    id: number;
    name: string;
    parentCategory: {
      id: number;
    };
    hasChildren: boolean;
    childrenCategories: CategoriesType[];
  };

  async function getAllSubcategories(rootCat: CategoriesType[]) {
    const allNestedCategories = await Promise.all(
      rootCat.map((cat) => {
        return fetchSubcategories(cat);
      })
    );

    setCategoriesData(allNestedCategories);
  }

  useEffect(() => {
    getAllSubcategories(çategoriesRoot);
  }, []);

  // api call
  async function getCategoryById(id: number) {
    return categories.find((category) => category.id === id);
  }

  async function fetchSubcategories(
    catData: CategoriesType
  ): Promise<CategoriesType> {
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
        return {
          ...catData,
          childrenCategories: childrenCategory.childrenCategories,
        };
      }

      // if api response has children
      const nestedChildren = await Promise.all(
        childrenCategory.childrenCategories.map((child) =>
          fetchSubcategories(child)
        )
      );

      return {
        ...catData,
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

  // TO find clicked element :return it, use other fn to map through all its children and collect its ids in desc order
  // TO STORE ALL ITS CILDREN IDS
  // TO RETURN THEM
  function handleClickCategory(
    categoriesParam: CategoriesType[],
    categoryId: number
  ) {
    console.log("🚀 ~ handleClickCategory ~ categoryId:", categoriesParam);
    const ids: number[] = [];

    const foundNode = findSelectedNode(categoriesParam, categoryId);

    if (!foundNode) {
      return;
    }

    const collectedSubIds = collectSelectedCategoryIds(foundNode);
    const deselectSubIds = collectSelectedCategoryIds(foundNode);
    // ALL IDS SELECTED IN DESCENDENT ORDER STARTNG FROM THE SELECTED ONE
    // if found selected node: THEN map and collect ids recursively

    setSelectedIds((prev) => {
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
    categoriesParam: CategoriesType[],
    categoryId: number
  ): CategoriesType | null {
    for (const catObj of categoriesParam) {
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
    const ids: number[] = []; //[91,93]

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

  function renderCategories(categoriesData: CategoriesType[]) {
    return (
      <div>
        {categoriesData.map((cat) => {
          return (
            <div key={cat.id} className="flex flex-col gap-2">
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

function selectSubcategoriesIds() {
  // AFTER i have all my categories parsed.
  // based on the ID passed as parameter.
  // select all recursively
  //OR deselect all recursively: removing or adding to IDS array
}

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
        childrenCategories: [],
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
        childrenCategories: [],
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
