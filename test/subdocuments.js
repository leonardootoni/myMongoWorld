const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("Can create a subdocument", done => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });
    joe.save().then(() => {
      User.findOne({ name: "Joe" }).then(user => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
    });
  });

  it("Can add new subdocuments to an existing record", done => {
    const joe = new User({ name: "Joe", posts: [] });
    joe
      .save()
      .then(user => {
        user.posts.push({ title: "MyPOsttitle" });
        return user.save();
      })
      .then(() => {
        User.findOne({ name: "Joe" }).then(user => {
          assert(
            user.posts.length === 1 && user.posts[0].title === "MyPOsttitle"
          );
          done();
        });
      });
  });

  it("Can remove existig subdocuments from an record", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "MyNewTitle" }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
