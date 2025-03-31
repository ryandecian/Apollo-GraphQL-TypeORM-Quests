/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getOneCartoonById } from "./resolvers/cartoon.resolver";

const cartoons = [
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

const User = [
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
  # This "Cartoon" type defines the queryable fields for every cartoon in our data source.
  type Cartoons {
    id: ID
    name: String
    description: String
    couille: String
  }

  type Personnage {
    id: ID
    name: String
    role: String
    short_description: String
  }

  type Cartoon {
    id: ID
    name: String
    description: String
    nb_of_episodes: Int
    nb_of_seasons: Int
    genres: [String]
    realisator: String
    author: String
    ft_diffusion: String
    personnages: [Personnage]
  }
  
  type User {
    id: ID
    name: String
    age: Int
    }

  # The "Query" type is special: it lists all of the available queries
  type Query {
    getCartoons: [Cartoons]
    getOneCartoonById (id: ID): Cartoon
    getUsers: [User]
  }
`;

// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      getCartoons: () => cartoons, 
      getOneCartoonById,
      getUsers: () => User,
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();