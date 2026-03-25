# Technical Architecture

## Overview
The Freedom & Peace Party application is designed to be a highly secure, privacy-preserving, transparent, and scalable system for global democratic participation.

## The Stack
### Mobile Application (Frontend)
- **React Native & Expo**: Drives cross-platform compatibility allowing the app to run on iOS, Android, and Web with native performance and feel.
- **Zustand**: Selected for state management due to its zero-boilerplate, highly optimized react hook-based architecture.
- **Axios**: Promised-based HTTP client to interact with the Python REST API.
- **React Navigation**: For complex routing scenarios including nested stacks and persistent bottom tab bars.
- **Theming**: Custom "Dark Theme Primary" design system leveraging Glassmorphism and bespoke micro-animations for a premium 2026+ feel.

### Decentralization & Blockchain (Phase 2)
1. **Polygon (L2)**: Chosen for high transaction throughput and low gas fees. It ensures that every vote and recall petition signature is immutably recorded without pricing out users.
2. **Solidity Smart Contracts**: Custom governance contracts handle:
   - Term limits (auto-revocation of access upon expiry).
   - Recall threshold monitoring (auto-triggering referendums).
   - Transparent, multi-signature treasury control.
3. **ZK-Proofs API (e.g., Worldcoin / Web3Auth)**: Validates that a user is a unique human without needing to link their real-world identity to their blockchain address.

### Backend Infrastructure (Phase 2)
- **FastAPI**: Python-based high-performance asynchronous framework processing all off-chain logic, AI inferences, and API routing.
- **PostgreSQL**: Stores relational data (e.g., leader caching, forum posts, transparency metrics, encrypted member references).
- **Groq AI Integration**: Powers the live real-time assistant, automated moderation in forums, and the "AI Governance Audit" summarizing decision logs and financial transparency reports.

## Core System Flows

### 1. The Anonymized Vote Cast
- User triggers a vote in the App.
- App validates local ZK proof of unique humanity.
- App generates an encrypted payload and sends it to the FastAPI backend.
- Backend verifies the timing/session but deliberately decouples the user ID from the choice payload.
- Backend forwards the choice payload to Polygon smart contract.
- Contract returns a transaction hash.
- App presents transaction hash to User as a mathematical "receipt" of their vote, which can be historically verified against the public ledger.

### 2. The Recall System
- User selects a leader to evaluate for recall.
- User files reasons and uploads evidence (e.g., via IPFS integration).
- If it passes an initial local AI spam-check, it enters the global petition log.
- Once X threshold of signatures is reached (tracked on-chain or via DB), an automatic referendum is triggered.
- If passed by the public, the Smart Contract instantly revokes the leader’s systemic access credentials globally without requiring central party intervention.
