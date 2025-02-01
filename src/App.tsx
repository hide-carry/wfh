"use client"

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
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900">{excuse}</h1>

          <div className="flex justify-center space-x-4">
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <FaTwitter className="h-5 w-5" />
              Twitterで共有
            </button>
            <button
              onClick={getRandomExcuse}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              別の理由
            </button>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="理由を入力..."
                value={newExcuse}
                onChange={(e) => setNewExcuse(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addExcuse}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-4 right-4 flex gap-4 text-sm text-gray-600">
        <a href="#" className="hover:underline">
          送信
        </a>
        <a href="#" className="hover:underline">
          ドキュメント
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
      </footer>
    </main>
  )
}
