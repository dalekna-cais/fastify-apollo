import { test } from "tap";
import { build } from "../helper";

test("graphql is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/graphql",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: `{"query":"{ helloWorld }"}`,
  });

  t.same(JSON.parse(res.payload), { data: { helloWorld: "hello sir!" } });
});
