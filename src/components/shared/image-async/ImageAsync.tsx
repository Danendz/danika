"use client";

import Image, {ImageProps} from "next/image";
import React, {useEffect, useMemo, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {ImageOffIcon} from "lucide-react";

type Props = {
  fallback?: React.ReactNode
  isLoading?: boolean
} & ImageProps

export const ImageAsync = (props: Props) => {
  const [reveal, setReveal] = useState(false)
  const [error, setError] = useState(false)
  const {isLoading: propsIsLoading, fallback, ...restProps} = props

  const isLoading = useMemo(() => {
    return !reveal || propsIsLoading
  }, [propsIsLoading, reveal])

  const visibility = !isLoading ? "visible" : "hidden"
  const loader = !isLoading ? "none" : "inline-block"

  useEffect(() => {
    setReveal(false)
    setError(false)
  }, [props.src])

  if ((props.src === 'no-image' || error)) {
    return (
      <div className="w-full h-full bg-primary-foreground flex items-center justify-center pointer-events-none">
        {propsIsLoading ? <Skeleton className="w-full h-full"/> : <ImageOffIcon />}
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <Image
        key={props.src as string} {...restProps}
        style={{...props.style, visibility}}
        className={`${props.className} w-full h-full select-none`}
        onError={() => setError(true)}
        onLoad={() => setReveal(true)}
      />
      <div style={{display: loader}} className="absolute top-0 w-full h-full">
        {fallback ?? <Skeleton className="w-full h-full"/>}
      </div>
    </div>
  )
}