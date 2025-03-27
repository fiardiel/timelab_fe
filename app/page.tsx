import ImageGallery from "./components/ImageGallery";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Supabase Image Gallery</h1>
      <ImageGallery />
    </main>
  );
}
