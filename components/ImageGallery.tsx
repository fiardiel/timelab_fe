"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ImageGallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!;

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from(bucketName).list("");

      if (error) {
        console.error("Error fetching images:", error);
      } else {
        const urls = data.map((file) =>
          supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl
        );
        setImages(urls);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {images.length === 0 ? (
        <p className="text-gray-500">No images found</p>
      ) : (
        images.map((url, index) => (
          <img key={index} src={url} alt="Supabase Image" className="rounded-lg shadow-lg w-full h-auto" />
        ))
      )}
    </div>
  );
};

export default ImageGallery;
