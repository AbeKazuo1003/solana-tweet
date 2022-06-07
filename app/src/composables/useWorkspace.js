import {computed} from 'vue'
import {useAnchorWallet} from "solana-wallets-vue";
import {Connection, PublicKey} from "@solana/web3.js";
import {Program, Provider} from "@project-serum/anchor";
import idl from '@/idl/solana_twitter.json'

const clusterUrl = process.env.VUE_APP_CLUSTER_URL
const preflightCommitment = 'processed'
const commitment = 'processed'
const programId = new PublicKey(idl.metadata.address)
let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    const wallet = useAnchorWallet()
    const connection = new Connection(clusterUrl, commitment)
    const provider = computed(() => new Provider(connection, wallet.value, { preflightCommitment, commitment }))
    const program = computed(() => new Program(idl, programId, provider.value))
    workspace = {
        wallet,
        connection,
        provider,
        program,
    }
}