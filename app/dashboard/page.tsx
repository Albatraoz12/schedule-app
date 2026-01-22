import { logout } from '../actions/actions';
import { getAuthClaims } from '@/lib/dal/user-dal';

async function page() {
  const user = await getAuthClaims();
  return (
    <main>
      <h1>Welcome {user.email}</h1>
      <p>You have the role of: [ {user?.user_role} ]</p>
      <button onClick={logout}>Log out</button>
    </main>
  );
}

export default page;
