export interface Password {
  id: string;
  password: string;
  metadata: Metadata;
}

export type Metadata =
  | { type: "Empty" }
  | { type: "Login"; account: string; website: string };
