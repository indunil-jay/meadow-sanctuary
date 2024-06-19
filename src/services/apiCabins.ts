import { TCabinFormData } from "../features/cabins/CabinForm";
import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export type TCabin = {
  id: string;
  created_at: string;
  image: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
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
  //get macthing cabins url
  const { data: matchedCabin } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  const matchedImage = (matchedCabin as TCabin).image.split("/").at(-1)!;
  //delete image from storage.
  const { error: imageDeleteError } = await supabase.storage
    .from("cabins")
    .remove([matchedImage]);

  if (imageDeleteError) {
    throw new Error("Cabins could not be deleted.");
  }

  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted.");
  }
};

export const createCabin = async (
  cabin: TCabinFormData & { image: File }
): Promise<TCabin> => {
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
    .select()
    .single();

  // Check if there is a cabin data creation error
  if (error || !data) {
    console.log(error);
    throw new Error("Cabin could not be created.");
  }

  // Check if there is an image upload error
  if (imageError) {
    console.log(imageError);
    // Delete the cabin record if there was an image upload error
    try {
      await supabase.from("cabins").delete().eq("id", data.id);
    } catch (deleteError) {
      console.log("Error deleting cabin record:", deleteError);
      throw new Error("Failed to clean up after failed cabin creation.");
    }
    throw new Error("Cabin image could not be uploaded.");
  }

  return data;
};

export const updateCabin = async (
  cabin: Partial<TCabinFormData>,
  id: string
) => {
  const imageName =
    typeof cabin.image === "string"
      ? cabin.image
      : `${uuidv4()}-${cabin.image?.name}`.replace(/\//g, "");
  const imagePath =
    typeof cabin.image === "string"
      ? cabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  if (cabin.image && typeof cabin.image !== "string") {
    //get old image and delete
    //get
    const { data: matchedCabin } = await supabase
      .from("cabins")
      .select("*")
      .eq("id", id)
      .single();

    const matchedImage = (matchedCabin as TCabin).image.split("/").at(-1)!;
    //delete
    await supabase.storage.from("cabins").remove([matchedImage]);

    //then add new image
    const { error: UpdatingStorageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, cabin.image);

    // Check if there is an image upload error then return
    if (UpdatingStorageError) return;
  }
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    console.log(error);
    throw new Error("Cabin could not be updated.");
  }
  return data;
};
