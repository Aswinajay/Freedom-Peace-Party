# 🌍 Freedom & Peace Party

<div align="center">
  <h3>A fully decentralized, blockchain-secured, ZK-proof-verified platform for global democratic participation!</h3>
</div>

## 📖 Overview

The **Freedom & Peace Party** mobile application is a revolutionary political platform designed to empower every human being on Earth. Built with transparency, accountability, and privacy at its core, the app enables citizens to:
- **Join for Free**: Seamlessly register with zero financial barriers.
- **Vote Anonymously**: Participate in policy decisions, referendums, and global votes with decoupled identity and cryptographic voting receipts.
- **Elect & Recall Leaders**: Monitor real-time approval ratings, track promises, and instantly initiate recalls if representatives fail to deliver.
- **Audit Governance**: Ensure absolute transparency with built-in financial tracking, decision logs, and an AI Governance Audit tool.

Our vision is a digital democracy where power flows directly from the people, bypassing traditional gatekeepers and systemic corruption.

## ✨ Features (MVP 1.0)

- **Onboarding & Registration**: Multi-tiered verification including Worldcoin (ZK-proofs), community vouching, basic, and anonymous modes.
- **Dashboard & My Power**: Real-time stats (member counts), active voting cards, and tracked leaders.
- **Voting Module**: Filterable voting lists with a secure, anonymous voting interface.
- **Leader Accountability**: Publicly tracked performance, promise tracking bars, and an integrated 3-stage recall system.
- **Transparency Dashboard**: Financial tracking, decision logs, member statistics, and full AI governance audits.
- **Manifesto Access**: Explore the 12 Revolutionary Pillars and our implementation timeline from 2026 to 2050.

## 🏗️ Technical Architecture

The architecture is designed to be mobile-first, scalable, and decentralized.

### Frontend (Mobile App)
- **Framework**: [React Native (Expo)](https://expo.dev/) for cross-platform iOS, Android, and Web capabilities.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for fast, lightweight global state handling.
- **Styling**: Tailored Dark Theme (Navy, Gold, Teal) incorporating custom Glassmorphism UI components.
- **Language**: TypeScript for strict type-checking and robust code quality.

### Backend & Infrastructure (Planned for v2.0)
- **API Engine**: FastAPI (Python)
- **Database**: PostgreSQL (Relational schema for robust querying)
- **Blockchain Core**: Polygon (Ethereum L2) for speed and low gas fees.
- **Smart Contracts**: Solidity (Hardhat) enforcing term limits, multi-sig treasuries, and automated recall executions.
- **Identity/Privacy**: Zero-Knowledge Proofs (Worldcoin / Web3Auth) to decouple identity from votes.

## 🚀 Getting Started

To run the mobile app locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- `npm` or `yarn`
- [Expo Go](https://expo.dev/client) app installed on your iOS or Android device (for mobile testing)

### Installation

1. **Navigate to the App directory**:
   ```bash
   cd app
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Expo Development Server**:
   ```bash
   npx expo start
   ```

4. **Run the App**:
   - **Mobile**: Scan the QR code displayed in your terminal using the Expo Go app.
   - **iOS Simulator**: Press `i` in the terminal (Requires Xcode).
   - **Android Emulator**: Press `a` in the terminal (Requires Android Studio).

## 🛡️ Security & Privacy First

The Freedom & Peace Party app is built on a "Privacy-First" / "No Plaintext" policy.
- Personal Identifiable Information (PII) like emails and phone numbers are cryptographically hashed prior to storage.
- Voting actions are completely decoupled from user profiles to guarantee anonymity while ensuring 1-Person-1-Vote integrity.

## 🤝 Contributing

We welcome contributions from developers, activists, and visionaries! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit pull requests, report bugs, and suggest enhancements. Also, refer to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
