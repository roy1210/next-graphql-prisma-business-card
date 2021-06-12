import { gql, ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid4 } from "uuid";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Card {
    id: Int
    name: String!
    email: String!
    phone: String!
    biography: String!
    cardId: String!
    twitter: String!
    github: String!
    website: String!
  }

  input CardInput {
    name: String!
    email: String!
    phone: String!
    biography: String!
    twitter: String!
    github: String!
    website: String!
  }

  type Query {
    getCards: [Card]
    getCard(id: String!): Card
  }

  type Mutation {
    addCard(input: CardInput!): Card
    deleteCard(id: String!): Card
  }
`;

const resolvers = {
  Query: {
    getCards: async () => {
      return prisma.card.findMany({
        take: 10,
      });
    },
    // Memo: first arg -> parent
    getCard: async (_, args) => {
      const card = await prisma.card.findUnique({
        where: {
          id: Number(args.id),
        },
      });
      return card;
    },
  },
  Mutation: {
    addCard: async (_, args) => {
      return prisma.card.create({
        data: { ...args.input, cardId: uuid4() },
      });
    },
    deleteCard: async (_, args) => {
      return prisma.card.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({
  path: "/api/graphql",
});

export default handler;
