import { redirect } from "next/navigation"

export default function Home() {
  // リダイレクト - 実際のアプリではログイン状態に応じて振り分け
  redirect("/login")
}

