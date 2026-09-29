# AuraWave - Modern Web Music Player

**Internship Task 3: Music Player**  
Developed with clean HTML5, CSS3, and modern Vanilla JavaScript.

---

## 1. Project Overview

**AuraWave** is a modern, responsive, and elegant web-based music streaming and player application. It provides an intuitive, high-performance music listening experience with album artwork, interactive playlists, dynamic search, category filtering, seekable progress bars, volume controls, keyboard navigation, and seamless continuous playback.

---

## 2. Project Purpose

The purpose of this project is to build an interactive, beginner-friendly, and maintainable web application using **pure Vanilla JavaScript** without relying on any external heavy frameworks like React, Vue, or Angular. It demonstrates essential frontend engineering skills:
- DOM manipulation and dynamic element rendering.
- State management and media event handling with HTML5 `<audio>`.
- Responsive layouts with CSS Grid and Flexbox.
- User experience design with smooth transitions and subtle animations.

---

## 3. Technologies Used

- **HTML5**: Semantic document structure (`<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<footer>`, `<audio>`).
- **CSS3**: Modern layouts using CSS Grid, CSS Flexbox, custom range sliders, animations, and CSS custom variables (`:root`).
- **Vanilla JavaScript (ES6)**: Clean, beginner-friendly JavaScript using arrays, objects, event listeners, and standard DOM methods.
- **Font Awesome 6 (CDN)**: Lightweight vector icons for player buttons, search, and volume controls.
- **Google Fonts (Plus Jakarta Sans)**: Modern, highly readable typography.

---

## 4. Key Features

1. **Audio Playback**: Full Play, Pause, Previous, and Next controls.
2. **Looping Navigation**: Seamlessly loops from the last song to the first song, and from the first to the last.
3. **Interactive Seekbar**: Smooth progress bar that updates in real-time with click-and-drag seeking.
4. **Time Indicators**: Live current playback time and total duration formatted as `m:ss`.
5. **Volume & Mute**: Smooth volume slider with memory-enabled mute/unmute toggle.
6. **Dynamic Search**: Real-time filtering by song title, artist name, and music category.
7. **Category Filters**: Instant filtering across genres (*All, Pop, Rock, Hip Hop, Classical, Relax, Electronic*).
8. **Interactive Playlist**: Click any track in the queue or library cards to load and play immediately.
9. **Active Track Highlight**: Visual indicator and glowing highlight on currently playing track.
10. **Auto-Play Next**: Automatically advances to the next track when the current song finishes.
11. **Shuffle & Repeat**: Built-in shuffle mode and single-song repeat toggle.
12. **Favorites / Like**: Interactive heart toggle to save favorite tracks.
13. **Keyboard Shortcuts**:
    - **Spacebar**: Toggle Play / Pause.
    - **Right Arrow ($\rightarrow$)**: Next Song.
    - **Left Arrow ($\leftarrow$)**: Previous Song.
14. **Error Handling**: Friendly notification popup if an audio file fails to load.
15. **Fully Responsive**: Adapts smoothly to 4K displays, laptops, tablets, and small smartphones (320px+).

---

## 5. Folder Structure

```text
Task-3-Music-Player/
│
├── index.html          # Main HTML5 structure and layout
├── css/
│   └── style.css       # Complete styling, CSS variables & media queries
├── js/
│   └── script.js       # Audio logic, playlist, search, and event handling
├── assets/
│   ├── images/         # Album cover images (song1.jpg to song8.jpg)
│   └── music/          # Audio tracks (song1.mp3 to song8.mp3)
└── README.md           # Documentation, guide, and instructions
```

---

## 6. How to Add a New Song

Adding a new song takes only two simple steps:

### Step 1: Add your files to the `assets` folders
- Place your audio file into `assets/music/` (e.g., `song9.mp3`).
- Place your album cover into `assets/images/` (e.g., `song9.jpg`).

### Step 2: Open `js/script.js` and add an object to the `songs` array
Open `js/script.js` and scroll to the `songs` array at the top. Add your new track:

```javascript
{
    id: 9,
    title: "New Song Title",
    artist: "Artist Name",
    category: "Pop", // Must match one of the categories or add a new one
    image: "assets/images/song9.jpg",
    audio: "assets/music/song9.mp3"
}
```

Save the file and refresh your browser. The new song will automatically appear in the library, playlist queue, and search index!

---

## 7. How to Add a New Category

1. Open `js/script.js`.
2. Look for the `categories` array near line 65:
   ```javascript
   const categories = ["All", "Pop", "Rock", "Hip Hop", "Classical", "Relax", "Electronic"];
   ```
3. Add your category to the list, for example `"Jazz"`:
   ```javascript
   const categories = ["All", "Pop", "Rock", "Hip Hop", "Classical", "Relax", "Electronic", "Jazz"];
   ```
4. Assign `"Jazz"` to any song in your `songs` array. A new category filter button will automatically render in the navigation bar.

---

## 8. How to Change Colors & Theme

All colors and theme properties are defined as CSS variables at the very top of `css/style.css` inside the `:root` block:

```css
:root {
    --primary-color: #6366f1;          /* Change to your favorite brand color */
    --primary-hover: #4f46e5;          /* Hover color for buttons */
    --secondary-color: #ec4899;        /* Accent color for likes and badges */
    --background-color: #0b0f19;       /* Main page background */
    --surface-color: #111827;          /* Cards and containers background */
    --card-color: #161f30;             /* Song cards background */
    --text-color: #f8fafc;             /* Primary text color */
    --muted-text-color: #94a3b8;       /* Subtitle and duration text */
}
```

Simply change these hex color codes to instantly transform the entire application theme (e.g., to an emerald green, neon cyan, or sunset orange theme).

---

## 9. How to Run the Project

1. Clone or download this project folder onto your computer.
2. Open the folder `Task-3-Music-Player` (or `Task-3-Music-Playe-Arch-Technologies`).
3. Double-click `index.html` to open it directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari).
4. Alternatively, open the folder in **VS Code** and click **Go Live** with the **Live Server** extension for local live-reload testing.

---

## 10. Code Style & Roman English Comments

As requested, all comments in `script.js`, `style.css`, and `index.html` are written in friendly **Roman English / Roman Urdu** (e.g., `// Ya current song ko play karta hai`, `// Current song ka progress update karna`). This ensures that students and beginners learning JavaScript can easily follow every step of the codebase.

---

## 11. Limitations & Notes

- **Browser Autoplay Policies**: Modern browsers (Chrome, Edge, Safari) require user interaction (e.g. clicking "Play" or selecting a song) before audio can play with sound. This is standard browser security behavior.
- **Audio File Formats**: HTML5 `<audio>` natively supports `.mp3`, `.wav`, `.ogg`, and `.m4a`. For best cross-browser compatibility, standard `.mp3` format is recommended.
