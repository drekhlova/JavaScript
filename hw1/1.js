// Задание 1
// Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// const musicCollection = {
//   title: "Название альбома",
//   artist: "Исполнитель",
//   year: "Год выпуска",
// };

// Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

const musicCollection = [
  { title: "Minutes to Midnight", artist: "Linkin Park", year: 2007 },
  { title: "The open doors", artist: "Evanescence", year: 2006 },
  { title: "Let go", artist: "Avril Lavigne", year: 2002 },
];

musicCollection[Symbol.iterator] = function () {
  return {
    current: 0,
    to: this.length,
    next() {
      return this.current < this.to
        ? { done: false, value: musicCollection[this.current++] }
        : { done: true };
    },
  };
};

for (let album of musicCollection) {
  console.log(
    `Альбом: ${album.title}, исполнитель: ${album.artist} (${album.year})`
  );
}

// const musicCollection = {
//   albums: [
//     { title: "Minutes to Midnight", artist: "Linkin Park", year: 2007 },
//     { title: "The open doors", artist: "Evanescence", year: 2006 },
//     { title: "Let go", artist: "Avril Lavigne", year: 2002 },
//   ],
//   [Symbol.iterator]: function () {
//     let index = 0;
//     return {
//       next: () => {
//         if (index < this.albums.length) {
//           return { value: this.albums[index++], done: false };
//         } else {
//           return { done: true };
//         }
//       },
//     };
//   },
// };

// for (let album of musicCollection) {
//   console.log(
//     `Альбом: ${album.title}, исполнитель: ${album.artist} (${album.year})`
//   );
// }
