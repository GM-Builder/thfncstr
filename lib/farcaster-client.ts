import { createPublicClient, http } from "viem"
import { base } from "viem/chains"

export const publicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
})

export const FARCASTER_WALLET_CONFIG = {
  rpcUrl: "https://mainnet.base.org",
  chainId: 8453,
}

export const isFarcasterWalletAvailable = (): boolean => {
  return typeof window !== "undefined" && (window as any).ethereum?.isFarcasterWallet
}

export const getFarcasterWalletProvider = () => {
  if (typeof window !== "undefined") {
    return (window as any).ethereum
  }
  return null
}
