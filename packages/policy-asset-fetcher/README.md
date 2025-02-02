# Policy Asset Fetcher

![Python](https://img.shields.io/badge/Python-3.9%2B-brightgreen)

A lightweight Python utility to fetch and export NFT assets under a specific Cardano policy ID using Blockfrost's API.



## Prerequisites

- Python 3.8+
- [Blockfrost API key](https://blockfrost.io/) (free tier available)
- Basic understanding of Cardano NFT policies


## Installation

1. **Set up virtual environment (recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

Create a `.env` file in the project root with the following variables:

```ini
# Database config
DB_URI="mongodb://db:27017/marketplace_db"

# Required
POLICY_ID=your_policy_id_here
BLOCKFROST_PROJECT_ID=your_project_id_here from blockfrost

# Optional (default: preprod)
BLOCKFROST_CARDANO_NETWORK=mainnet
```

> **Warning**  
> Never commit your `.env` file or share API keys publicly. Add `.env` to your `.gitignore`

## Usage

```bash
python main.py
```


### Expected Mongodb `policy_assets` collection data
```json
[
  {
    "asset": "asset1vgj6yq8m8y...",
    "quantity": "1",
    "metadata": {
      "name": "NFT #1",
      "image": "ipfs://Qm...",
      ...
    }
  },
  ...
]
```

## License

Distributed under the MIT License. See [LICENSE](../../LICENSE) for more information.