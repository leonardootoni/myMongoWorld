const mongoose = require("mongoose");

// Mocha hook
before(done => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

// Mocha hook
beforeEach(done => {
  // drop all documents inside a collection
  const { users, comments, blogposts } = mongoose.connection.collections;
  // console.log(mongoose.connection.collections);
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });

  // await comments.drop();
  // await blogPosts.drop();
  // done();
  // mongoose.connection.collections.users.drop(() => {
  //   // Read to run the next test!
  //   done();
  // });
});
