#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Blog = require('./models/blogModel');
const blogs = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createBlogs();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function blogCreate(index, title, description) {
  const blogdetail = {
    title: title,
    description: description,
  };

  const blog = new Blog(blogdetail);
  await blog.save();
  blogs[index] = blog;
  console.log(`Added blog: ${title}`);
}

async function createBlogs() {
  console.log('Adding Books');
  await Promise.all([
    blogCreate(
      0,
      'This the holiday season',
      'why dont we go holiday right now!?'
    ),
    blogCreate(
      1,
      'lorem ipsum lorem ipsum',
      'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.'
    ),
  ]);
}
