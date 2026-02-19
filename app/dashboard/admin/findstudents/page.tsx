import { getAllStudents } from "@/lib/dal/admin/student-dal";

const FindStudents = async () => {
  const students = await getAllStudents();

  return <div>Find student page</div>;
};

export default FindStudents;
