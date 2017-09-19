# Readable

An app that allows you to post content & comments, vote on them, edit and delete them.

## Installation

To run this app, you need to have two servers running at the the same time.

- The back-end API server
- React development server

First, download the repo and unzip it.

**To run the back-end API server:**

Open a terminal, ```cd``` into the root directory of this project and run the following command
```sh
cd back-end && npm install && node server
```

**To run the React development server:**

Open a new terminal (without closing the previous one), ```cd``` into the root directory of this project and run the following command
```sh
cd front-end && npm install && npm start
```

## Usage

There are four main views in this app.
- Home view (or) ```/```
- Category view (or) ```/:category```
- Post view (or) ```/:category/:id```
- Create/Edit view (or) ```/new/post``` (or) ```/edit/post/:id```

### The ```/``` view

The home view displays

- all of the posts ordered by voteScore by default.
- a list of categories which links to the category view for that category.
- a control for changing the sort method for the list: order by voteScore and order by timestamp.
- a control for adding a new post.

### The ```/:category``` view

The category view is identical to the home view, but filtered to only include posts with the selected category.

### The ```/:category/:id``` view

The post view displays

- the details of a post, including: title, body, author, timestamp (in user readable format), and vote score.
- all of the comments for that post, ordered by voteScore by default.
- a control for reordering comments by voteScore or by timestamp.
- links to edit or delete the post.
- a form to add a new comment.
- links to edit or delete the comments for that post.

### The ```/new/post``` or ```/edit/post/:id``` view

Both the ```new``` view and the ```edit``` view displays a form to create a new post or to edit an existing post.

In the edit view, existing data for the post to be edited are pre-populated in the form.

___

This project is a part of the [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) syllabus.