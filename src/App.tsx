import { useState, useEffect } from "react"
import { FaTwitter } from "react-icons/fa"

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
  const [newExcuse, setNewExcuse] = useState("")

  useEffect(() => {
    getRandomExcuse()
  }, [])

  const getRandomExcuse = () => {
    const randomIndex = Math.floor(Math.random() * excuses.length)
    setExcuse(`本日リモートワークします。${excuses[randomIndex]}`)
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(excuse)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const addExcuse = () => {
    if (newExcuse.trim()) {
      setExcuse(`本日リモートワークします。${newExcuse}`)
      setNewExcuse("")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 leading-tight">{excuse}</h1>

          <div className="flex justify-center">
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
            >
              <FaTwitter className="h-4 w-4" />
              Twitterで共有
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="理由を入力..."
                value={newExcuse}
                onChange={(e) => setNewExcuse(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addExcuse}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={getRandomExcuse}
        className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
      >
        他の理由
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
