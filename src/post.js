const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
  title: String
});

module.exports = PostSchema;
