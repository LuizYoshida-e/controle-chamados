import nextjs from "@prisma/composer/nextjs";
import { secretString } from "@prisma/composer/arktype";
import { type } from "arktype";
import { compute } from "@prisma/composer-prisma-cloud";

export default compute({
  name: "app",
  deps: {
  },
  input: type({
    databaseUrl: secretString(),
  }),
  build: nextjs({ module: import.meta.url, appDir: "." }),
});
