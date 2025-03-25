import {RouterOutput} from "@/trpc/routers/_app";

export interface EventCardProps {
  data: RouterOutput['event']['listEvents'][number]
}