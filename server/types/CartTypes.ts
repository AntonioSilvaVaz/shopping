import { UUID } from "crypto"

export type CartType = {
  user_id: UUID;
  list: string;
}
