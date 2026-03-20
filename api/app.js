//imports de configuration
import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

//imports de sécurité(cors, xss ...)
import cors from 'cors';

//import des routes et middlewares
import { errorHandler } from "./middlewares/common.middleware.js";
import teamRoutes from "./routes/team.routes.js";
import pokemonRoutes from "./routes/pokemon.routes.js";
import typeRoutes from "./routes/type.routes.js";
import authRoutes from "./routes/auth.routes.js";

//instanciation 
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

//utlisation des routes
app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/pokemons", pokemonRoutes);
app.use("/types", typeRoutes);

//swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//appel du middleware d'erreur
app.use(errorHandler);

//Ecoute de l'application
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});