import { logout } from "../actions/actions";
import { getAuthClaims } from "@/lib/dal/user-dal";
import CreateLession from "./components/CreateLession";

async function page() {
  const user = await getAuthClaims();
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
    </main>
  );
}

export default page;
