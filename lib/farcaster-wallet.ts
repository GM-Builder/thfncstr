import { createPublicClient, http } from "viem"
import { base } from "viem/chains"

export const publicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
})

// Farcaster Wallet Provider - works with Warpcast or connected EIP-6963 wallets
export const getFarcasterProvider = async () => {
  if (typeof window === "undefined") return null

  // Try to get Farcaster-connected wallet (Warpcast or EIP-6963 providers)
  const provider = (window as any).ethereum

  if (!provider) {
    throw new Error("No Farcaster wallet found. Install Warpcast or a compatible wallet.")
  }

  return provider
}

// Send transaction via Farcaster wallet
export const sendTransactionViaFarcaster = async (to: `0x${string}`, data: `0x${string}`, value: bigint) => {
  const provider = await getFarcasterProvider()

  const accounts = await provider.request({
    method: "eth_requestAccounts",
  })

  const txHash = await provider.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: accounts[0],
        to,
        data,
        value: "0x" + value.toString(16),
      },
    ],
  })

  return txHash
}

// Read contract data (no transaction needed)
export const readContractData = async (
  contractAddress: `0x${string}`,
  abi: any[],
  functionName: string,
  args: any[] = [],
) => {
  try {
    const result = await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName,
      args,
    })
    return result
  } catch (error) {
    console.error("[Farcaster] Contract read error:", error)
    throw error
  }
}
