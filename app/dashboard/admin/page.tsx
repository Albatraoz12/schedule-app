import { getLessions, getRooms } from "@/lib/dal/lessions/lessions-dal";
import { getAuthenticatedUser } from "@/lib/dal/user-dal";
import { Suspense } from "react";
import CreateLession from "../components/CreateLession";
import LessionCalendar from "./components/LessionCalendar";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/actions";

export default async function Page() {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/");

  return (
    <main className="p-5">
      <h1>Welcome {user?.email}</h1>
      <p>You have the role of: [ {user?.role} ]</p>
      <button
        onClick={logout}
        className="bg-red-600 text-white p-2 px-3 rounded cursor-pointer"
      >
        Log out
      </button>

      <Suspense fallback={<div>Loading lessons...</div>}>
        <LessionsData />
      </Suspense>
    </main>
  );
}

async function LessionsData() {
  const [lessions, rooms] = await Promise.all([getLessions(), getRooms()]);

  return (
    <>
      <CreateLession rooms={rooms} />
      <section className="my-4 border">
        <LessionCalendar lessions={lessions || []} rooms={rooms || []} />
      </section>
    </>
  );
}
