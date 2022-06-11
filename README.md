# Working with the DOM

Today we're going to be practicing DOM manipulation and event handling.

## Learning Objectives

- DOM Manipulation
- Event Handling

## Resources

This [DOM Gist](https://gist.github.com/thegitfather/9c9f1a927cd57df14a59c268f118ce86) has a helpful section on DOM querying and creation

## Setup

You're provided a basic website with included `index.html`, `style.css`, and `script.js`. All of your work will go in `script.js` - you shouldn't have to edit `index.html` or `style.css`.

_*Please create individual functions for each solution. Don't forget to **call** the function once you're finished.*_

## Completion

Give it your best shot!

## Accessing DOM Elements (Querying)

Let's start with some simple query selecting.

#### Part 1

DOM's personal website title is a bit wordy. Write a JavaScript statement that selects the `#main-title` ID element. Remember there are a couple of ways to query **id**. Change the **text** of the title to something shorter.

#### Part 2

Select the `body` and change the background-color to a new color of your choice.

#### Part 3

Select **DOM's Favorite Things** list and remove the last list item.

#### Part 4

Select all `.special-title` class elements and change their `font-size` to `2rem`. Remember you might have to iterate through the list of elements

#### Part 5

Turns out DOM never raced in **Chicago**. Access the **Past Races** list and remove **Chicago**.

## Creating New DOM Elements

#### Part 6

Let's add to DOM's **Past Races** list. Create a new `<li>` element, change the new `<li>` text to the name of a city, and append it to the **Past Races** list.

#### Part 7

Create a new `.blog-post` corresponding to the new city added in **Part 6**. You will have to create a new `<div>` with class of `.blog-post`, a new `<h1>` with text, and a new `<p>` with some text. Make the new element consistent with the other posts. Think about what order you want to create the elements, and what order you want to append them in.

