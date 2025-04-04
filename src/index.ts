/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getOneCartoonById } from "./resolvers/cartoon.resolver";

import { PersonnageSchema, PersonnageInput } from "./schemas/personnages.schema";
import { CartoonsSchema } from "./schemas/cartoons.schema";
import { CartoonSchema, CartoonInput } from "./schemas/Cartoon.schema";
import { createCartoon } from "./resolvers/cartoon.resolver";

import "reflect-metadata";
import { DataSource } from "typeorm";
import { CartoonClass } from "./entities/Cartoon.entity";
import { PersonnageClass } from "./entities/Personnage.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/database/cartoonsDatabase.sqlite",
  synchronize: true,
  logging: false,
  entities: [CartoonClass, PersonnageClass],
});

const fakeDataCartoons = [
    {
      id: 1,
      couille: "couille",
      name: "Les Mystérieuses Cités d'Or",
      description:
        "Esteban, un jeune garçon orphelin, part à la recherche des légendaires Cités d'Or en Amérique du Sud accompagné de Zia et Tao.",
    },
    {
      id: 2,
      name: "Ulysse 31",
      description:
        "Ulysse se perd dans l'espace avec son équipage et cherche à rentrer sur Terre tout en affrontant les dieux de l'Olympe.",
    },
    {
      id: 3,
      name: "Dragon Ball SUPER COOL",
      description:
        "Son Goku, un jeune garçon doté d'une force incroyable, part à la recherche des Dragon Balls, des boules de cristal magiques.",
    },
  ];

const UserData = [
  {
    id : 1,
    name : "Jean",
    age : 25,
  },
  {
    id : 2,
    name : "Pierre",
    age : 30,
  },
  {
    id : 3,
    name : "Paul",
    age : 35,
  }
]

// A schema is a collection of type definitions (hence "typeDefs")

const typeDefs = `#graphql
  type Cartoons ${CartoonsSchema}

  type Personnage ${PersonnageSchema}
  input PersonnageInput ${PersonnageInput}

  type Cartoon ${CartoonSchema}
  input CartoonInput ${CartoonInput}
  
  type UserType {
    id: ID
    name: String
    age: Int
    }

  type Query {
    getCartoons: [Cartoons]
    getOneCartoonById (id: ID): Cartoon
    getUsers: [UserType]
  }

  type Mutation {
    createCartoon (NewCartoon: CartoonInput): Cartoon

  }
`;

// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      getCartoons: () => fakeDataCartoons, 
      getOneCartoonById,
      getUsers: () => UserData,
    },
    Mutation: {
      createCartoon,
    },
  };

// Fonction auto-appelée qui initialise la DB puis démarre le serveur
(async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Base SQLite connectée !");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀 Serveur Apollo prêt sur: ${url}`);
  } catch (error) {
    console.error("❌ Echec au démarrage :", error);
  }
})();