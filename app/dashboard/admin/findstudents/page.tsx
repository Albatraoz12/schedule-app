import { getAllStudents } from "@/lib/dal/admin/student-dal";
import UpdateUser from "../../components/admin/UpdateUser";

export type Student = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  bio: string;
  role: string;
  created_at: string;
  updated_at: string;
};

const FindStudents = async () => {
  const students = await getAllStudents();

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-6">
      {students && students.length > 0 ? (
        <UpdateUser students={students} />
      ) : (
        <p className="text-gray-500">Inga studenter hittades.</p>
      )}
    </section>
  );
};

export default FindStudents;
