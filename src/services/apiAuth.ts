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

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;

  const { data: currentUser, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return currentUser.user;
};
