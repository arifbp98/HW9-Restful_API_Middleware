// Swagger
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Express API with Swagger",
        version: "0.1.0",
        description: "sample untuk API hw 9",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            in: "header",
            name: "Authorization",
            description: "Bearer token to access these api endpoints",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      server: [
        {
          url: "http://localhost:8081/",
        },
      ],
    },
    apis: ["./controller/*.js"],
  };
  
  const specs = swaggerJsDoc(options);


module.exports = specs