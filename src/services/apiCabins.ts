import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

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

export const createCabin = async (
  cabin: TCabin & { image: File }
): Promise<TCabin[]> => {
  // Remove "/" from the received image string otherwise it creates subfolders in the bucket
  const imageName = `${uuidv4()}-${cabin.image.name}`.replace(/\//g, "");

  // Set image bucket path
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // Step 1: Upload the image
  const { error: imageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, cabin.image); //actual_image name, File object

  // Step 2: Insert the cabin record
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select();

  // Check if there is a cabin data creation error
  if (error || !data || data.length === 0) {
    console.log(error);
    throw new Error("Cabin could not be created.");
  }

  // Check if there is an image upload error
  if (imageError) {
    console.log(imageError);
    // Delete the cabin record if there was an image upload error
    try {
      await supabase.from("cabins").delete().eq("id", data[0].id);
    } catch (deleteError) {
      console.log("Error deleting cabin record:", deleteError);
      throw new Error("Failed to clean up after failed cabin creation.");
    }
    throw new Error("Cabin image could not be uploaded.");
  }

  return data;
};
