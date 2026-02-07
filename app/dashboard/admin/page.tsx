import { getAuthClaims, getAuthenticatedUser } from "@/lib/dal/user-dal";
import { getLessions, getRooms } from "@/lib/dal/lessions/lessions-dal";
import { logout } from "@/app/actions/actions";
import CreateLession from "../components/CreateLession";
import LessionCalendar from "./components/LessionCalendar";

async function page() {
  const [user, lessions, rooms] = await Promise.all([
    getAuthenticatedUser(),
    getLessions(),
    getRooms(),
  ]);

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
      <CreateLession rooms={rooms} />

      <section className="my-4 border">
        <LessionCalendar lessions={lessions || []} rooms={rooms || []} />
      </section>
    </main>
  );
}

export default page;
