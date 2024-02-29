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
  locid: string[];
  pictureUrl: string;
  itemName: string;
  title: string;
  subtitle: string;
  itemDescription: string;
  storeName: string[];
  city: string[];
  district: string[];
  address: string[];
}
export interface Itemdb {
  id: string;
  locid: string;
  pictureUrl: string;
  itemName: string;
  title: string;
  subtitle: string;
  itemDescription: string;
  storeName: string;
  city: string;
  district: string;
  address: string;
}
export interface absList {
  id: string;
  pictureUrl: string;
  title: string;
  subtitle: string;
  Description: string;
}
