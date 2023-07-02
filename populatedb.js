#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Comment = require("./models/comment");
const Post = require("./models/post");
const User = require("./models/user");

const comments = [];
const posts = [];
const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createPosts();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function commentCreate(index, body, dateAdded, user, post) {
  const comment = new Comment({ body, dateAdded, user, post });
  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${body}`);
}

async function postCreate(index, title, body, dateAdded, user, comments) {
  const post = new Post({ title, body, dateAdded, user, comments });

  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function userCreate(index, username, password) {
  const user = new User({ username, password });

  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "bob_coder", "password123"),
    userCreate(1, "gazza1", "password123"),
  ]);
}

async function createComments() {
  console.log("Adding comments");
  await Promise.all([
    commentCreate(0, "Great post!", randomDate(), users[0], posts[0]),
    commentCreate(
      1,
      "I don't like your opinion",
      randomDate(),
      users[0],
      posts[0]
    ),
    commentCreate(2, "Blah blah blah :)", randomDate(), users[1], posts[1]),
    commentCreate(
      3,
      "Chicken flew over the barn!",
      randomDate(),
      users[1],
      posts[1]
    ),
  ]);
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(
      0,
      "AIcons",
      "an AI-powered icon generator that creates unique variations of icons based on user specifications, saving time and eliminating the need for expensive design services.",
      randomDate(),
      users[1],
      [comments[0], comments[1]]
    ),
    postCreate(
      1,
      "CVSimple",
      "Streamlines resume creation by automatically generating a formatted and professional resume as the user enters their information into a form.",
      randomDate(),
      users[0],
      [comments[2], comments[3]]
    ),
  ]);
}

function randomDate() {
  const start = new Date(2012, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
