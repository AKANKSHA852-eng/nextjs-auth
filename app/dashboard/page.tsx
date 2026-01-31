import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold text-red-500">
          Unauthorized 🚫
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">Dashboard 🎉</h1>
        <p className="text-gray-600">
          You are successfully logged in.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">Profile</div>
          <div className="p-4 bg-green-100 rounded-lg">Settings</div>
          <div className="p-4 bg-purple-100 rounded-lg">Analytics</div>
        </div>
      </div>
    </div>
  );
}