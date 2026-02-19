import { getLessions, getRooms } from "@/lib/dal/lessions/lessions-dal";
import { getAuthenticatedUser } from "@/lib/dal/user/user-dal";
import { Suspense } from "react";
import CreateLession from "../components/CreateLession";
import LessionCalendar from "../components/LessionCalendar";
import { redirect } from "next/navigation";
import Logout from "@/app/components/auth/Logout";
import getClasses from "@/lib/dal/class/class-dal";
import Link from "next/link";

export default async function AdminPage() {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/");

  return (
    <main className="p-5">
      <h1>Welcome {user?.email}</h1>
      <p>You have the role of: [ {user?.role} ]</p>
      <Link href="/dashboard/admin/findstudents">Find Students</Link>
      <Logout />

      <Suspense fallback={<div>Loading lessons...</div>}>
        <LessionsData userId={user.id} userRole={user.role} />
      </Suspense>
    </main>
  );
}

export async function LessionsData({
  userId,
  userRole,
}: {
  userId: string;
  userRole: string;
}) {
  const [lessions, rooms, classes] = await Promise.all([
    getLessions(),
    getRooms(),
    getClasses(),
  ]);

  return (
    <>
      {userRole && (userRole === "admin" || userRole === "teacher") && (
        <CreateLession rooms={rooms} classes={classes} />
      )}
      <section className="my-4">
        <LessionCalendar
          lessions={lessions || []}
          rooms={rooms || []}
          userId={userId}
        />
      </section>
    </>
  );
}
