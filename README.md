# insta-story
 
# Story Feature App

This project implements a simple "Story" feature, inspired by platforms like Instagram and WhatsApp. Users can upload short, temporary content (stories) that disappears after 24 hours. It provides a user-friendly interface to add, view, and manage stories directly from the browser.

---

## Features

- **Upload Stories**: Users can upload an image as a story by clicking the "+" button.
- **Temporary Stories**: Stories are automatically removed after 24 hours.
- **Local Storage Management**: Stories are saved in the browser's local storage and are dynamically retrieved when the app is reopened.
- **Dynamic Story Viewer**: View stories in a modal with a clean and interactive interface.
- **Skeleton Loading**: Displays a loading animation while stories are fetched.
- **Dark Mode Support**: Switch between light and dark themes for better user experience.

---

## Demo

&#x20;

---

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) as your package manager.

### Steps to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/HadiDevLabx/insta-story
   cd insta-story
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open the app in your browser:

   ```
   http://localhost:3000
   ```

---

## Folder Structure

```plaintext
src/
├── components/           # UI components like StoryItem, StoryViewer, etc.
├── hooks/                # Custom React hooks (e.g., useImageUpload)
├── utils/                # Helper functions for stories (e.g., storyHelpers)
├── types/                # TypeScript type definitions (e.g., Story type)
├── App.tsx               # Main app component
├── index.tsx             # Entry point of the React app
```

---

## Key Functionality

### Add a Story

- **How it works**:
  - Users click the "Plus" button to upload an image.
  - The image is converted to a Base64 string and stored in `localStorage` with a timestamp.

### View Stories

- Stories are displayed as a scrollable horizontal list.
- Clicking on a story opens it in a modal viewer.

### Auto Expiration

- A cleanup mechanism runs every minute to remove expired stories from `localStorage`.

### Dark Mode

- A toggle button allows users to switch between light and dark themes dynamically.

---

## Technologies Used

- **React**: Frontend library for building the UI.
- **TypeScript**: For static typing and better code maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **LocalStorage**: Browser storage for saving stories temporarily.

---
 
 