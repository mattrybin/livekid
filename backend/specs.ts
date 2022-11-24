import { z } from "zod";

// Example of preprocessing function
const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

export const Account = z.object({
  accountId: z.string(),
  email: z.preprocess(trimString, z.string().email()),
  givenName: z.string(),
  familyName: z.string(),
  height: z.number().int().positive().min(1_000).max(2_300), // In cm
  weight: z.number().int().positive().min(30_000).max(200_000), // In grams
  gender: z.enum(["male", "female"]),
});

export const accountInput = Account.pick({ email: true });

export const accountCreateInput = Account.optional();

export const accountOutputDummy = (): z.infer<typeof Account> => ({
  accountId: "uuid",
  email: "dsadas@dsadas.com",
  givenName: "matt",
  familyName: "rybin",
  height: 1_810,
  weight: 81_000,
  gender: "male",
});
