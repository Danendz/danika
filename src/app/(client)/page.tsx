import {auth} from "@/plugins/auth";

export default async function Home() {
  const session = await auth()

  if (!session) {
    return (<div>Not allowed to be here</div>)
  }

  return (
    <div>
      Hello {session.user?.name}
    </div>
  );
}
