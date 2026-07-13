# SolSurvey

Survey platform with Solana wallet verification and instant micropayments. Get high-quality data from real users—respondents verify via wallet and receive SOL upon completion.

## Stack

- **Next.js 16** + **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- **Solana Web3.js** + **Wallet Adapter**

## Features

- **Survey builder**: Create questions (text, single choice, multiple choice), set reward pool in SOL
- **Wallet verification**: Checks minimum balance and transaction history to prevent bots
- **Instant payouts**: SOL sent to respondent's wallet when they click Submit

## Setup

1. Copy `.env.example` to `.env`
2. Add your RPC URL (Helius recommended: https://helius.dev)
3. Run `npm run gen-keypair` and add the output to `SURVEY_VAULT_KEYPAIR`
4. Fund the vault wallet with SOL for survey rewards
5. `npm install` && `npm run dev`

## Usage

- **Create survey**: Go to `/builder`, design questions, set reward per response and total pool
- **Take survey**: Share the `/survey/[id]` link; respondents connect wallet, answer, submit, and receive SOL

## Wallet verification

By default, respondents must have:
- Minimum balance: 0.0001 SOL
- At least 1 transaction in history

Override via env: `MIN_BALANCE_LAMPORTS`, `MIN_TRANSACTION_COUNT`
