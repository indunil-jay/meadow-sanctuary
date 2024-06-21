import supabase from "./supabase";

export type TLogin = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: TLogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};
