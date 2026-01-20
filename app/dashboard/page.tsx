import { logout } from "../actions/actions";

function page() {
  return (
    <main>
      <h1>This is my dashboard</h1>
      <button onClick={logout}>Log out</button>
    </main>
  );
}

export default page;
