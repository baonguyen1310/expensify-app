// const book = {
//    title: 'React',
//    author : 'Andrew',
//    publisher: {
//        name : 'Udemy'
//    }
// };

// const { name : publisherName = 'Bao'} = book.publisher;

// console.log(`${publisherName}`);
const items = ['Hot coffee','$2.50','$3.50','$4.50'];

const[itemName,,mediumPrice] = items;

console.log(`Your order is : ${itemName} with price ${mediumPrice}`)