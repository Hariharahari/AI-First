import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#181818] p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded font-medium"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-400 hover:text-white">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}