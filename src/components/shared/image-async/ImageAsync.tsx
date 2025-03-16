"use client";

import Image, {ImageProps} from "next/image";
import React, {useMemo, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
  fallback?: React.ReactNode
  isLoading?: boolean
} & ImageProps

export const ImageAsync = (props: Props) => {
  const [reveal, setReveal] = useState(false)
  const {isLoading: propsIsLoading, fallback, ...restProps} = props

  const isLoading = useMemo(() => {
    return !reveal || propsIsLoading
  }, [propsIsLoading, reveal])

  const visibility = !isLoading ? "visible" : "hidden"
  const loader = !isLoading ? "none" : "inline-block"

  return (
    <div className="w-full h-full relative">
      <Image {...restProps} style={{...props.style, visibility}} onError={() => setReveal(true)}
             onLoad={() => setReveal(true)}/>
      <div style={{display: loader}} className="absolute top-0 w-full h-full">
        {fallback ?? <Skeleton className="w-full h-full"/>}
      </div>
    </div>
  )
}