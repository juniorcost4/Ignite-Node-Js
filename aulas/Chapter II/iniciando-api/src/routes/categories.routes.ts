import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRouters = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({ name, description });

    response.status(201).send();
});

categoriesRouters.get("/", (request, response) => {
    return response.json(categoriesRepository.list());
});

export { categoriesRouters };