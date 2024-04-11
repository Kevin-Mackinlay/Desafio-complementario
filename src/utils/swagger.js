

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Api Documents",
      description: "Documentation of the following api's",
    },
  },
  apis: [`$__dirname{(__dirname)}/docs/**/*.yml`],
};

export default swaggerOptions;