"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username !== process.env.ADMIN_USERNAME) {
    return { error: "Incorrect username" };
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Wrong password" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", process.env.ADMIN_SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
  
  redirect("/studio");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/studio/login");
}

export async function updateAsset(id: string, data: any) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== process.env.ADMIN_SESSION_SECRET) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabaseAdmin.from("images").update(data).eq("id", id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteAsset(id: string, highresPath: string) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== process.env.ADMIN_SESSION_SECRET) {
    return { error: "Unauthorized" };
  }

  // Delete from DB
  const { error: dbError } = await supabaseAdmin.from("images").delete().eq("id", id);
  if (dbError) return { error: dbError.message };

  // Delete from storage
  await supabaseAdmin.storage.from("public-watermarked").remove([highresPath]);
  
  return { success: true };
}
