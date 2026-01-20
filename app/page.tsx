import { createClient } from "@/lib/supabase-server";
import Login from "./components/auth/Login";
import { logout } from "./actions/actions";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <main className="px-3 md:w-[80%] md:mx-auto">
      <h1>Welcome to my Schedule app!</h1>
      <section>
        {user ? (
          <>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <Login />
        )}
      </section>
    </main>
  );
}
