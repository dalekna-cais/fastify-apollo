import { GraphQLError } from "graphql";
import { Resolvers } from "../../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    getHousehold: async (_, { input }, { dataSources }) => {
      if (!input) throw new GraphQLError("No input provided");
      const result = await dataSources.ipAPI.getHouseholdById(
        input.householdId
      );
      return result;
    },
  },
};
