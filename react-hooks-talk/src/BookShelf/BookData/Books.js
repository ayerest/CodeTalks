class Book {
  constructor(selfLink, authors, title, image) {
    this.selfLink = selfLink;
    this.volumeInfo = {authors: authors, title: title, imageLinks: {thumbnail: image} }
    // this.authors = authors;
    // this.title = title;
    // this.image = image;
  }
}

const book1 = new Book(
  "https://www.googleapis.com/books/v1/volumes/J0tIAgAAQBAJ",
  ["N.K. Jemisin"],
  "The Fifth Season",
  "https://books.google.com/books/content?id=J0tIAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71sPUqf8QcNMf1Ch32BJj5tYX5keArtBzj6bVQgygZmnBkc01gMAtvYgt5YsPgM33yzd1UAVuASZf9Jwy75ZBRYaILpJTOAMLR-LTPw6CHsO1ufinDCVtLcuFYrZ_5lWN_Dug7o&source=gbs_api"
);

const book2 = new Book(
  "https://www.googleapis.com/books/v1/volumes/wRxoDgAAQBAJ",
  ["Fonda Lee"],
  "Jade City",
  "https://books.google.com/books/content?id=wRxoDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72GzTwOwXXAKYr_aK_Qb_oinzSR1VCAM-xxtEIXIJfrM4SV82pl4rmA73sFM-SZD_fhRcVp3HJHX2SqZxlwqRl2klI72xut5_-we56Fq6nzJghac_-QVOg9xjkRc0OBMJ9ppa42&source=gbs_api"
);

const book3 = new Book(
  "https://www.googleapis.com/books/v1/volumes/xtSILnI_yeAC",
  ["Django Wexler"],
  "The Thousand Names",
  "https://books.google.com/books/content?id=xtSILnI_yeAC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72xlXar7ws820Szvm_wSp0o5r0JBnFXsFfjpUSrdXngdYNVePZhAz4uzn8knqlwG4ZqeN8Oe1NRaGYkEG7KFtNgkw5CfIhv6UKdVuJWlkdVvC5oYfvKrqfQVcLArFP8I9xuzrF_&source=gbs_api"
);

const book4 = new Book(
  "https://www.googleapis.com/books/v1/volumes/J45s2d8tAggC", 
  [
    "Raymond Chandler"
  ],
  "The Big Sleep",
  "https://books.google.com/books/content?id=J45s2d8tAggC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70uEmZ2Wb1QNvC0hFSR8vsmya6nC8Ye_WYMnQjPSkuSitp5UylIit1EFOigMs1Ov40ajNFpKzKy5yqecfvwJCJVyaD-RIHSxlEtIYRnLRak-1dSVK5_YXECFcXi2NrtPolAcA24&source=gbs_api"
);

const book5 = new Book(
  "https://www.googleapis.com/books/v1/volumes/1yMMAAAACAAJ",
  ["Sue Grafton"],
  "Three Complete Novels",
  "https://books.google.com/books/content?id=1yMMAAAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71W1NO4TjnQgiePyWcFQ57ZHkIwCwda-bqsASU8kc6BRN3NZw_Hx6TkmsxciYVkhjNB7g_cRUdQumkuHRhgzjZ6twKBjojUTF8BvF2bFJGgaA-SsptQNePY9H0jDwLN9dc5dKie&source=gbs_api"
);

const book6 = new Book(
  "https://www.googleapis.com/books/v1/volumes/71zKBwAAQBAJ",
  ["David Goodis"],
  "Dark Passage",
  "https://books.google.com/books/content?id=71zKBwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73g0lHq-KAfOfijcJmpDPxa39RL_OqdS5UrtBHBUnuHbeYm0Lbvp19ydJig_NBbD6FodP0XXto3FSXO0FukaPP7EOgzW-AH_qqryVO82qaC2kHZbqf0uJcMRBaOR2aDg5ZHb15u&source=gbs_api"
);

export const bookshelves = [{Fantasy: [book1, book2, book3]}, {Mystery: [book4, book5, book6]}];