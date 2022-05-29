import { Router } from "express";
import multer from 'multer';

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";

const categoriesRouters = Router();

const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRouters.post("/", createCategoryController.handle);

categoriesRouters.get("/", listCategoryController.handle);

categoriesRouters.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRouters };