db = db.getSiblingDB("marketplace_db");  // Connect to the specified database

// Create a new collection and insert some documents
db.app_config.insertMany([
  {
    "name": "marketplace-config",
    "protocol_owner_address": "addr_test1vz6xzdezxmj6jkykpk2et5fufjurcu2539fn6qzl3e5v09qdyjt2j",
    "script_address": "addr_test1wr2wyzv76vu0m0gmvjkej22xdks38ddsy0jcnhl4mgt73jg7su5lc",
    "fee_oracle_address": "addr_test1wqqf5378l32qqt80x57uremy5n7e8pspj63td05jwku53acz2h5d9",
    "fee_oracle_asset": "921279608a613c652ef50c6593d8dd4de7c85bd5d3f65c65f64ccfdf"
  }
]);

db.policy_assets.insertMany([{

  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742031",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742031",
  "fingerprint": "asset1xt8yyz55y9p2x6tnj8v36t6qlljmqm65zc0ysg",
  "quantity": "1",
  "initial_mint_tx_hash": "51af0f136197ea6abcda1f4837a460812ec16a480a4e37fd996653b55e8698a5",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 1",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 1",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{

  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742038",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742038",
  "fingerprint": "asset1eracljas2yakv4zj997qn0kyqh4jfvtzg4thxn",
  "quantity": "1",
  "initial_mint_tx_hash": "51af0f136197ea6abcda1f4837a460812ec16a480a4e37fd996653b55e8698a5",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 8",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 8",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{

  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742033",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742033",
  "fingerprint": "asset1avv4lu5a99eepel3esatmthwzudp30t27t2urs",
  "quantity": "1",
  "initial_mint_tx_hash": "51af0f136197ea6abcda1f4837a460812ec16a480a4e37fd996653b55e8698a5",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 3",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 3",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{
  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742035",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742035",
  "fingerprint": "asset163lutc6jx74mt6xm56ffzcjnkyjjw409r4a4wm",
  "quantity": "1",
  "initial_mint_tx_hash": "51af0f136197ea6abcda1f4837a460812ec16a480a4e37fd996653b55e8698a5",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 5",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 5",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{
  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c5948617070792046656574203130",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "48617070792046656574203130",
  "fingerprint": "asset139pzvehk86j266celcwf3mhhdh58ayn3zukm26",
  "quantity": "1",
  "initial_mint_tx_hash": "51af0f136197ea6abcda1f4837a460812ec16a480a4e37fd996653b55e8698a5",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 10",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 10",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{
  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742032",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742032",
  "fingerprint": "asset1hxu7dnhqdfgd7393r7zgzx0sltfkc066sffxhp",
  "quantity": "1",
  "initial_mint_tx_hash": "3694e647faed19ce2a7378f6e9491575bde16c977b7884c46e438e86ea92af30",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 2",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 2",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{
  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742034",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742034",
  "fingerprint": "asset1gpqcs7lqu4rys68xpdz27dq9y6sg2qtt3v3qmu",
  "quantity": "1",
  "initial_mint_tx_hash": "3694e647faed19ce2a7378f6e9491575bde16c977b7884c46e438e86ea92af30",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 4",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 4",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{
  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742036",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742036",
  "fingerprint": "asset14g2f7m7cqply3d4sx65yc3nhd304xmhtu0afjj",
  "quantity": "1",
  "initial_mint_tx_hash": "3694e647faed19ce2a7378f6e9491575bde16c977b7884c46e438e86ea92af30",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 6",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 6",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{
  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742037",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742037",
  "fingerprint": "asset1mu9zdgk3djqeqs5g5mtkdlzct5ngs3p76d06fe",
  "quantity": "1",
  "initial_mint_tx_hash": "3694e647faed19ce2a7378f6e9491575bde16c977b7884c46e438e86ea92af30",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 7",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 7",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
},
{
  
  "asset": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59486170707920466565742039",
  "policy_id": "2cbcdc3a9a766a1bd475dda1068d3eae85e090795d318b4387563c59",
  "asset_name": "486170707920466565742039",
  "fingerprint": "asset1yc6w44a6z7zpr2l5x6vnesknx2vcxdykp70jpn",
  "quantity": "1",
  "initial_mint_tx_hash": "3694e647faed19ce2a7378f6e9491575bde16c977b7884c46e438e86ea92af30",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "name": "Happy Feet 9",
    "files": [
      {
        "src": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
        "name": "Happy Feet 9",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmT4aYun96qurfrTPCyVHtdgFSRGGbUpfGfER4UdrQ5cgf",
    "mediaType": "image/jpeg",
    "description": ""
  },
  "onchain_metadata_standard": "CIP25v1",
  "onchain_metadata_extra": null,
  "metadata": null,
  "properties": []
}]);
