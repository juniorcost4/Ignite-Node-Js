import { Router } from "express";
import multer from 'multer';

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRouters = Router();

const upload = multer({
    dest: "./tmp"
});

categoriesRouters.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRouters.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRouters.post("/import", upload.single("file"), (request, response) => {
    const { file } = request;

    console.log(file);

    return response.send();
});

export { categoriesRouters };