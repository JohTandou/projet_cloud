const express = require("express");
const router = express.Router();

const {
  addLocation,
  deleteLocation,
} = require("../controllers/location.controller");

/**
 * @swagger
 * tags:
 *  name: Location
 *  description: The location managing API
 */

/**
 * @swagger
 * /api/v1/location/add-location:
 *  post:
 *    tags: [Location]
 *    summary: Add a location
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: location
 *        description: The location to add
 *        schema:
 *          type: object
 *          required:
 *            - clientId
 *            - carId
 *            - dateBegin
 *            - dateEnd
 *          properties:
 *            clientId:
 *              type: string
 *            carId:
 *              type: string
 *            dateBegin:
 *              type: string
 *              format: date
 *            dateEnd:
 *              type: string
 *              format: date
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.post("/add-location", addLocation);

/**
 * @swagger
 * /api/v1/location/delete-location/{clientId}/{locationId}:
 *  delete:
 *    summary: Delete a specific location from the cart
 *    tags: [Location]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: locationId
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
router.delete("/delete-location/:clientId/:locationId", deleteLocation);

module.exports = router;
