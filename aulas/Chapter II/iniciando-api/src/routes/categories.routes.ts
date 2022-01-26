import { Router } from "express";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRouters = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (request, response) => {
    const { name, description } = request.body;

    categoriesRepository.create({ name, description });

    response.status(201).send();
});

export { categoriesRouters };