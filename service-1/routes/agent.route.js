const express = require("express");
const router = express.Router();

const {
  createCar,
  userIsRegistered,
  carIsAvailable,
  getAllReservations,
  getOneReservation,
  updateReservationAndCarStatus,
} = require("../controllers/agent.controller");

/**
 * @swagger
 * tags:
 *  name: Agent
 *  description: The agent managing API
 */

/**
 * @swagger
 * /api/v1/agent/create-car/{adminemail}:
 *  post:
 *    tags: [Agent]
 *    summary: Create a car
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: adminemail
 *        schema:
 *          type: string
 *        required: true
 *      - in: body
 *        name: car
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - price
 *            - immatriculation
 *            - categories
 *          properties:
 *            name:
 *              type: string
 *              description: The name of the car
 *            price:
 *              type: number
 *              description: The price must be positive
 *            immatriculation:
 *              type: string
 *              description: XX-XXX-XX ([A-Z]{2}-[0-9]{3}-[A-Z]{2})
 *            categories:
 *              type: string
 *              description: ("Coupé", "Break", "SUV", "Targa", "Crossover", "Minibus","Fourgonnette", "Citadine", "Sportive", "Berline", "4x4", "Monospace")
 *    responses:
 *      200:
 *        description: Success
 *      409 :
 *        description: Conflict
 *      400 :
 *        description: Bad request
 */
router.post("/create-car/:adminemail", createCar);

/**
 * @swagger
 * /api/v1/agent/user-is-registered/{adminemail}/{username}:
 *  get:
 *    summary: Check if a specific user is registered
 *    tags: [Agent]
 *    parameters:
 *      - in: path
 *        name: adminemail
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: username
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
router.get("/user-is-registered/:adminemail/:username", userIsRegistered);

/**
 * @swagger
 * /api/v1/agent/car-is-available/{adminemail}/{carId}:
 *  get:
 *    summary: Check if a specific car is available
 *    tags: [Agent]
 *    parameters:
 *      - in: path
 *        name: adminemail
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: carId
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
router.get("/car-is-available/:adminemail/:carId", carIsAvailable);

/**
 * @swagger
 * /api/v1/agent/get-all-reservations/{adminemail}/{clientId}:
 *  get:
 *    summary: Get all reservations of a specific user
 *    tags: [Agent]
 *    parameters:
 *      - in: path
 *        name: adminemail
 *        schema:
 *          type: string
 *        required: true
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
router.get("/get-all-reservations/:adminemail/:clientId", getAllReservations);

/**
 * @swagger
 * /api/v1/agent/get-one-reservation/{adminemail}/{reservationId}:
 *  get:
 *    summary: Get a specific reservation
 *    tags: [Agent]
 *    parameters:
 *      - in: path
 *        name: adminemail
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: reservationId
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
router.get("/get-one-reservation/:adminemail/:reservationId", getOneReservation);

/**
 * @swagger
 * /api/v1/agent/update-reservation-and-car-status/{adminemail}:
 *  patch:
 *    summary: Update the status of the reservations and cars based on current date
 *    tags: [Agent]
 *    parameters:
 *      - in: path
 *        name: adminemail
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
router.patch("/update-reservation-and-car-status/:adminemail", updateReservationAndCarStatus);

module.exports = router;
