import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { login, auth } from "./routes.ts";
import authMiddleware from "./authMiddleware.ts";

const router = new Router();
router.post("/login", login).get("/auth", authMiddleware, auth);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log("Started on: 8000");
