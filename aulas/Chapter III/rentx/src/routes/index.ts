import { Router } from 'express';

import { categoriesRouters } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRouters);
router.use('/specifications', specificationsRoutes);

export { router };

