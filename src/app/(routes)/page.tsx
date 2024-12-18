import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="bg-red-200">test<br/>
      {session && (
        <form action={async () =>{
          'use server';
          await signOut();
        }}>
          <button className="border px-4 py-2 bg-ig-red text-white rounded" type="submit">
            Logout
          </button>
        </form>
      )}
      {!session && (
        <form action={async () =>{
          'use server';
          await signIn('google');
        }}>
          <button className="border px-4 py-2 bg-ig-red text-white rounded" type="submit">
            login with google
          </button>
        </form>
      )}

    </div>
  );
}
