import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">運送業務基幹システム</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">ログインしてシフトや配送案件を確認</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

