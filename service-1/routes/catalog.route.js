const express = require("express");
const router = express.Router();

const {
  getCars,
  getCarByCriteria,
  getAvailableCars,
  deleteAllCars,
  deleteOneCar,
} = require("../controllers/catalog.controller");

/**
 * @swagger
 * tags:
 *  name: Catalog
 *  description: The catalog managing API
 */

/**
 * @swagger
 * /api/v1/catalog/getcars:
 *  get:
 *    summary: Get all cars
 *    tags: [Catalog]
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
router.get("/getcars", getCars);

/**
 * @swagger
 * /api/v1/catalog/getcarsbycriteria:
 *  get:
 *    summary: Get all cars matching criteria
 *    tags: [Catalog]
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        required: false
 *      - in: query
 *        name: price
 *        schema:
 *          type: string
 *        required: false
 *      - in: query
 *        name: categories
 *        schema:
 *          type: string
 *        required: false
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
router.get("/getcarsbycriteria", getCarByCriteria);

/**
 * @swagger
 * /api/v1/catalog/get-available-cars:
 *  get:
 *    summary: Get all cars available for rental
 *    tags: [Catalog]
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
router.get("/get-available-cars", getAvailableCars);

/**
 * @swagger
 * /api/v1/catalog/deleteallcars:
 *  delete:
 *    summary: Delete all cars
 *    tags: [Catalog]
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
router.delete("/deleteallcars", deleteAllCars);

/**
 * @swagger
 * /api/v1/catalog/getcarsbycriteria/deleteonecar/{id}:
 *  delete:
 *    summary: Delete a specific car
 *    tags: [Catalog]
 *    parameters:
 *      - in: path
 *        name: id
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
router.delete("/deleteonecar/:id", deleteOneCar);

module.exports = router;
