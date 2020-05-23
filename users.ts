export interface User {
  id: string;
  username: string;
  password: string;
}

const users: Array<User> = [
  {
    id: "1",
    username: "Erdem",
    password: "password",
  },
  {
    id: "2",
    username: "Enes",
    password: "password",
  },
];

export default users;
