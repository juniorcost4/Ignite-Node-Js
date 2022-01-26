import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRouters = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
        return response.status(400).json({ message: "Category already exists" });
    }

    categoriesRepository.create({ name, description });

    response.status(201).send();
});

categoriesRouters.get("/", (request, response) => {
    return response.json(categoriesRepository.list());
});

export { categoriesRouters };