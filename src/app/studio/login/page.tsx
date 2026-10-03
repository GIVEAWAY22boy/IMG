"use client";

import { useState } from "react";
import { loginAdmin } from "../actions";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);
    
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/studio");
    }
  };

  return (
    <div className="min-h-screen bg-premium-bg flex items-center justify-center p-6 text-premium-text font-sans">
      <div className="w-full max-w-md bg-premium-surface border border-premium-border/60 rounded-2xl p-10 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-premium-orange mb-2 tracking-wide">MvjHub.</h1>
          <p className="text-premium-text/40 uppercase tracking-[0.2em] text-xs font-bold">Studio Access</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded bg-red-500/10 text-red-500 border border-red-500/30 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-premium-text/50 mb-2">Username</label>
            <input 
              type="text" 
              name="username"
              className="w-full bg-transparent border-b border-premium-border/80 py-3 text-premium-text focus:outline-none focus:border-premium-orange transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-premium-text/50 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              className="w-full bg-transparent border-b border-premium-border/80 py-3 text-premium-text focus:outline-none focus:border-premium-orange transition-colors"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-premium-orange text-white py-4 mt-4 rounded uppercase tracking-[0.2em] text-xs font-bold hover:bg-premium-text transition-colors shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Enter Studio"}
          </button>
        </form>
      </div>
    </div>
  );
}
