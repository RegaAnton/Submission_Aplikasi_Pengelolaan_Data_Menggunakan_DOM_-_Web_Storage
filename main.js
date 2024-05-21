let books = [];
if (localStorage.getItem("books")) {
  books = JSON.parse(localStorage.getItem("books"));
}

function renderBooks() {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  for (let book of books) {
    const bookElement = document.createElement("div");
    bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.year}</p>
            <button onclick="deleteBook(${book.id})">Hapus</button>
            <button onclick="toggleComplete(${book.id})">${
      book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"
    }</button>
        `;

    if (book.isComplete) {
      completeBookshelfList.append(bookElement);
    } else {
      incompleteBookshelfList.append(bookElement);
    }
  }
}

function addBook() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = Number(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const book = {
    id: Date.now(),
    title,
    author,
    year,
    isComplete,
  };

  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  renderBooks();
}

function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(books));

  renderBooks();
}

function toggleComplete(id) {
  const book = books.find((book) => book.id === id);
  book.isComplete = !book.isComplete;
  localStorage.setItem("books", JSON.stringify(books));

  renderBooks();
}

document
  .getElementById("inputBook")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

renderBooks();
