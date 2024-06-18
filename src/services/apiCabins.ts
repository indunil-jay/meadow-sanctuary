import supabase from "./supabase";

export type TCabin = {
  id: string;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export const getCabins = async (): Promise<TCabin[]> => {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded.");
  }

  return cabins;
};

export const deleteCabin = async (id: string) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted.");
  }
};

export const createCabin = async (cabin: TCabin) => {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin]) //this works because form registed ids are exatly with supabase columns name
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created.");
  }

  return data;
};
