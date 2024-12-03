# AR Content NFT Smart Contract

## Overview
Blockchain-based NFT platform for Augmented Reality content management and ownership.

## Features
- Create AR content NFTs
- Transfer AR content
- Metadata tracking
- Ownership verification

## Key Functions
- `create-ar-content`: Mint new AR content NFT
- `transfer-ar-content`: Transfer NFT ownership
- `get-ar-content-data`: Retrieve content metadata
- `get-ar-content-owner`: Check NFT ownership

## Data Structure
- NFT token: `ar-content`
- Metadata tracking via `content-data` map
- Stores:
    - Creator
    - Title
    - Description
    - Content hash
    - Creation timestamp

## Error Handling
- Owner-only restrictions
- Unauthorized transfer prevention
- Not found error management

## Requirements
- Stacks blockchain
- Clarity smart contract support
