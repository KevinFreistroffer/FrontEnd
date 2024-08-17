export interface ISessionPayload {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const sessionPayload: ISessionPayload = {
  token: "string",
  user: {
    id: "string",
    username: "string",
    email: "string",
    createdAt: "string",
    updatedAt: "string",
  },
};
