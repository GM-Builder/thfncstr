"use client"

import { useEffect, useState } from "react"
import { useAccount, useConnect } from "wagmi"
import MintingCard from "./minting-card"
import { Button } from "./ui/button"
import { useToast } from "@/hooks/use-toast"

export default function MintingPage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] })
    }
  }, [mounted, isConnected, connect, connectors])

  if (!mounted) {
    return null
  }

  const handleConnect = () => {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] })
    } else {
      toast({
        title: "Error",
        description: "No wallet connector available. Please enable Farcaster wallet.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!isConnected || !address ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-slate-900">Funcaster NFT</h1>
                <p className="text-slate-600 text-sm">Mint your exclusive NFT on Base mainnet</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                <p className="text-slate-700 text-sm font-medium">
                  Connect your Farcaster wallet to check eligibility. Only Warplets NFT holders can mint.
                </p>
              </div>

              <Button
                onClick={handleConnect}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg"
              >
                Connect Farcaster Wallet
              </Button>

              <p className="text-xs text-slate-500">Requires Warplets NFT • Base Mainnet • Farcaster Wallet</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <p className="text-sm font-medium text-slate-800 font-mono">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>
            </div>
            <MintingCard address={address} />
          </div>
        )}
      </div>
    </main>
  )
}
