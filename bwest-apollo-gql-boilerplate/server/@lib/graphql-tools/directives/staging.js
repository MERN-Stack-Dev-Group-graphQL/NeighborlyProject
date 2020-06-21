import { SchemaDirectiveVisitor } from "apollo-server";
import env from "@lib/env";

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition() {
    if (!["local", "dev", "staging"].includes(env.STAGE)) {
      return null;
    }
  }
}
