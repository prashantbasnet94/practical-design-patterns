# Level 5, Project 1: The Callback Hell

## The Scenario

You are working on a social media analytics dashboard. A key feature is to display a user's profile, their latest post, and the comments on that post, all in one view.

The data comes from different asynchronous services, each taking a callback function to return data.

## The Problem

The code to fetch this data, located in `src/main.ts`, has devolved into "Callback Hell" (also known as the Pyramid of Doom). The nested callbacks make the code extremely difficult to read, debug, and maintain. Error handling is particularly messy, with error checks needed at each level of the pyramid.

This style of code is fragile and a common source of bugs in asynchronous applications.

## Your Goal

Your task is to refactor the data fetching logic in `src/main.ts` and `src/data-services.ts` to use modern asynchronous patterns. You should use **Promises and async/await** to flatten the pyramid and make the code clean, readable, and robust.

**Key Requirements:**

1.  Modify the functions in `data-services.ts` to return Promises instead of accepting callbacks.
2.  Rewrite the logic in `main.ts` using `async/await` to consume the new Promise-based services.
3.  Your new implementation should be functionally identical to the original but significantly easier to read and maintain.
4.  Implement proper error handling for the entire asynchronous flow using a single `try...catch` block.