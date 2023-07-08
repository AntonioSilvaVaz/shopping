import { UUID } from "crypto"

export type UserType = {
  name: string,
  email: string,
  password: string,
};

export type UserRegistered = UserType & {
  user_id: UUID,
};

export type SessionTokenType = {
  user_id: UUID,
  iat: number,
}