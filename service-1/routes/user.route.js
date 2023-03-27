const express = require("express");
const router = express.Router();

const {
  getOneUser,
  createOneUser,
  getAllUsers,
  updatePaymentMethod,
  deleteUser,
  deleteAllUser,
} = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The user managing API
 */

/**
 * @swagger
 * /api/v1/users/retrieve-information/{username}:
 *  get:
 *    summary: Get a specific user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.get("/retrieve-information/:username", getOneUser);

/**
 * @swagger
 * /api/v1/users/get-users:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.get("/get-users", getAllUsers);

/**
 * @swagger
 * /api/v1/users/create-user:
 *  post:
 *    tags: [User]
 *    summary: Create a user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - password
 *            - paymentMethod
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            isAdmin:
 *              type: boolean
 *            paymentMethod:
 *              type: string
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.post("/create-user", createOneUser);
/**
 * @swagger
 * /api/v1/users/update-payment-method/{userId}:
 *  patch:
 *    summary: Update payment method of a specific user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *      - in: body
 *        name: paymentMethod
 *        schema:
 *          type: object
 *          required:
 *            - paymentMethod
 *          properties:
 *            paymentMethod:
 *              type: string
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request  
 */
router.patch("/update-payment-method/:userId", updatePaymentMethod);

/**
 * @swagger
 * /api/v1/users/delete-one-user/{userId}:
 *  delete:
 *    summary: Delete a specific user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.delete("/delete-one-user/:userId", deleteUser);

/**
 * @swagger
 * /api/v1/users/delete-all-users:
 *  delete:
 *    summary: Delete all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.delete("/delete-all-users", deleteAllUser);

module.exports = router;
