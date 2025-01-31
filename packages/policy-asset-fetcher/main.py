import json
import os
import pymongo
from urllib.parse import quote_plus
from blockfrost import BlockFrostApi, ApiUrls
from dotenv import load_dotenv

load_dotenv()

db = None
BLOCKFROST_PROJECT_ID=  os.getenv("BLOCKFROST_PROJECT_ID")
isProd = os.getenv("STAGE", "dev") == "prod"
api = BlockFrostApi(
    # or export environment variable BLOCKFROST_PROJECT_ID
    project_id=BLOCKFROST_PROJECT_ID,
    # optional: pass base_url or export BLOCKFROST_API_URL to use testnet, defaults to ApiUrls.mainnet.value
    base_url=ApiUrls.preprod.value if not isProd else ApiUrls.mainnet.value
)


def connect_db():
    global db
    if db is None:
        server = os.getenv("DB_SERVER_NAME")
        db_name = os.getenv("DB_NAME",'marketplace_db')
        id = quote_plus(os.getenv("AWS_ACCESS_KEY_ID", ""), safe='~()*!\'')
        key = quote_plus( os.getenv("AWS_SECRET_ACCESS_KEY", ""), safe='~()*!\'')
        session = quote_plus( os.getenv("AWS_SESSION_TOKEN", ""), safe='~()*!\'')
        uri = f'mongodb+srv://{id}:{key}@{server}/?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:{session}'
        MONGO_URI = os.getenv("DB_URI", uri)
        print(f"Mongo URI: {MONGO_URI}")
        client = pymongo.MongoClient(MONGO_URI)
        db = client[db_name]
    return db


def to_dict(data):
    return json.loads(json.dumps(data, default=lambda s: vars(s)))



def get_policy_assets(event={}, context={}):
    """
    This function will use this blockfrost api /asset/policy
    """
    assert "policy_id" in event
    assets = api.assets_policy(policy_id=event["policy_id"], gather_pages=True)

    data = []
    total_assets = 0
    
    for d in assets:
        if int(d.quantity) == 0 :
            continue
        
        data.append(d.to_dict())
        total_assets += 1

    res = {"total": total_assets, "data": data}
    
    return res

    
def get_asset_data(event={}, context={}):
    """
    This function will use this blockfrost api /asset/{asset} 
    """
    assert "asset" in event
    asset = to_dict(api.asset(asset=event["asset"]))
    non_traits_keys = ["name", "files", "image", "mediaType", "description"]
    traits = {}
    if asset is not None and "onchain_metadata" in asset and asset["onchain_metadata"] is list:
        for k2 in [k for k in asset["onchain_metadata"] if k not in non_traits_keys]:
            traits[k2] = asset["onchain_metadata"][k2]
    asset["properties"] = [v for v in traits.values()]
    return asset


def save_policy_assets_db(event={}, context={}):
    """
    Saves the data to MongoDb
    """
    assert "policy_id" in event
    assert "asset" in event
    db = connect_db()
    coll = db["policy_assets"]

    query = {"asset": event["asset"]}
    result = coll.find_one(query)

    if result:
        res = coll.update_one({"_id": result["_id"]}, {"$set": event})
        return {"matched_count": res.matched_count, "modified_count": res.modified_count}
    else:
        res = coll.insert_one(event)
        return {"inserted_id": f"{res.inserted_id}"}


def main():
    policy_id = os.getenv("POLICY_ID")
    
    if policy_id is None:
        print("No policy id provided")

    print("Fetching assets for policy id: ", policy_id)

    data = get_policy_assets({"policy_id": policy_id })
    print(data)
    for f in data["data"]:
        asset = get_asset_data(f)
        print(asset)
        ret = save_policy_assets_db(asset)
        print(ret)


if __name__ == "__main__" :
    main()
