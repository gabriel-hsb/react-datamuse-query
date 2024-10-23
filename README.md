# Datamuse API Word-Finding Project

This project is a React-based word-finding app that uses the [Datamuse API](https://www.datamuse.com/api/). The API takes a word as input and returns related words based on different criteria such as similar meaning, sound, or spelling.

## Project Overview

The main goal of this project was to practice my React skills and implement URL Search Params using React Router. The state of the component is not only stored with React's `useState` hook, but also reflected in the URL. This allows users to easily share their searches by simply sharing the URL.

## Features

- **Search for related words**: Using the Datamuse API, users can search for words that sound alike, have similar meanings, or are spelled similarly.
- **State in URL**: The search parameters are stored in the URL, making it possible to share searches with others.
- **Responsive design**: The app is styled with Tailwind CSS to ensure responsiveness across different screen sizes.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **React Router DOM**: For managing the URL and route parameters.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Datamuse API**: The word-finding query engine.

## Live Demo

You can view and test the project on Vercel: [Datamuse Query App](https://react-datamuse-query.vercel.app/?option=ml&word=brazil).
