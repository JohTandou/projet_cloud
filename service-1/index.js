const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./routes/user.route");
const catalogRoute = require("./routes/catalog.route");
const locationRoute = require("./routes/location.route");
const cartRoute = require("./routes/cart.route");
const agentRoute = require("./routes/agent.route");
const errorHandler = require("./middlewares/error");
const cors = require("cors");
const importData = require("./data");

const swaggerOption = {
  swaggerDefinition: {
    openApi: "3.0.0",
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    info: {
      title: "Car Rental API",
      version: "1.0.0",
      description: `Pour utiliser cette API, il est préférable que le premier utilisateur soit un administrateur afin qu'il puisse ajouter des voitures.
      Ensuite, les voitures peuvent être récupérées de différentes manières (voir les routes). Lorsqu'un client s'inscrit, il peut voir ses
      informations, puis créer ou supprimer une location. Une fois la location créée, elle sera automatiquement ajoutée à son panier
      (le client peut la supprimer s'il le souhaite). Il peut visualiser le contenu du panier, mais aussi le supprimer complètement.
      Lorsqu'il souhaite effectuer une réservation, il doit fournir ses informations bancaires (numéro, date d'expiration, cryptogramme). 
      Si une voiture a été réservée entre-temps, le client en sera informé et devra alors la supprimer du panier. 
      Une fois les réservations effectuées, les agents peuvent consulter les rapports des utilisateurs.`,
    },
    contact: {
      name: "Aymeric",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

importData();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/catalog", catalogRoute);
app.use("/api/v1/location", locationRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/agent", agentRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
