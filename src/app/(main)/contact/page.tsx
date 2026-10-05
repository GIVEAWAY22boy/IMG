"use client";

import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with the actual WhatsApp number (include country code, no + or spaces)
    const whatsappNumber = "15551234567"; 
    const text = `Hi MvjHub! My name is ${name} (${email}).\n\n${message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-premium-bg pt-48 pb-32 px-6">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-20">
        <div className="w-full lg:w-1/2">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-sm font-bold mb-8 block">
            Get in touch
          </span>
          <h1 className="font-serif text-6xl md:text-8xl text-premium-text mb-12">
            Studio <br />
            <span className="italic text-premium-orange font-light">Inquiries.</span>
          </h1>
          
          <p className="text-xl text-premium-text/70 font-light mb-16 max-w-md leading-relaxed">
            For bespoke licensing, gallery exhibitions, or general inquiries, please reach out directly via WhatsApp.
          </p>

          <form onSubmit={handleWhatsApp} className="flex flex-col gap-8 max-w-lg">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-premium-text/20 py-4 text-premium-text placeholder-premium-text/40 focus:outline-none focus:border-premium-orange transition-colors duration-500 font-serif text-xl"
                required
              />
            </div>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-premium-text/20 py-4 text-premium-text placeholder-premium-text/40 focus:outline-none focus:border-premium-orange transition-colors duration-500 font-serif text-xl"
                required
              />
            </div>
            <div className="relative group">
              <textarea 
                placeholder="Your message..." 
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b border-premium-text/20 py-4 text-premium-text placeholder-premium-text/40 focus:outline-none focus:border-premium-orange transition-colors duration-500 font-serif text-xl resize-none"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="self-start mt-4 flex items-center gap-3 bg-premium-orange text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[600px] rounded-xl overflow-hidden shadow-2xl">
          <Image src="/premium_5.jpg" alt="Contact Studio" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10 bg-premium-surface/95 backdrop-blur-xl p-8 rounded-xl border border-white/40 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-serif text-xl text-premium-text mb-4 border-b border-premium-border pb-2">Direct Contact</h3>
                <p className="text-premium-text font-medium text-sm leading-relaxed mb-1">
                  📞 +1 (555) 019-8273
                </p>
                <p className="text-premium-text font-medium text-sm leading-relaxed">
                  ✉️ curator@mvjhub.com
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl text-premium-text mb-4 border-b border-premium-border pb-2">Social</h3>
                <div className="flex flex-col gap-1">
                  <a href="#" className="text-premium-orange font-bold text-sm uppercase tracking-widest hover:text-premium-text transition-colors">
                    Instagram ↗
                  </a>
                  <a href="#" className="text-premium-orange font-bold text-sm uppercase tracking-widest hover:text-premium-text transition-colors">
                    Pinterest ↗
                  </a>
                  <a href="#" className="text-premium-orange font-bold text-sm uppercase tracking-widest hover:text-premium-text transition-colors">
                    Twitter ↗
                  </a>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-serif text-xl text-premium-text mb-2">The Studio</h3>
                <p className="text-premium-text/70 font-light text-sm leading-relaxed">
                  142 Editorial Avenue, Creative District, NY 10012
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
