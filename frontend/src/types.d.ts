export const Type = "budget_function" | "agency" | "object_class";

/**
 * Represents a category.
 */
export type Category = {
  /**
   * The category's label for display.
   */
  label: string
  /**
   * The category's value as a percentage decimal between 0 and 100.
   */
  value: number
  /**
   * The category's internal id.
   */
  id: string
  /**
   * The category's value in a dollar amount.
   */
  dollarValue: number
  /**
   * The category's type
   */
  type: Type

  /**
   * Request children categories when this category is clicked.
   */
  updateCurrentCategories: () => Category[]
}

/**
 * Represents spending options with specific filters.
 */
export type SpendingOptions = {
  type: Type
  filters: {
    /**
     * Fiscal year as a numerical string (e.g., "2023").
     */
    fy: string
    /**
     * Period as a number from 0 through 11.
     */
    period: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11"
  }
}