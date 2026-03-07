import { getAuthenticatedUser } from "@/lib/dal/user/user-dal";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/actions";
import { LessionsData } from "../admin/page";
import { Suspense } from "react";

export default async function StudentDashboard() {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Mitt Schema</h1>
        <p className="text-gray-600">Här ser du alla dina lektioner</p>
        <button
          onClick={logout}
          className="bg-red-600 text-white p-2 px-3 rounded cursor-pointer"
        >
          Log out
        </button>
      </div>

      <Suspense fallback={<div>Loading lessons...</div>}>
        <LessionsData userId={user.id} userRole={user.role} />
      </Suspense>
    </div>
  );
}
