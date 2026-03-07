// DTO's are only supposed to tell the developer what to send back but as a type???
// Still learning about DAL and DTO!

export type UserDTO = {
  id: string;
  email: string;
  createdAt: string;
  role: "admin" | "teacher" | "student";
};

export type AppMetadataDTO = {
  provider: string;
  providers: string[];
  user_role: "admin" | "teacher" | "student";
};

export type AuthClaimsDTO = {
  sub: string;
  email?: string;
  user_role?: string;
};
