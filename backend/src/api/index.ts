import express from 'express';
import userRoute from './user';
import postsRoute from './posts';
let router = express.Router();

router.use("/user", userRoute);
router.use("/posts", postsRoute);

export default router;