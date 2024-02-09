'use client'
import { Button } from "@/components/ui/button"
import { Flex } from "@radix-ui/themes"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react"
import { WalletContext } from "@/lib/store"
import { CovalentClient } from "@covalenthq/client-sdk"
import { COVALENT_API_KEY } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function IndexPage() {
    const { walletAddress, setWalletAddress } = useContext(WalletContext);
    const [address, setAddress] = useState(walletAddress ? walletAddress : "");
    const [busy, setBusy] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        // Read the 'address' query parameter from the URL
        if (searchParams !== null) {
            const addressParam = searchParams.get('address') || "demo.eth";
            setAddress(addressParam);
        }
        
        // Update the state with the address from the query parameter, if it exists
    }, [searchParams]);

    const handleResolvedAddress = async (e: any) => {
        e.preventDefault();
        setBusy(true);

        const client = new CovalentClient(COVALENT_API_KEY ? COVALENT_API_KEY : "");
        try {
            const walletActivityResp =
                await client.BaseService.getAddressActivity(
                    address.trim()
                );
            if (walletActivityResp.error) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: walletActivityResp.error_message
                })
            }
            setWalletAddress(walletActivityResp.data.address);
            router.push(`/activity/${walletActivityResp.data.address}`)


        } catch (exception) {
            console.log(exception)
        }
        setBusy(false);
    }


    return (
        <section className="container flex flex-col justify-center gap-6 md:py-10 h-[calc(100vh-150px)] items-center ">
            <Flex direction="column" gap="4">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    GoldRush Wallet &amp; Portfolio UI
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    Explore your linked account or any other account.
                </p>
                <form onSubmit={handleResolvedAddress}>
                    <Flex direction="column" gap="2">
                        <Label htmlFor="email">Account</Label>
                        <Input type="input" id="address" placeholder="Wallet address" value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }} />
                        <div>
                            <Button disabled={address.length === 0 || busy} type="submit">
                                Continue
                            </Button>
                        </div>
                    </Flex>
                </form>


            </Flex>
        </section>
    )
}
