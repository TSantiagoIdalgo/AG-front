import { FilterObject } from "../interfaces/catalogue.interface";

export const getOrdersTypes = (): FilterObject[] => [
  {
    value: "orderByRecommendation",
    visualString: "Recomendados"
  },
  {
    value: "orderbyWishList",
    visualString: "Mas deseados"
  },
  {
    value: "orderByCheckoutCount",
    visualString: "Mas vendidos"
  },
  {
    value: "orderByCreatedAt",
    visualString: "Ultimos lanzamientos"
  },
  {
    value: "orderByPrice",
    visualString: "Menor precio"
  }
];