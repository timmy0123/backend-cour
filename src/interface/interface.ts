export interface ImageList {
  id: string;
  fileName: string;
  used: boolean;
}
export interface Imageurl {
  url: string;
  used: boolean;
}
export interface ItemList {
  id: string;
  pictureUrl: string;
  itemName: string;
  title: string;
  subtitle: string;
  itemDescription: string;
  city: string[];
  district: string[];
  address: string[];
}
export interface Itemdb {
  id: string;
  pictureUrl: string;
  itemName: string;
  title: string;
  subtitle: string;
  itemDescription: string;
  city: string;
  district: string;
  address: string;
}
