import {ProfileCard} from "@/modules/profile/ProfileCard";
import {Suspense} from "react";
import {trpc} from "@/plugins/trpc/server";
import {ErrorBoundary} from "react-error-boundary";

export default async function Page() {
  void trpc.user.getCurrent.prefetch()
  return (
    <div>
      <ErrorBoundary fallback={<div>something went wrong...</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileCard/>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}