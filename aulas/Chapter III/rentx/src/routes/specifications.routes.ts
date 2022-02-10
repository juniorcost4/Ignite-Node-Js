import { Router } from 'express';
import { createSpecificationcontroller } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationcontroller.handle(request, response);
});

export { specificationsRoutes };