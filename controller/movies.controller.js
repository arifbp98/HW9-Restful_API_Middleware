/**
 * @swagger
 * components:
 *  schemas:
 *    Movies:
 *      type: object
 *      required: 
 *        - title
 *        - genre
 *        - year
 *      properties:
 *        id:
 *          type: integer
 *          description: ID of the movie
 *        title:
 *          type: string
 *          description: The title of the movie
 *        genre:
 *          type: string
 *          description: The genre of the movie
 *        year:
 *          type: string
 *          description: The year of the movie
 *        createdAt:
 *          type: Date
 *          description: The date of the movie
 *        updatedAt:
 *          type: Date
 *          description: The date of the movie
 *      example:
 *        title: Titanic
 *        genre: Drama
 *        year: 1928
 */
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movies API
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
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
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movies'
 *     responses:
 *       200:
 *         description: The created movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       500:
 *         description: Some server error
 * /movies/{id}:
 *   get:
 *     summary: Get the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       404:
 *         description: The movie was not found
 *   put:
 *    summary: Update the movie by the id
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The movie was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      404:
 *        description: The movie was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The Movie was deleted
 *       404:
 *         description: The Movie was not found
 */



const express = require("express");
const router = express.Router();
const db = require("../models");
const Movie = db.Movie;
const authenticateTokenMiddleware = require("../middleware/authentication");

// Middleware
router.use(authenticateTokenMiddleware);

// Get all movies
router.get("/", async (request, response) => {
  const movies = await Movie.findAll({
    offset: request.query.page,
    limit: request.query.limit,
  });
  const movieCount = await Movie.count();

  return response.status(200).json({
    data: movies,
    meta: {
      page: request.query.page,
      count: movieCount,
      size: movies.length,
    },
  });
});

// Get movie by id
router.get("/:id", async (request, response) => {
  const movie = await Movie.findByPk(request.params.id);

  if (!movie)
    return response.status(404).json({ message: "Movie not found." });

  return response.status(200).json({ data: movie });
});

// POST movie
router.post("/", async (request, response) => {
  const movie = await Movie.create(request.body);

  if (!movie)
    return response
      .status(422)
      .json({ message: "Failed create user. Please try again" });

  return response.status(200).json({ data: movie });
});

// PUT movie by id
router.put("/:id", async (request, response) => {
  const movie = await Movie.findByPk(request.params.id);

  if (!movie) return response.status(404).json({ message: "Movie not found" });

  Movie.update(request.body, { where: { id: request.params.id } });

  return response.status(200).json({ message: "Movie updated" });
});

// DELETE movie by id
router.delete("/:id", async (request, response) => {
  const movie = await Movie.findByPk(request.params.id);

  if (!movie) return response.status(404).json({ message: "Movie not found" });

  Movie.destroy({ where: { id: request.params.id } });

  return response.status(200).json({ data: movie });
});

module.exports = router;
