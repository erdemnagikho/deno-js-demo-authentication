import { Context } from "https://deno.land/x/oak/mod.ts";
import users from "./users.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import key from "./key.ts";


const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const login = async (context: Context) => {
  const { value } = await context.request.body();
  for (const user of users) {
    if (value.username === user.username && value.password === user.password) {
      const payload: Payload = {
        iss: user.username,
        exp: setExpiration(new Date().getTime() + 60000),
      };
      const jwt = makeJwt({ key, header, payload });
      if (jwt) {
        context.response.status = 200;
        context.response.body = {
          id: user.id,
          username: user.username,
          jwt,
        };
      } else {
        context.response.status = 500;
        context.response.body = {
          message: "Server Error",
        };
      }
    }
    return;
  }

  context.response.status = 422;
  context.response.body = {
    message: "Invalid username or password",
  };
};

export const auth = (ctx: Context) => {
  ctx.response.body = "Authentication success";
};
