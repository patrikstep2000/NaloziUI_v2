import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import PersistentDrawerLeft from "../ui/Drawer";
import Main from "./Main";

export default async function AuthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(options);

  return session?.user ? (
    <PersistentDrawerLeft>
      <Main>{children}</Main>
    </PersistentDrawerLeft>
  ) : (
    <>{children}</>
  );
}
