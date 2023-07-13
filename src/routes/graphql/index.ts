import type { FastifyPluginAsync } from "fastify";
import type { BaseContext } from "@apollo/server";
import { ApolloServer } from "@apollo/server";
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const apollo = new ApolloServer<BaseContext>({
    typeDefs: `
    type Query {
      helloWorld: String!
    }
    `,
    resolvers: {
      Query: {
        helloWorld: (parent, args, context: any, info) => context.greeting,
      },
    },
    plugins: [fastifyApolloDrainPlugin(fastify)],
  });

  await apollo.start();

  fastify.route({
    url: "/",
    method: ["POST", "OPTIONS"],
    handler: fastifyApolloHandler(apollo),
  });
};

export default route;
