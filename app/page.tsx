import Login from "./components/auth/Login";

export default function Home() {
  return (
    <main className="px-3 md:w-[80%] md:mx-auto">
      <h1>Welcome to my Schedule app!</h1>
      <section>
        <Login />
      </section>
    </main>
  );
}
