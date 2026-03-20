import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokedex API",
      version: "1.0.0",
      description: "Documentation de l'API Pokedex",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterBody: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              type: "string",
              example: "Djo",
            },
            email: {
              type: "string",
              example: "djo@djo.com",
            },
            password: {
              type: "string",
              example: "jojolebarjo",
            },
          },
        },

        LoginBody: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              example: "Djo",
            },
            password: {
              type: "string",
              example: "jojolebarjo",
            },
          },
        },

        TeamCreateBody: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "Ultimate Team",
            },
            description: {
              type: "string",
              example: "La meilleure team du monde",
            },
          },
        },

        TeamUpdateBody: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Nouvelle Team",
            },
            description: {
              type: "string",
              example: "Nouvelle description",
            },
          },
        },

        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            username: {
              type: "string",
              example: "Djo",
            },
            email: {
              type: "string",
              example: "djo@djo.com",
            },
          },
        },

        AuthTokenResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Connexion successful",
            },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },

        Type: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Feu",
            },
            color: {
              type: "string",
              example: "#ff4422",
            },
          },
        },

        Vote: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            pokemon_id: {
              type: "integer",
              example: 6,
            },
            user_id: {
              type: "integer",
              example: 2,
            },
          },
        },

        Pokemon: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 6,
            },
            name: {
              type: "string",
              example: "Dracaufeu",
            },
            hp: {
              type: "integer",
              example: 78,
            },
            atk: {
              type: "integer",
              example: 84,
            },
            def: {
              type: "integer",
              example: 78,
            },
            atk_spe: {
              type: "integer",
              example: 109,
            },
            def_spe: {
              type: "integer",
              example: 85,
            },
            speed: {
              type: "integer",
              example: 100,
            },
            created_at: {
              type: "string",
              example: "2026-03-17T11:17:12.377Z",
            },
            updated_at: {
              type: "string",
              example: "2026-03-17T11:17:12.377Z",
            },
            types: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Type",
              },
            },
            votes: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Vote",
              },
            },
            votesCount: {
              type: "integer",
              example: 5,
            },
          },
        },

        Team: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Ultimate Team",
            },
            description: {
              type: "string",
              example: "La meilleure team du monde",
            },
            user_id: {
              type: "integer",
              example: 2,
            },
            pokemons: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Pokemon",
              },
            },
          },
        },

        ComparePokemonsResponse: {
          type: "object",
          properties: {
            firstPokemon: {
              $ref: "#/components/schemas/Pokemon",
            },
            secondPokemon: {
              $ref: "#/components/schemas/Pokemon",
            },
          },
        },

        PokemonVotesResponse: {
          type: "object",
          properties: {
            pokemon_id: {
              type: "integer",
              example: 6,
            },
            pokemon_name: {
              type: "string",
              example: "Dracaufeu",
            },
            votes: {
              type: "integer",
              example: 12,
            },
          },
        },

        VoteSuccessMessage: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Vote added successfully",
            },
          },
        },

        SuccessMessage: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Team deleted successfully",
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Error message",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);