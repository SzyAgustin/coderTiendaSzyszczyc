import { db } from "./Firebase";
import { collection, doc, query, where, Timestamp } from "firebase/firestore";

export const getOrderList = () => {
    return collection(db, "Orders");
  }