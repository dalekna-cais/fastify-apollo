import { DocumentNode } from "graphql";
import flatten from "lodash/flatten";
import merge from "lodash/merge";
import households from "./investor-profile/households";

const typeDefs: DocumentNode[] = flatten([households.typeDefs]);

const resolvers = merge({}, households.resolvers);

export { typeDefs, resolvers };
