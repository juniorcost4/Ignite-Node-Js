import { SpecificationsRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./createSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);

const createSpecificationcontroller = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationcontroller };