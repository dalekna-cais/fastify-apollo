import type { FastifyPluginAsync } from "fastify";
import { ApolloServer } from "@apollo/server";
import {
  type ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";

type ApolloContextProps = {
  authorization?: string;
};

const apolloContext: ApolloFastifyContextFunction<ApolloContextProps> = async (
  request,
  reply
) => {
  return {
    authorization: request.headers.authorization,
  };
};

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const apollo = new ApolloServer<ApolloContextProps>({
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
    handler: fastifyApolloHandler(apollo, {
      context: apolloContext,
    }),
  });
};

export default route;
