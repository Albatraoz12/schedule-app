import Login from "./components/auth/Login";
export default async function Home() {
  return (
    <main className="px-3 md:w-[80%] md:mx-auto flex flex-col justify-start mt-5 md:mt-0 md:justify-center items-center w-full h-screen my-auto">
      <h1 className="text-xl pb-10 md:text-3xl">Welcome to my Schedule app!</h1>
      <section className="w-full">
        <Login />
      </section>
    </main>
  );
}
