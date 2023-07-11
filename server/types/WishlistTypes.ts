import { UUID } from "crypto"

export type WishlistType = {
  user_id: UUID;
  list: string;
}
