//class for global constants
export class AppConfig {
  public static readonly currencies = ["EUR", "USD", "GBP"];
  public static readonly currenciesList = [
    {
      "code": "USD",
      "icon": "fa fa-dollar-sign",
      "sign": "$",
      "isActive": false
    },
    {
      "code": "EUR",
      "icon": "fa fa-euro-sign",
      "sign": "€",
      "isActive": true
    },
    {
      "code": "GBP",
      "icon": "fa fa-pound-sign",
      "sign": "£",
      "isActive": false
    }
  ];
  public static getSavedSearchEndpoint(){
    return `/api/user/${localStorage.getItem("userId")}/search`;
  }
  public static getFlag(key: string) :string {
    switch (key) {
      case "FR": return "assets/flags/france.svg";

      case "DE": return "assets/flags/germany.svg";

      case "ES": return "assets/flags/spain.svg";

      case "IT": return "assets/flags/italy.svg";

      case "GB": return "assets/flags/united-kingdom.svg";

      default: return "assets/flags/united-states-of-america.svg";

    }
  }
}