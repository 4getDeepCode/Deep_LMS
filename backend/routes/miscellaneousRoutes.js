import { Router } from 'express';
import { authorizeRoles, isLoggedIn } from '../middlewares/authMiddleware.js';
import { contactUs, userStats } from '../controllers/miscellaneousController.js';

const router = Router();

router.route('/contact').post(contactUs);
router
  .route('/admin/stats/users')
  .get(isLoggedIn, authorizeRoles('ADMIN'), userStats);

export default router;
