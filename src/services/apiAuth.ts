import { v4 } from "uuid";
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
  //check session and if not return
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;

  // if session fetch  user
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

type TCurrentUser = {
  fullName: string;
  avatar: File | null;
};

export const updateCurrentUser = async ({ fullName, avatar }: TCurrentUser) => {
  // 1. Update user metadata
  const { data: currentUser, error } = await supabase.auth.updateUser({
    data: { fullName },
  });

  if (error) throw new Error(error.message);

  //if there is no avatar
  if (!avatar) return;

  // 2. Delete the old avatar if a new one is being uploaded
  if (avatar && avatar instanceof File) {
    const oldAvatarPath = currentUser.user.user_metadata.avatar;

    if (oldAvatarPath) {
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([oldAvatarPath]);

      if (deleteError) throw new Error(deleteError.message);
    }

    // 3. Upload the new avatar
    const avatarName = `${v4()}-${avatar?.name}`.replace(/\//g, "");
    // const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar);

    if (uploadError) throw new Error(uploadError.message);

    // Get the public URL for the new avatar
    const { data: publicURL } = supabase.storage
      .from("avatars")
      .getPublicUrl(avatarName);

    console.log("public url-->", publicURL);

    // 4.Update user metadata with the new avatar URL
    const { error: updateAvatarError } = await supabase.auth.updateUser({
      data: { avatar: publicURL.publicUrl },
    });
    if (updateAvatarError) throw new Error(updateAvatarError.message);
  }

  return currentUser.user;
};

export const updateCurrentUserPassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  // Get the current session
  const { data: user } = await supabase.auth.getSession();
  if (!user.session?.user.email) return;

  // Re-authenticate the user with the current password
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.session.user.email,
    password: currentPassword,
  });

  if (signInError) throw new Error("Current password is incorrect");

  // Update the user's password
  const { error: updatePasswordError, data } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updatePasswordError) throw new Error(updatePasswordError.message);

  return data;
};
