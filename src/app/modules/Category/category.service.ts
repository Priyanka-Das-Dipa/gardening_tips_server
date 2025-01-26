import { Category } from "./category.modal";

const createCategoryDb = async (payload: { category: string; image: string }) => {
    const result = await Category.create(payload);
    return result;
  };
  const getCategoryDb = async () => {
    const result = await Category.find();
    return result;
  };
  export const categoryService = {
    createCategoryDb,
    getCategoryDb,
  };