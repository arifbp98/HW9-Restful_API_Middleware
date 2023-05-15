/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - email
 *        - gender
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: integer
 *          description: ID of the movie
 *        email:
 *          type: string
 *          description: The title of the movie
 *        gender:
 *          type: string
 *          description: The genre of the movie
 *        password:
 *          type: string
 *          description: The year of the movie
 *        role:
 *          type: string
 *          description: The year of the movie
 *        createdAt:
 *          type: Date
 *          description: The date of the movie
 *        updatedAt:
 *          type: Date
 *          description: The date of the movie
 *      example:
 *        email: gigachad@gmail.com
 *        gender: Male
 *        password: sigmamale
 *        role: admin
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users API
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - name : page
 *         in : query
 *         description : Page Number
 *         required: false
 *         type: integer
 *       - name : limit
 *         in : query
 *         description : Limit Number
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       404:
 *         description: The user was not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.User;
const authenticateTokenMiddleware = require("../middleware/authentication");

// Middleware
router.use(authenticateTokenMiddleware);

// GET all users
router.get("/", async (request, response) => {
  const users = await User.findAll({
    offset: request.query.page,
    limit: request.query.size,
  });
  const userCount = await User.count();

  return response.status(200).json({
    data: users,
    meta: {
      page: request.query.page,
      count: userCount,
      size: users.length,
    },
  });
});

// GET user by id
router.get("/:id", async (request, response) => {
  const user = await User.findByPk(request.params.id);

  if (!user) return response.status(404).json({ message: "Users not found" });

  return response.status(200).json({ data: user });
});

// POST user
router.post("/", async (request, response) => {
  const user = await User.create(request.body);

  if (!user)
    return response
      .status(422)
      .json({ message: "Failed create user. Please try again" });

  return response.status(200).json({ data: user });
});

// PUT user by id
router.put("/:id", async (request, response) => {
  const user = await User.findByPk(request.params.id);

  if (!user) return response.status(404).json({ message: "Users not found" });

  User.update(request.body, { where: { id: request.params.id } });

  return response.status(200).json({ message: "User updated" });
});

// DELETE user by id
router.delete("/:id", async (request, response) => {
  const user = await User.findByPk(request.params.id);

  if (!user) return response.status(404).json({ message: "Users not found" });

  User.destroy({ where: { id: request.params.id } });

  return response.status(200).json({ data: user });
});

module.exports = router;
