import { getAuthClaims } from "@/lib/dal/user-dal";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import LessionCalendar from "./components/LessionCalendar";

export default async function StudentDashboard() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: classes } = await supabase.from("class").select("*").single();

  const { data: lessions, error: lessionsError } = await supabase
    .from("create_lession")
    .select(
      `
      *,
      rooms:room_id (
        id,
        name
      )
    `,
    )
    .eq("class_id", classes?.id)
    .order("date", { ascending: true })
    .order("lession_start", { ascending: true });

  if (lessionsError) {
    console.error("Error fetching lessions:", lessionsError);
    return <div>Kunde inte hämta lektioner</div>;
  }

  const { data: rooms } = await supabase.from("rooms").select("*");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Mitt Schema</h1>
        <p className="text-gray-600">Här ser du alla dina lektioner</p>
      </div>

      <LessionCalendar lessions={lessions || []} rooms={rooms || []} />
    </div>
  );
}
