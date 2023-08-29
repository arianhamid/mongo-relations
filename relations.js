const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/relations")
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

const Book = mongoose.model(
  "book",
  new mongoose.Schema({
    title: String,
    page_count: Number,
  })
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  })
);

async function createUser(first_name, last_name, book_id) {
  const user = new User({
    first_name,
    last_name,
    book: book_id,
  });
  const result = await user.save();
  console.log(result);
}

async function createBook(title, page_count) {
  const book = new Book({
    title,
    page_count,
  });
  const result = await book.save();
  console.log(result);
}

User.find()
  .populate("book")
  .lean(true)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error.message);
  });

// User.findById("64edc4cda07e4b1f3d53fc17")
//   .populate("book")
//   .then((user) => console.log(user))
//   .catch((err) => console.log(err.message));

// createBook("Harry Potter", 323);
// createUser("John", "Smith", "64edf4256d449e23fe099bfc");
