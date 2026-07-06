# PocketSafe            

PocketSafe is a smart savings and expense-splitting application built with modern web technologies. It enables users to track personal expenses, set savings goals, and manage shared expenses effortlessly.

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication (Email/Password & Google Sign-In).
- **Dashboard Overview**: Real-time summary of total balance, money saved, and expenses.
- **Transaction Management**: Add, edit, and delete income and expense transactions.
- **Split Tracker**: Easily split expenses with friends and track who owes whom.
- **Savings Goals**: Set and monitor progress towards personal savings targets.
- **PWA Support**: Installable Progressive Web App with offline capabilities.
- **Modern UI**: Clean, responsive interface with dark mode support and smooth animations.

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Backend/Database**: Firebase (Authentication & Firestore)
- **Icons**: Lucide React via [Lui](https://lui.mcrow.dev)
- **Styling**: CSS Custom Properties, Flexbox, Grid

## Getting Started

### Prerequisites

- A Firebase Project (created via [Firebase Console](https://console.firebase.google.com))
- Firebase SDK Configuration

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Debt-Tracker
   ```

2. Configure Firebase:
   - Create a Firebase project.
   - Add a Web app to your Firebase project.
   - Copy your Firebase configuration object.
   - Update the `firebaseConfig` variable in `script.js` with your credentials.

3. Run the app locally:
   Open `index.html` in your web browser. For testing Push Notifications and Service Workers, it's recommended to run the app on a local server (e.g., using `live-server` or Python's `http.server`).
   ```bash
   npx live-server
   ```

### Deployment

The application is deployed as a Progressive Web App (PWA). To deploy:

1. Build the project (if necessary).
2. Upload the files to any static hosting provider (e.g., Firebase Hosting, Netlify, GitHub Pages).
3. Ensure `manifest.json` and `service-worker.js` are accessible at the root level.
