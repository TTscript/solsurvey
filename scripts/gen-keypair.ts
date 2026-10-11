import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const kp = Keypair.generate();
const secret = bs58.encode(kp.secretKey);
console.log("New keypair generated. Add to .env:\n");
console.log("SURVEY_VAULT_KEYPAIR=" + secret);
console.log("\nPublic key (fund this wallet):", kp.publicKey.toBase58());
