"use server";

import { supabase } from "@/lib/supabaseClient";

export const fetchImages = async () => {
  const { data, error } = await supabase
    .from("imagerecord")
    .select("file_name, people");

  if (error || !data) {
    console.error("Error fetching image records:", error);
    return [];
  }

  const result = data.map((record) => ({
    image_url: record.file_name, // Already the full URL
    people: record.people,
  }));

  return result;
};
