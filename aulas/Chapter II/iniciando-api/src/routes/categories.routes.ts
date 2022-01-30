import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRouters = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRouters.get("/", (request, response) => {
    return response.json(categoriesRepository.list());
});

export { categoriesRouters };