import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { FaTwitter } from "react-icons/fa"
import { fetchExcuse, fetchRandomExcuse, getExcuseUrl, registerExcuse } from "./app-view-model"

export default function Home() {
  const [excuse, setExcuse] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const excuseId = params.get("e")

    if (excuseId) {
      fetchExcuse(excuseId).then(setExcuse)
    } else {
      fetchRandomExcuse().then((id) => {
        window.location.href = getExcuseUrl(id)
      })
    }
  }, [])

  const submitExcuse = async (formData: FormData) => {
    const id = await registerExcuse(formData)
    if (id) {
      window.location.href = getExcuseUrl(id)
    }
  }

  const shareOnTwitter = () => {
    const tweetText = `本日リモートワークします。\n${excuse}\n\n#在宅勤務しますメーカー\n`
    const url = window.location.href
    const encodedText = encodeURIComponent(tweetText)
    const encodedUrl = encodeURIComponent(url)
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, "_blank")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <p className="text-base md:text-lg text-center text-gray-600">本日在宅勤務します。</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 leading-tight">
            {excuse}
          </h1>

          <div className="flex flex-col gap-4">
            <button
              onClick={shareOnTwitter}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
            >
              <FaTwitter className="h-4 w-4" />
              言い訳をTwitterで共有する
            </button>

            <button
              onClick={() =>
                fetchRandomExcuse().then((id) => {
                  window.location.href = getExcuseUrl(id)
                })
              }
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              他の理由を見る
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">新しい言い訳を追加</h2>
            <p className="text-sm text-gray-600 mb-4">
              あなたの創造的な言い訳を共有しましょう！下のフォームに入力して「登録する」をタップしてください。
            </p>
            <form action={submitExcuse}>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="例: リモートワークの準備に時間がかかっています..."
                  name="excuse"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ExcuseSubmitButton />
              </div>
            </form>
          </div>
        </div>
      </div>

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
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 bg-green-500 text-white rounded-full transition-colors text-sm ${
        pending ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
      }`}
    >
      {pending ? "登録中..." : "登録する"}
    </button>
  )
}
