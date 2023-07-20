import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { MembersDataSource } from "./members-data-source";

export class InvestorProfileAPI extends MembersDataSource {
  constructor(options: { token: string; cache: KeyValueCache }) {
    super({ ...options, uri: "investor-profile/v1/" });
  }

  async getHouseholdById(id: string) {
    return this.get(`households/${id}`);
  }
}
