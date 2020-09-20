class Book {
  constructor(authors, title, image) {
    this.authors = authors;
    this.title = title;
    this.image = image;
  }
}

const book1 = new Book(
  ["N.K. Jemisin"],
  "The Fifth Season",
  "https://books.google.com/books/content?id=J0tIAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71sPUqf8QcNMf1Ch32BJj5tYX5keArtBzj6bVQgygZmnBkc01gMAtvYgt5YsPgM33yzd1UAVuASZf9Jwy75ZBRYaILpJTOAMLR-LTPw6CHsO1ufinDCVtLcuFYrZ_5lWN_Dug7o&source=gbs_api"
);

const books = [book1];

export default books;
