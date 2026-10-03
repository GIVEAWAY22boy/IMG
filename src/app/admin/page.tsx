"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("49.00");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setMessage("Please provide an image and a title.");
      return;
    }

    setIsUploading(true);
    setMessage("Uploading to secure storage...");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = Math.random().toString() + '.' + fileExt;
      const filePath = 'uploads/' + fileName;

      // 1. Upload to public-watermarked (Simulating watermarking for now)
      const { error: publicError } = await supabase.storage
        .from('public-watermarked')
        .upload(filePath, file);
        
      if (publicError) throw publicError;

      // 2. Upload to secure-highres
      const { error: secureError } = await supabase.storage
        .from('secure-highres')
        .upload(filePath, file);

      if (secureError) throw secureError;

      // 3. Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public-watermarked')
        .getPublicUrl(filePath);

      setMessage("Saving metadata...");

      // 4. Insert into Database
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(t => t !== '');
      
      const { error: dbError } = await supabase
        .from('images')
        .insert({
          title,
          description,
          price_usd: parseFloat(price),
          tags: tagArray,
          watermarked_url: publicUrl,
          highres_path: filePath,
          width: 1920, // Ideally, we'd extract actual dimensions before upload
          height: 1080
        });

      if (dbError) throw dbError;

      setMessage("Upload successful!");
      setFile(null);
      setTitle("");
      setDescription("");
      setTags("");
      
    } catch (error: any) {
      console.error("Upload Error:", error);
      setMessage(error.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-3xl mx-auto bg-premium-surface p-10 rounded-xl shadow-lg border border-premium-border/60">
        <h1 className="font-serif text-4xl text-premium-text mb-2">Admin Dashboard</h1>
        <p className="text-premium-text/60 mb-10">Upload new high-resolution exclusive imagery.</p>
        
        {message && (
          <div className="mb-6 p-4 rounded bg-premium-orange/10 text-premium-orange border border-premium-orange/30">
            {message}
          </div>
        )}

        <form onSubmit={handleUpload} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-premium-text mb-2 uppercase tracking-wider">Image File</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-premium-bg border border-premium-border/80 rounded-md py-3 px-4 text-premium-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-premium-orange file:text-white hover:file:bg-premium-text transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-premium-text mb-2 uppercase tracking-wider">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Moody Sunset over Highlands"
              className="w-full bg-transparent border border-premium-border/80 rounded-md py-3 px-4 text-premium-text focus:outline-none focus:border-premium-orange transition-colors" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-premium-text mb-2 uppercase tracking-wider">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief editorial description..."
              className="w-full bg-transparent border border-premium-border/80 rounded-md py-3 px-4 text-premium-text focus:outline-none focus:border-premium-orange transition-colors h-32 resize-none" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-premium-text mb-2 uppercase tracking-wider">Price (USD)</label>
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-transparent border border-premium-border/80 rounded-md py-3 px-4 text-premium-text focus:outline-none focus:border-premium-orange transition-colors" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-premium-text mb-2 uppercase tracking-wider">Tags (comma separated)</label>
              <input 
                type="text" 
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="nature, minimal, moody"
                className="w-full bg-transparent border border-premium-border/80 rounded-md py-3 px-4 text-premium-text focus:outline-none focus:border-premium-orange transition-colors" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-premium-orange text-white py-5 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-lg mt-6 disabled:opacity-50"
          >
            {isUploading ? 'Processing Upload...' : 'Upload Masterpiece'}
          </button>
        </form>
      </div>
    </div>
  );
}
