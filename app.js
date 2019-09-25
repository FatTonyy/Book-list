//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

// Add Book To list
UI.prototype.addbookToList = function(book) {
  const list = document.getElementById("book-list");
  //create TR Element
  const row = document.createElement("tr");
  // Insert Cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

  list.appendChild(row);
};

//creating prototype method for SHOW ALERT
UI.prototype.showAlert = function(message, className) {
  //create div
  const div = document.createElement("div");
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector(".container");
  //Get Form
  const form = document.querySelector("#book-form");
  //Insert alert
  container.insertBefore(div, form);

  //Timeout After 3 seconds
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

//delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Creating Eventlisteners for Add Book
document.getElementById("book-form").addEventListener("submit", function(e) {
  //Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate Book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate UI
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to list
    ui.addbookToList(book);

    // show success
    ui.showAlert("Book Added", "success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for Delete
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instantiate the UI
  const ui = new UI();
  //delete book
  ui.deleteBook(e.target);

  //show message when deleted
  ui.showAlert("book removed!", "success");

  e.preventDefault();
});
