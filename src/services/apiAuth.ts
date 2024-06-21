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

// use for authorize in client side
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;

  const { data: currentUser, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return currentUser.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw Error(error.message);
};

export type TSignUp = {
  email: string;
  password: string;
  fullName: string;
};

export const signup = async ({ email, password, fullName }: TSignUp) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
};
