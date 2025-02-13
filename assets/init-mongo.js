db = db.getSiblingDB("marketplace_db");  // Connect to the specified database

// Create a new collection and insert some documents
db.app_config.insertMany([
  {
    "name": "marketplace-config",
    "protocol_owner_address": "addr_test1vz6xzdezxmj6jkykpk2et5fufjurcu2539fn6qzl3e5v09qdyjt2j",
    "script_address": "addr_test1wr2wyzv76vu0m0gmvjkej22xdks38ddsy0jcnhl4mgt73jg7su5lc",
    "fee_oracle_address": "addr_test1wqqf5378l32qqt80x57uremy5n7e8pspj63td05jwku53acz2h5d9",
    "fee_oracle_asset": "921279608a613c652ef50c6593d8dd4de7c85bd5d3f65c65f64ccfdf",
    "token_asset": "lovelace",
    "fee_percentage": 2.5,
  }
]);

