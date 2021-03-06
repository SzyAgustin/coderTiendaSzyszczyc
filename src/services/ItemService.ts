// const producto1 = { id: 1, title: 'Bicicleta con Rueditas Azul Nueva', pictureUrl: 'https://picsum.photos/200/300', description: 'my prod 1', price: 110, stock: 5, category: 'vehiculo' }
// const producto2 = { id: 2, title: 'PlayStation 5 con cuatro juegos a eleccion', pictureUrl: 'https://picsum.photos/210/300', description: 'my prod 2', price: 120, stock: 10, category: 'electronica' }
// const producto3 = { id: 3, title: 'XBox con 2 joystiks originales', pictureUrl: 'https://picsum.photos/220/300', description: 'my prod 3', price: 130, stock: 2, category: 'electronica' }
// const producto4 = { id: 4, title: 'Moto 10000km Azul Nueva', pictureUrl: 'https://picsum.photos/230/300', description: 'my prod 4', price: 140, stock: 20, category: 'vehiculo' }
// const producto5 = { id: 5, title: 'XBox imperdible', pictureUrl: 'https://picsum.photos/240/300', description: 'my prod 5', price: 150, stock: 40, category: 'electronica' }
// const producto6 = { id: 6, title: 'Como ganar amigos e influir en las personas', pictureUrl: 'https://picsum.photos/250/300', description: 'my prod 6', price: 160, stock: 25, category: 'libro' }
// const producto7 = { id: 7, title: 'Bicicleta Mountain Bike Roja', pictureUrl: 'https://picsum.photos/260/300', description: 'my prod 7', price: 170, stock: 22, category: 'vehiculo' }
// const producto8 = { id: 8, title: 'XBox imperdible', pictureUrl: 'https://picsum.photos/270/300', description: 'my prod 8', price: 180, stock: 3, category: 'electronica' }
// const producto9 = { id: 9, title: 'Padre rico padre pobre', pictureUrl: 'https://picsum.photos/280/300', description: 'my prod 9', price: 180, stock: 3, category: 'libro' }

// const arr = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];

import { db } from "./Firebase";
import { collection, doc, query, where, Timestamp, writeBatch, addDoc } from "firebase/firestore";
import { IItemCart } from "../context/CartContext";

export interface IBuyer {
  name: string,
  phone: number,
  email: string
}

export interface IOrderedItem {
  id: string,
  title: string,
  price: number,
  amount: number
}

export interface IOrder {
  buyer: IBuyer,
  items: IOrderedItem[],
  date: Timestamp,
  total: number
}

export interface ILocalItem {
  title: string;
  pictureUrl: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface IItem  extends ILocalItem {
  id: string;
}

export const getItems = (category: string | undefined) => {
  return category ? query(collection(db, "ItemList"), where("category", "==", category), where("stock", "!=", 0)) : query(collection(db, "ItemList"), where("stock", "!=", 0));
}

export const getItemList = () => {
  return collection(db, "ItemList");
}

export const addItem = (item: ILocalItem) => {
  const itemList = getItemList();
  return addDoc(itemList, item);
}

export const getItem = (itemId: string) => {
  return doc(db, "ItemList", itemId);
}

export const updateStock = async (cartItems: IItemCart[]) => {
  const batch = writeBatch(db);
  cartItems.forEach((item) => {
    batch.update(
      getItem(item.id),
      { 'stock': item.stock - item.amount }
    );
  });
  await batch.commit();
};