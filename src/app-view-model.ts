import { supabase } from "./lib/supabase";

export const fetchExcuse = async (id: string) => {
    const { data, error } = await supabase
      .from("excuse_registrations")
      .select("value")
      .eq("id", id)
      .single()

    if (error) {
      throw new Error("Error fetching excuse")
    }

    if (data) {
      return data.value;
    }

    return fetchRandomExcuse();
  }

  export const fetchRandomExcuse = async () => {
    const { data, error } = await supabase
      .from("random_excuses")
      .select("id")
      .limit(1)
      .single()

      // console.log("data", data);
    if (error) {
      throw new Error("Error fetching random excuse")
    }

    if (data.id) {
      return data.id;
    }

    throw new Error("No random excuse found")
  }

  export const registerExcuse = async (formData: FormData) => {
    const excuseValue = formData.get("excuse")
    if (!excuseValue) return

    const value = excuseValue as string;
    
    // ランダム英数字8文字のIDを生成
    const generateRandomId = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const id = generateRandomId();

    const { data, error } = await supabase
      .from("excuse_registrations")
      .insert([
        {
          id, // 生成したIDを使用
          value,
          registered_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error registering excuse:", error)
      return
    }

    return data.id;
  }
