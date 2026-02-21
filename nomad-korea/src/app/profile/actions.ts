"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateName(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { error: "이름을 입력해 주세요." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: { full_name: name },
  });

  if (error) return { error: error.message };

  revalidatePath("/profile");
  return { error: null };
}
