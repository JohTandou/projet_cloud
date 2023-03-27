const express = require("express");
const router = express.Router();

const {
  clearCartcontent,
  getCartContent,
  submitCartToReservation,
} = require("../controllers/cart.controller");

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: The cart managing API
 */

/**
 * @swagger
 * /api/v1/cart/delete-cart/{clientId}:
 *  patch:
 *    summary: Clear the cart of the client
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: string
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.patch("/delete-cart/:clientId", clearCartcontent);

/**
 * @swagger
 * /api/v1/cart/get-cart/{clientId}:
 *  get:
 *    summary: Get the cart of the client
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: string
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.get("/get-cart/:clientId", getCartContent);

/**
 * @swagger
 * /api/v1/cart/submit-cart/{clientId}:
 *  post:
 *    summary: Submit the cart of the client for reservation
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The credit card info
 *        schema:
 *          type: object
 *          required:
 *            - numero
 *            - dateExpiration
 *            - cryptogramme
 *          properties:
 *            numero:
 *              type: string
 *              description : Numéro doit être composé de 16 chiffres seulement
 *            dateExpiration:
 *              type: string
 *              descritpion : Date expiration doit être au format MM/YYYY ou MM/YY
 *            cryptogramme:
 *              type: string
 *              description : Cryptogramme doit être composé de 3 chiffres seulement
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: string
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.post("/submit-cart/:clientId", submitCartToReservation);

module.exports = router;
