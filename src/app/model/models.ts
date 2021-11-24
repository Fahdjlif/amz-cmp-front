
export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface BuyingInfo {
    id: number;
    price: string;
    amount: number;
    buyUrl: string;
    flag: string;

}
export interface Product {
    id: string;
    asin: string;
    productName: string;
    favorite: boolean;
    images: string[];
    buyingInfo: BuyingInfo[];
  
}
export interface SearchFilter {
    keyword: string;
    availability: string;
    condition: string;
    currencyOfPreference: string;
    primaryCountry:string;
    localeCode:string;
    sortBy:string;
    deliveryFlags: string[];
    itemCount: number;
    itemPage: number;
    maxPrice: number;
    minPrice: number;
    minReviewsRating: number;
    showPricesFromList: string[];
}
export interface SearchResult {
    resultCount: number;
    itemsCount: number;
    hasMore: boolean;
    products: Product[];
}
export interface Currency {
    code: string;
    icon: string;
    sign: string;
    isActive: boolean;
}
export interface AmzAccount {
    id: number;
    localeCode: string;
    host: string;
    region: string;
    tag: string;
    marketPlace: string;
    active: boolean;
    comingSoon:boolean;
}
export interface SavedSearch{
    id:number;
    name:string;
    value:string;
}