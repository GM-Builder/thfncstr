"use client"

import { useEffect } from "react"
import { sdk } from "@farcaster/miniapp-sdk"
import MintingPage from "@/components/minting-page"

export default function Home() {
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        await sdk.actions.ready()
      } catch (error) {
        console.error("SDK initialization error:", error)
      }
    }
    initializeSDK()
  }, [])

  return <MintingPage />
}
