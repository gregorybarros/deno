import { serve } from "https://deno.land/std/http/server.ts";
import router from "./routes";


  const app = serve({ port: 3333 });

  app.use(router)

  console.log("http://localhost:3333/");


  for await (const req of s) {
    req.respond({ body: "Gregory Fodao\n" });
  }