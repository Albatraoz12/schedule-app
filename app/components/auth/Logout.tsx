import { logout } from "@/app/actions/actions";

const Logout = () => {
  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white p-2 px-3 rounded cursor-pointer"
    >
      Logout
    </button>
  );
};

export default Logout;
