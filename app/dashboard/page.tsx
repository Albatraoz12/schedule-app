import { logout } from "../actions/actions";
import { getAuthClaims } from "@/lib/dal/user-dal";
import CreateLession from "./components/CreateLession";
import { getLessions } from "@/lib/dal/lessions/lessions-dal";

async function page() {
  const user = await getAuthClaims();
  const lessions = await getLessions();
  console.log(lessions);

  return (
    <main className="p-5">
      <h1>Welcome {user.email}</h1>
      <p>You have the role of: [ {user?.user_role} ]</p>
      <button
        onClick={logout}
        className="bg-red-600 text-white p-2 px-3 rounded cursor-pointer"
      >
        Log out
      </button>
      <CreateLession />

      <section className="my-4 border">
        {lessions &&
          lessions.length > 0 &&
          lessions?.map((lession: any) => (
            <div key={lession.id} className="py-2 border">
              <p>{lession.name}</p>
              <p>{lession.date}</p>
              <p>{lession.lession_start}</p>
              <p>{lession.lession_end}</p>
              <p>{lession.class.class_name}</p>
              <p>{lession.room.name}</p>
            </div>
          ))}
      </section>
    </main>
  );
}

export default page;
