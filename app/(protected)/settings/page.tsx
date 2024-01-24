import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
    const session = await auth();

  return (
    <div>
        <form action={async() =>{
            "use server"
            await signOut();
        }}>
            <button type="submit">Sign out</button>
        </form>
        {JSON.stringify(session)}
        {session?.user?.name}
    </div>
  )
}

export default SettingsPage