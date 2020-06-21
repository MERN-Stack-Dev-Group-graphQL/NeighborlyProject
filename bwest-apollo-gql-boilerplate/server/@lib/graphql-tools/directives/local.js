import { SchemaDirectiveVisitor } from "apollo-server";
import env from "@lib/env";

export default class extends SchemaDirectiveVisitor {
  // visitFieldDefinition() {
  //   if (env.STAGE !== 'local') {
  //     return null
  //   }
  // }
}
