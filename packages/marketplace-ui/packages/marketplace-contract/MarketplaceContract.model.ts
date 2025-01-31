export interface MarketplaceContract {
  list: (asset: string, price: number) => Promise<string>
  buy: (asset: string) => Promise<string>
  update: (asset: string, price: number) => Promise<string>
  cancel: (asset: string) => Promise<string>
}
