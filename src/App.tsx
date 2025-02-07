import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { FaTwitter } from "react-icons/fa"
import { supabase } from "./lib/supabase"

const excuses = [
  "猫が私のラップトップの上に座っているため",
  "隣人が工事をしているため",
  "宅配便が来るのを待っているため",
  "家の植物の世話をする必要があるため",
  "自宅のWi-Fiの調子が良いため",
  "集中力を高めるために静かな環境が必要なため",
  "オンライン会議の準備に時間がかかるため",
  "自宅のコーヒーマシンが最高の一杯を提供するため",
]

export default function Home() {
  const [excuse, setExcuse] = useState("")

  useEffect(() => {
    // URLパラメータからexcuse_idを取得
    const params = new URLSearchParams(window.location.search)
    const excuseId = params.get("e")

    if (excuseId) {
      // 指定されたIDの言い訳を取得
      fetchExcuse(excuseId)
    } else {
      // ランダムな言い訳を表示
      getRandomExcuse()
    }
  }, [])

  const fetchExcuse = async (id: string) => {
    const { data, error } = await supabase
      .from("excuse_registrations")
      .select("value")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching excuse:", error)
      getRandomExcuse()
      return
    }

    if (data) {
      setExcuse(data.value)
    }
  }

  const getRandomExcuse = () => {
    const randomIndex = Math.floor(Math.random() * excuses.length)
    setExcuse(`本日リモートワークします。${excuses[randomIndex]}`)
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(excuse)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const registerExcuse = async (formData: FormData) => {
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

    // 作成した言い訳のIDをパラメータとしてリダイレクト
    window.location.href = `${window.location.pathname}?e=${data.id}`
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 leading-tight">{excuse}</h1>

          <div className="flex justify-center">
            <button
              onClick={shareOnTwitter}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
            >
              <FaTwitter className="h-4 w-4" />
              Twitterで共有
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <form action={registerExcuse}>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="ほかの理由を登録..."
                  name="excuse"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ExcuseSubmitButton />
              </div>
            </form>
          </div>
        </div>
      </div>

      <button
        onClick={getRandomExcuse}
        className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium w-full max-w-md"
      >
        他の理由を見る
      </button>

      <footer className="mt-8 text-center text-white text-sm">
        <a href="#" className="hover:underline mx-2">
          送信
        </a>
        <a href="#" className="hover:underline mx-2">
          ドキュメント
        </a>
        <a href="#" className="hover:underline mx-2">
          About
        </a>
      </footer>
    </main>
  )
}

const ExcuseSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 bg-green-500 text-white rounded-full transition-colors text-sm ${
        pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
      }`}
    >
      {pending ? '登録中...' : '登録する'}
    </button>
  )
}
