import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

export class MembersDataSource extends RESTDataSource {
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache; uri: string }) {
    super(options);
    this.token = options.token;
    this.baseURL = `https://api.dev.caisgroup.com/${options.uri}`;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["authorization"] = this.token;
  }
}
