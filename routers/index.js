const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter.js');
const loginLogoutRouter = require('./loginLogoutRouter.js');
const reviewRouter = require('./reviewRouter.js');
const inquiryRouter = require('./inquiryRouter.js');
const productsRouter = require('./productsRouter');
const cartsRouter = require('./cartsRouter');
const locationRouter = require('./locationRouter.js');
const orderRouter = require('./orderRouter');
const tokenRouter = require('./tokenRouter');


router.use('/users', userRouter);
router.use('/users', loginLogoutRouter);
router.use('/reviews', reviewRouter);
router.use('/inquiry', inquiryRouter);
router.use(productsRouter);
router.use(cartsRouter);
router.use('/location', locationRouter);
router.use(orderRouter);
router.use('/token', tokenRouter);

module.exports = router;
