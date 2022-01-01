const producto1 = { id: 1, title: 'prod1', pictureUrl: 'https://picsum.photos/200/300', description: 'my prod 1', price: 110, stock: 5 }
const producto2 = { id: 2, title: 'prod2', pictureUrl: 'https://picsum.photos/210/300', description: 'my prod 2', price: 120, stock: 10 }
const producto3 = { id: 3, title: 'prod3', pictureUrl: 'https://picsum.photos/220/300', description: 'my prod 3', price: 130, stock: 2 }
const producto4 = { id: 4, title: 'prod4', pictureUrl: 'https://picsum.photos/230/300', description: 'my prod 4', price: 140, stock: 20 }
const producto5 = { id: 5, title: 'prod5', pictureUrl: 'https://picsum.photos/240/300', description: 'my prod 5', price: 150, stock: 40 }
const producto6 = { id: 6, title: 'prod6', pictureUrl: 'https://picsum.photos/250/300', description: 'my prod 6', price: 160, stock: 25 }
const producto7 = { id: 7, title: 'prod7', pictureUrl: 'https://picsum.photos/260/300', description: 'my prod 7', price: 170, stock: 22 }
const producto8 = { id: 8, title: 'prod8', pictureUrl: 'https://picsum.photos/270/300', description: 'my prod 8', price: 180, stock: 3 }
const producto9 = { id: 9, title: 'prod9', pictureUrl: 'https://picsum.photos/280/300', description: 'my prod 9', price: 180, stock: 3 }

const arr = [producto1, producto2, producto3,  producto4, producto5, producto6, producto7, producto8, producto9];

export interface IItem {
  id: number;
  title: string;
  pictureUrl: string;
  description: string;
  price: number;
  stock: number;
}

const asyncMock = new Promise<IItem[]>((resolve, reject) => {
  setTimeout(function () {
        resolve(arr);
    }, 2000);
})

export default asyncMock;