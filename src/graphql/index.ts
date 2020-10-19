import { readFileSync } from "fs";
import { join } from "path";

export function getQuery(name: string) {
  return readFileSync(join(__dirname, 'queries', name)).toString();
}
export function getSchema() {
  return readFileSync(join(__dirname, "schema.gql")).toString();
}
