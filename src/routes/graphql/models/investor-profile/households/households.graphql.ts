import { gql } from "apollo-server";

export const typeDefs = gql`
  type Household {
    id: String
    name: String
    firmId: String
    teamIds: [String]
    createdAt: String
    updatedAt: String
  }

  type Query {
    getHousehold(input: GetHouseholdInput!): Household
  }

  input GetHouseholdInput {
    householdId: String!
  }
`;
