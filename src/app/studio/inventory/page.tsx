"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function InventoryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (data) setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id: string, highresPath: string) => {
    if (!confirm("Are you sure you want to permanently delete this asset?")) return;
    
    const { deleteAsset } = await import("../actions");
    const res = await deleteAsset(id, highresPath);
    if (res?.error) {
      alert("Failed to delete: " + res.error);
      return;
    }
    
    fetchImages();
  };

  const [editingImg, setEditingImg] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTags, setEditTags] = useState("");

  const startEdit = (img: any) => {
    setEditingImg(img);
    setEditTitle(img.title);
    setEditPrice(img.price_usd.toString());
    setEditDescription(img.description || "");
    setEditTags((img.tags || []).join(", "));
  };

  const saveEdit = async () => {
    const priceNum = parseFloat(editPrice);
    if (isNaN(priceNum)) {
      alert("Invalid price.");
      return;
    }
    
    const { updateAsset } = await import("../actions");
    const res = await updateAsset(editingImg.id, {
      title: editTitle,
      price_usd: priceNum,
      description: editDescription,
      tags: editTags.split(',').map(t => t.trim()).filter(Boolean)
    });
    
    if (res?.error) {
      alert("Failed to update: " + res.error);
      return;
    }

    setEditingImg(null);
    fetchImages();
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-4xl text-premium-text mb-2">Inventory</h1>
          <p className="text-premium-text/60">Manage all assets currently published in the vault.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-premium-border/40 overflow-x-auto min-h-[400px]">
        {loading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <div className="loader scale-150"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="p-12 text-center text-premium-text/60">No assets found in the database.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-premium-surface border-b border-premium-border/40">
              <tr>
                <th className="py-4 px-6 font-serif font-medium text-premium-text">Asset</th>
                <th className="py-4 px-6 font-serif font-medium text-premium-text">Title</th>
                <th className="py-4 px-6 font-serif font-medium text-premium-text">Base Price</th>
                <th className="py-4 px-6 font-serif font-medium text-premium-text text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map(img => (
                <tr key={img.id} className="border-b border-premium-border/20 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-200">
                      <img src={img.watermarked_url} alt={img.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-premium-text">{img.title}</td>
                  <td className="py-4 px-6 text-premium-text/70">${img.price_usd} USD</td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => startEdit(img)}
                      className="text-premium-orange hover:text-orange-700 text-sm font-medium transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(img.id, img.highres_path)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editingImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-premium-border/40">
            <h2 className="font-serif text-2xl text-premium-text mb-6">Edit Asset</h2>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-premium-text/50 mb-2">Title</label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-premium-border focus:outline-none focus:border-premium-orange transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-premium-text/50 mb-2">Base Price (USD)</label>
                <input 
                  type="number" 
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-premium-border focus:outline-none focus:border-premium-orange transition-colors"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-premium-text/50 mb-2">Description</label>
                <textarea 
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-premium-border focus:outline-none focus:border-premium-orange transition-colors"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-premium-text/50 mb-2">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-premium-border focus:outline-none focus:border-premium-orange transition-colors"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setEditingImg(null)}
                className="px-6 py-2 rounded-lg text-premium-text/70 hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="px-6 py-2 rounded-lg bg-premium-orange text-white hover:bg-orange-600 transition-colors text-sm font-medium shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
