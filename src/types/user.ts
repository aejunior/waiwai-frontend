export interface User {
  email: string;
  name: string;
  permission: "GUEST" | "USER" | "ADMIN";
}
