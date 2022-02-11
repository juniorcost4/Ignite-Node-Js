import { Router } from "express";
import multer from 'multer';

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";

const categoriesRouters = Router();

const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();

categoriesRouters.post("/", createCategoryController.handle);

categoriesRouters.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRouters.post("/import", upload.single("file"), (request, response) => {
    importCategoryController.handle(request, response);
});

export { categoriesRouters };