import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import key from "./key.ts";

const authMiddleware = async (context: Context, next: any) => {
  const headers: Headers = context.request.headers;
  const authorization = headers.get("Authorization");
  if (!authorization) {
    context.response.status = 401;
    console.log("No Authorization");
    return;
  }
  const jwt = authorization?.split(" ")[1];
  if (!jwt) {
    context.response.status = 401;
    console.log("No Jwt");
    return;
  }
  if (await validateJwt(jwt, key, { isThrowing: false })) {
    await next();
    return;
  }
  context.response.status = 401;
  context.response.body = {
    message: "Invalid jwt token",
  };
  console.log("Invalid jwt token");
};

export default authMiddleware;
