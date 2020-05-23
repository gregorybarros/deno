import { Application, Router } from "https://deno.land/x/denotrain@v0.5.0/mod.ts";

// Create a new application (port defaults to 3000, hostname to 0.0.0.0)
const app = new Application();
// Optional: Generate router and hook routes to it
const router = new Router();

// Middleware 
app.use((ctx) => {
  // Add data to the response object and return undefined
  // -> Still passed to other handlers

  // Add cookies to the deno train cookie handler
  ctx.cookies["user.session"] = "qwertz";
  ctx.cookies["a"] = "123";
  ctx.cookies["b"] = "456";
  delete ctx.cookies["user.session"];
  return;
});

// this will only listen on GET requests
router.get("/", (ctx) => {
  // Returning a string, JSON, Reader or Uint8Array automatically sets
  // Content-Type header and no further router will match
  return new Promise((resolve) => resolve("This is the admin interface!")); 
});
router.get("/edit", async (ctx) => {
  return "This is an edit mode!"; 
});

app.get("/", (ctx) => {
  // Returning a json
  return {"hello": "world"};
});

// Hook up the router on "/admin". The routes are now
// available on "/admin" and "/admin/edit"
app.use("/admin", router);

app.get("/:id", (ctx) => {
  // Use url parameters
  return "Hello World with ID: " + ctx.req.params.id
});

// Make a post request; try it with sending json or url-form-encoded
// and a corresponding Content-Type header
app.post("/formtest", async (ctx) => {
  console.log(ctx.req.body.name)
  return `Ola ${ctx.req.body.name}`;
});

// Run the application on the specified port
await app.run();