import axios from "axios";
import {
  Category,
  CategoryApiResponse,
  SpendingData,
  SpendingOptions,
  SpendingResponse,
  Type,
} from "../types";
import { dropdownScopes } from "../Components/Layers";

const recursiveFetch = async (
  spendingOptions: SpendingOptions,
  rootType: "budget_function" | "agency" | "object_class"
): Promise<SpendingData> => {
  const categories: Category[] = [];
  const { data } = await axios.post<SpendingResponse>(
    "https://api.usaspending.gov/api/v2/spending/",
    spendingOptions
  );
  // add up all items' amount
  categories.push(
    ...data.results.map((item: CategoryApiResponse) => {
      const nextType =
        item.type === "award"
          ? null
          : dropdownScopes[rootType][
              dropdownScopes[rootType].indexOf(item.type) + 1
            ];
      return {
        label: item.name,
        value: (item.amount / data.total) * 100.0,
        id: item.id,
        dollarValue: item.amount,
        type: item.type,
        updateCurrentCategories: () => {
          if (nextType === null) {
            return null;
          }
          const options: SpendingOptions = {
              ...spendingOptions,
              filters: {
                ...spendingOptions.filters,
                [item.type]: item.id,
              },
              type: nextType as Type,
          };
          return recursiveFetch(options, rootType);
        },
      };
    })
  );

  return {
    categories,
    total: data.total,
    parent: null,
    parentValue: null
  };
};
export default recursiveFetch;
