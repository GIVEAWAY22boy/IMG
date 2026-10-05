"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("49.00");
  const [tags, setTags] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image file first.");
      return;
    }
    
    setIsUploading(true);
    setMessage("Generating low-quality watermarked preview...");
    
    try {
      // 1. Generate Watermarked Low-Quality Version
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Scale down for preview (max width 1200)
      const scale = Math.min(1200 / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      if (ctx) {
        // Draw low res image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Add Watermark pattern
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "bold 60px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Rotate and draw repeating watermark
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        for (let i = -3; i <= 3; i++) {
          for (let j = -3; j <= 3; j++) {
            ctx.fillText("MvjHub", i * 300, j * 300);
          }
        }
      }

      const watermarkedBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.6); // 60% quality compression
      });

      const fileExt = file.name.split('.').pop();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const previewFileName = `preview_${uniqueId}.jpg`;
      const highresFileName = `highres_${uniqueId}.${fileExt}`;

      setMessage("Uploading watermarked preview to public bucket...");
      
      // 2. Upload Watermarked to public-watermarked
      const { error: previewError } = await supabase.storage
        .from('public-watermarked')
        .upload(previewFileName, watermarkedBlob);
        
      if (previewError) throw new Error(`Preview Upload Error: ${previewError.message}. Did you update RLS?`);
      
      setMessage("Uploading original high-res to secure bucket...");

      // 3. Upload Original to secure-highres
      const { error: highresError } = await supabase.storage
        .from('secure-highres')
        .upload(highresFileName, file);

      if (highresError) throw new Error(`High-res Upload Error: ${highresError.message}. Did you update RLS?`);

      const { data: publicUrlData } = supabase.storage
        .from('public-watermarked')
        .getPublicUrl(previewFileName);
        
      setMessage("Finalizing database entry...");
      
      // 4. Insert into Supabase database
      const { error: dbError } = await supabase
        .from('images')
        .insert({
          title,
          description,
          price_usd: parseFloat(price),
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          watermarked_url: publicUrlData.publicUrl,
          highres_path: highresFileName, 
          width: img.width, 
          height: img.height
        });
        
      if (dbError) throw dbError;
      
      setMessage("Asset successfully added to the collection!");
      setFile(null);
      setPreviewUrl(null);
      setTitle("");
      setDescription("");
      setPrice("49.00");
      setTags("");
      
    } catch (err: any) {
      console.error(err);
      setMessage(`Upload Failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-4xl text-premium-text mb-2">Upload Asset</h1>
      <p className="text-premium-text/60 mb-10">Add a new high-resolution image to your exclusive vault.</p>
      
      <div className="bg-white rounded-xl shadow-sm border border-premium-border/40 p-8">
        <form onSubmit={handleUpload} className="flex flex-col gap-8">
          
          {/* File Dropzone */}
          <div className="w-full">
            <label className="block text-sm font-medium text-premium-text/80 mb-2">High-Res Image</label>
            <div className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-12 transition-colors relative ${previewUrl ? 'border-premium-orange bg-premium-orange/5' : 'border-premium-border/60 bg-premium-bg hover:bg-gray-50'}`}>
              {previewUrl ? (
                <div className="relative w-full h-64">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-md" />
                  <button 
                    type="button" 
                    onClick={() => { setFile(null); setPreviewUrl(null); }}
                    className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-premium-text/40 mb-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <p className="text-premium-text/70 font-medium">Click to browse or drag and drop</p>
                  <p className="text-xs text-premium-text/40 mt-1">JPG, PNG, TIFF up to 50MB</p>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-premium-text/80">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Moody Portrait" 
                className="w-full border border-premium-border/60 rounded-md py-3 px-4 focus:outline-none focus:border-premium-orange transition-colors"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-premium-text/80">Base Price (USD)</label>
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-premium-border/60 rounded-md py-3 px-4 focus:outline-none focus:border-premium-orange transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-premium-text/80">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief editorial description..." 
              rows={3}
              className="w-full border border-premium-border/60 rounded-md py-3 px-4 focus:outline-none focus:border-premium-orange transition-colors resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-premium-text/80">Tags (comma separated)</label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Minimalist, Architecture, Dark" 
              className="w-full border border-premium-border/60 rounded-md py-3 px-4 focus:outline-none focus:border-premium-orange transition-colors"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-md text-sm font-medium ${message.includes('Error') || message.includes('Failed') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isUploading || !file}
            className="w-full bg-premium-orange text-white py-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isUploading ? 'Uploading to Vault...' : 'Publish Asset'}
          </button>
          
        </form>
      </div>
    </div>
  );
}
