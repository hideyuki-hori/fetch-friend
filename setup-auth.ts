import { auth } from "./auth";
import { writeFileSync } from "fs";

const schema = auth.generatePrismaSchema();
console.log(schema);

writeFileSync("./prisma/better-auth-schema.prisma", schema);