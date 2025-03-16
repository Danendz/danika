export const dynamic = 'force-dynamic'

import {ProfileCard} from "@/modules/profile/profile-card/ProfileCard";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {HydrateClient, trpc} from "@/trpc/server";

export default async function Page() {
  void trpc.user.getCurrent.prefetch()
  return (
    <div>
      <HydrateClient>
        <ErrorBoundary fallback={<div>something went wrong...</div>}>
          <Suspense fallback={<div>loading...</div>}>
            <ProfileCard />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  )
}