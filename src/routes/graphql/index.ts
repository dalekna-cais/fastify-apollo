import type { FastifyPluginAsync } from "fastify";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { ApolloServer } from "@apollo/server";
import {
  type ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import { InvestorProfileAPI } from "./data-sources/investor-profile";
import { resolvers, typeDefs } from "./models";

export type ApolloContextProps = {
  dataSources: {
    ipAPI: InvestorProfileAPI;
  };
};

const apolloContext = (
  cache: KeyValueCache
): ApolloFastifyContextFunction<ApolloContextProps> => {
  return async (request, reply) => {
    const token = request.headers.authorization;
    return {
      dataSources: {
        ipAPI: new InvestorProfileAPI({ token: token ?? "", cache }),
      },
    };
  };
};

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const apollo = new ApolloServer<ApolloContextProps>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
    introspection: true,
  });

  await apollo.start();

  fastify.route({
    url: "/",
    method: ["POST", "OPTIONS"],
    handler: fastifyApolloHandler(apollo, {
      context: apolloContext(apollo.cache),
    }),
  });
};

export default route;
