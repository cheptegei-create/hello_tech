const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const commentsRoutes = require('./commentsRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/profile', profileRoutes);
router.use('/comments', commentsRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;