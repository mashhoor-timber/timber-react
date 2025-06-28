import { useFormContext } from "react-hook-form";

import SelectCategory from "./SelectCategory";

type Props = {
  addCategoryModal: any;
};

function ChooseCategory({ addCategoryModal }: Props) {
  const handleAddCategory = () => {
    addCategoryModal.onOpen();
  };

  const { setValue, getValues } = useFormContext();
  const handleCategoryChange = (
    item: { key: string; value: string; label: string } | undefined
  ) => {
    if (!item) return;

    setValue("category", item.value);
  };

  return (
    <SelectCategory
      buttonOnClick={() => handleAddCategory()}
      buttonText="Add Category"
      label=""
      name="category"
      placeholder="Select category"
      queryKey="getCategories"
      selectedKey={getValues("category")}
      onSelChange={(value: any) => handleCategoryChange(value)}
    />
  );
}

export default ChooseCategory;
