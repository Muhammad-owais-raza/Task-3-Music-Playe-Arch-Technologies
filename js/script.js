/* ==========================================================================
   AuraWave Music Player - JavaScript (script.js)
   ========================================================================== */

// ==========================================================================
// 1. Song Data (Songs List)
// ==========================================================================
// Ya tamam songs ka data array of objects mein store kiya gaya hai.
// Agar aap ko naya song add karna ho, to isi array ke aakhir mein naya object add karein:
// {
//     id: 9,
//     title: "Aap Ka Naya Song",
//     artist: "Artist Ka Naam",
//     category: "Pop",
//     image: "assets/images/song9.jpg",
//     audio: "assets/music/song9.mp3"
// }
const songs = [
    {
        id: 1,
        title: "Midnight City Lights",
        artist: "Nova Sky",
        category: "Pop",
        image: "assets/images/song1.jpg",
        audio: "assets/music/song1.mp3"
    },
    {
        id: 2,
        title: "Electric Horizon",
        artist: "Aetheric Beats",
        category: "Electronic",
        image: "assets/images/song2.jpg",
        audio: "assets/music/song2.mp3"
    },
    {
        id: 3,
        title: "Shadows in the Mist",
        artist: "Velvet Echoes",
        category: "Rock",
        image: "assets/images/song3.jpg",
        audio: "assets/music/song3.mp3"
    },
    {
        id: 4,
        title: "Urban Rhapsody",
        artist: "Cipher Flow",
        category: "Hip Hop",
        image: "assets/images/song4.jpg",
        audio: "assets/music/song4.mp3"
    },
    {
        id: 5,
        title: "Moonlight Sonata (Ambient)",
        artist: "Seraphina Vance",
        category: "Classical",
        image: "assets/images/song5.jpg",
        audio: "assets/music/song5.mp3"
    },
    {
        id: 6,
        title: "Breeze of Serenity",
        artist: "Zenith Flow",
        category: "Relax",
        image: "assets/images/song6.jpg",
        audio: "assets/music/song6.mp3"
    },
    {
        id: 7,
        title: "Neon Sunrise",
        artist: "Retro Wave",
        category: "Electronic",
        image: "assets/images/song7.jpg",
        audio: "assets/music/song7.mp3"
    },
    {
        id: 8,
        title: "Golden Memories",
        artist: "The Acoustic Dreamers",
        category: "Pop",
        image: "assets/images/song8.jpg",
        audio: "assets/music/song8.mp3"
    }
];

// Available categories ki list
// Yahan aap mazeed categories add kar saktay hain
const categories = ["All", "Pop", "Rock", "Hip Hop", "Classical", "Relax", "Electronic"];

// ==========================================================================
// 2. Global State Variables
// ==========================================================================
// Ya variables player ki current halat (state) track kartay hain
let currentSongIndex = 0;           // Current chalne walay song ka index
let isPlaying = false;              // Song play ho raha hai ya nahi (true / false)
let isMuted = false;                // Sound mute hai ya nahi
let previousVolume = 0.8;           // Mute karne se pehle wala volume save karne ke liye
let currentCategory = "All";        // Konsi category selected hai
let isShuffle = false;              // Shuffle mode on hai ya off
let isRepeat = false;               // Single song repeat mode on hai ya off
let favoriteSongIds = [];           // User ke favorite songs ki IDs

// ==========================================================================
// 3. DOM Elements Selection
// ==========================================================================
// HTML ke tamaam zaroori elements ko JavaScript mein select kar rahay hain

// Audio Element
const audioPlayer = document.getElementById("audioPlayer");

// Bottom Player Bar Elements
const playerThumb = document.getElementById("playerThumb");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const playerHeartBtn = document.getElementById("playerHeartBtn");
const playerControlsBar = document.querySelector(".player-controls-bar");

// Progress Bar Elements
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");

// Volume Elements
const volumeBtn = document.getElementById("volumeBtn");
const volumeIcon = document.getElementById("volumeIcon");
const volumeSlider = document.getElementById("volumeSlider");
const volumeFill = document.getElementById("volumeFill");
const volumePercent = document.getElementById("volumePercent");

// Hero Spotlight Elements
const heroBanner = document.getElementById("heroBanner");
const heroArtwork = document.getElementById("heroArtwork");
const heroBackdrop = document.getElementById("heroBackdrop");
const heroTitle = document.getElementById("heroTitle");
const heroArtist = document.getElementById("heroArtist");
const heroCategory = document.getElementById("heroCategory");
const heroPlayBtn = document.getElementById("heroPlayBtn");
const heroFavBtn = document.getElementById("heroFavBtn");

// Grid & Playlist Containers
const songsGrid = document.getElementById("songsGrid");
const playlistList = document.getElementById("playlistList");
const categoryContainer = document.getElementById("categoryContainer");
const emptyState = document.getElementById("emptyState");
const resetFilterBtn = document.getElementById("resetFilterBtn");
const playlistShuffleBtn = document.getElementById("playlistShuffleBtn");
const playlistClearFilterBtn = document.getElementById("playlistClearFilterBtn");

// Search & Stats Elements
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const resultsCount = document.getElementById("resultsCount");
const playlistCount = document.getElementById("playlistCount");
const libraryCountText = document.getElementById("libraryCountText");
const libraryHeading = document.getElementById("libraryHeading");

// Toast Notification
const toastMessage = document.getElementById("toastMessage");
const toastIcon = document.getElementById("toastIcon");
const toastText = document.getElementById("toastText");
let toastTimeout = null;

// ==========================================================================
// 4. Player Core Functions
// ==========================================================================

// Song ko player mein load karne ka function
// Ya function song ki details aur audio file player mein set karta hai
function loadSong(song) {
    if (!song) return;

    // Audio source update karna
    audioPlayer.src = song.audio;

    // Bottom player bar ki information update karna
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerThumb.src = song.image;
    playerThumb.alt = song.title + " Album Art";

    // Hero Spotlight banner ki information update karna
    heroTitle.textContent = song.title;
    heroArtist.textContent = "By " + song.artist;
    heroCategory.textContent = song.category;
    heroArtwork.src = song.image;
    heroArtwork.alt = song.title + " Album Art";
    heroBackdrop.style.backgroundImage = "url('" + song.image + "')";

    // Progress bar aur times ko reset karna
    progressBar.value = 0;
    progressFill.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    totalDurationEl.textContent = "0:00";

    // Favorite heart icon ka status update karna
    updateFavoriteUI(song.id);

    // Playlist aur Grid cards mein active song ko highlight karna
    highlightActiveElements();
}

// Current song ko play karne ka function
// Ya audio play karta hai aur play icon ko pause icon mein badalta hai
function playSong() {
    isPlaying = true;

    // Audio play promise handle karna taake koi browser issue na aaye
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
        playPromise.then(function() {
            // Play successfully start ho gaya
            updatePlayPauseUI(true);
        }).catch(function(error) {
            // Agar browser autoplay block kare ya audio load na ho
            isPlaying = false;
            updatePlayPauseUI(false);
            console.log("Playback warning:", error);
        });
    }
}

// Current song ko pause karne ka function
// Ya audio rokta hai aur pause icon ko play icon mein badalta hai
function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    updatePlayPauseUI(false);
}

// Play aur Pause ke darmian toggle karne ka function
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Play / Pause ke UI icons aur animations update karne ka function
function updatePlayPauseUI(playing) {
    if (playing) {
        // Pause icon lagana
        playIcon.className = "fa-solid fa-pause";
        playBtn.title = "Pause";
        playBtn.setAttribute("aria-label", "Pause");
        
        // Hero button text aur icon badalna
        heroPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i><span>Pause</span>';
        
        // Animations enable karna
        heroBanner.classList.add("is-playing");
        playerControlsBar.classList.add("is-playing");
    } else {
        // Play icon lagana
        playIcon.className = "fa-solid fa-play";
        playBtn.title = "Play";
        playBtn.setAttribute("aria-label", "Play");
        
        // Hero button text aur icon wapas play par lana
        heroPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i><span>Play Now</span>';
        
        // Animations pause karna
        heroBanner.classList.remove("is-playing");
        playerControlsBar.classList.remove("is-playing");
    }
}

// Agla song (Next) chalane ka function
// Agar aakhri song par ho to wapas pehle song par move karega (looping)
function playNext() {
    if (isShuffle) {
        // Agar shuffle on ho to random song pick karo
        let randomIndex = Math.floor(Math.random() * songs.length);
        // Koshish karo k same song dobara na aye
        if (randomIndex === currentSongIndex && songs.length > 1) {
            randomIndex = (randomIndex + 1) % songs.length;
        }
        currentSongIndex = randomIndex;
    } else {
        // Normal order: agla song
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0; // Wapas pehle song par ana
        }
    }

    loadSong(songs[currentSongIndex]);
    playSong();
}

// Pichla song (Previous) chalane ka function
// Agar pehle song par ho to aakhri song par move karega
function playPrev() {
    // Agar song 3 second se zyada chal chuka ho to usi song ko shuru se play karo
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
        return;
    }

    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; // Aakhri song par move karna
    }

    loadSong(songs[currentSongIndex]);
    playSong();
}

// Direct kisi song ko index ke zariye select aur play karna
function selectAndPlaySong(index) {
    if (index >= 0 && index < songs.length) {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
        playSong();
    }
}

// ==========================================================================
// 5. Progress Bar & Time Formatting
// ==========================================================================

// Current song ka progress update karna jab audio chal raha ho
function updateProgress() {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;

    if (duration && !isNaN(duration)) {
        // Percentage hisaab lagana (0 se 100 tak)
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        progressFill.style.width = progressPercent + "%";

        // Current time aur total duration format kar ke show karna
        currentTimeEl.textContent = formatTime(currentTime);
        totalDurationEl.textContent = formatTime(duration);
    }
}

// User jab progress bar par click ya drag kare to audio position change karna
function setProgress(e) {
    const duration = audioPlayer.duration;
    if (duration && !isNaN(duration)) {
        const newTime = (progressBar.value / 100) * duration;
        audioPlayer.currentTime = newTime;
        progressFill.style.width = progressBar.value + "%";
        currentTimeEl.textContent = formatTime(newTime);
    }
}

// Seconds ko 0:00 format mein convert karne ka simple function
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    // Agar second 10 se kam ho to leading zero (0) lagana
    const formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + formattedSeconds;
}

// ==========================================================================
// 6. Volume Control & Mute Functions
// ==========================================================================

// Volume slider ki value change hone par volume set karna
function handleVolumeChange() {
    const val = parseFloat(volumeSlider.value);
    audioPlayer.volume = val;
    audioPlayer.muted = false;
    isMuted = false;

    // Volume bar fill aur text update karna
    volumeFill.style.width = (val * 100) + "%";
    volumePercent.textContent = Math.round(val * 100) + "%";

    // Icon update karna
    updateVolumeIcon(val);
}

// Sound ko Mute ya Unmute karne ka toggle function
function toggleMute() {
    if (isMuted) {
        // Unmute karna: purani volume restore karna
        audioPlayer.muted = false;
        audioPlayer.volume = previousVolume > 0 ? previousVolume : 0.8;
        volumeSlider.value = audioPlayer.volume;
        volumeFill.style.width = (audioPlayer.volume * 100) + "%";
        volumePercent.textContent = Math.round(audioPlayer.volume * 100) + "%";
        isMuted = false;
        updateVolumeIcon(audioPlayer.volume);
        showToast("Volume unmuted", "info");
    } else {
        // Mute karna: pehle wali volume yaad rakhna
        previousVolume = audioPlayer.volume > 0 ? audioPlayer.volume : 0.8;
        audioPlayer.muted = true;
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
        volumeFill.style.width = "0%";
        volumePercent.textContent = "0%";
        isMuted = true;
        volumeIcon.className = "fa-solid fa-volume-xmark";
        showToast("Volume muted", "info");
    }
}

// Volume level ke mutabiq icon badalna
function updateVolumeIcon(val) {
    if (val === 0 || isMuted) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (val < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
}

// ==========================================================================
// 7. Playlist & Cards Rendering
// ==========================================================================

// Song Cards Grid ko screen par show karna
function renderSongsGrid(songsList) {
    songsGrid.innerHTML = "";

    if (songsList.length === 0) {
        emptyState.style.display = "block";
        songsGrid.style.display = "none";
        resultsCount.textContent = "0 Songs";
        return;
    }

    emptyState.style.display = "none";
    songsGrid.style.display = "grid";
    resultsCount.textContent = songsList.length + (songsList.length === 1 ? " Song" : " Songs");

    // Har song ke liye card create karna
    for (let i = 0; i < songsList.length; i++) {
        const song = songsList[i];
        
        // Song ka original index pata lagana
        const originalIndex = songs.findIndex(function(s) {
            return s.id === song.id;
        });

        const card = document.createElement("div");
        card.className = "song-card" + (originalIndex === currentSongIndex ? " active" : "");
        card.setAttribute("data-index", originalIndex);

        card.innerHTML = `
            <div class="card-thumb-wrapper">
                <img src="${song.image}" alt="${song.title}" class="card-thumb" loading="lazy">
                <div class="card-play-overlay">
                    <div class="card-play-icon">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
            </div>
            <span class="card-genre-tag">${song.category}</span>
            <h4 class="card-title" title="${song.title}">${song.title}</h4>
            <p class="card-artist" title="${song.artist}">${song.artist}</p>
        `;

        // Card par click karne se song play hoga
        card.addEventListener("click", function() {
            selectAndPlaySong(originalIndex);
        });

        songsGrid.appendChild(card);
    }
}

// Right side ki Playlist Queue ko render karna
function renderPlaylist(songsList) {
    playlistList.innerHTML = "";

    playlistCount.textContent = songsList.length + " Tracks";

    for (let i = 0; i < songsList.length; i++) {
        const song = songsList[i];
        
        // Original index search karna
        const originalIndex = songs.findIndex(function(s) {
            return s.id === song.id;
        });

        const li = document.createElement("li");
        li.className = "playlist-item" + (originalIndex === currentSongIndex ? " active" : "");
        li.setAttribute("data-index", originalIndex);

        li.innerHTML = `
            <div class="item-index-wrapper">
                <span class="item-index">${i + 1}</span>
            </div>
            <img src="${song.image}" alt="${song.title}" class="item-thumb" loading="lazy">
            <div class="item-details">
                <h5 class="item-title">${song.title}</h5>
                <div class="item-meta">
                    <span class="item-artist">${song.artist}</span>
                    <span>•</span>
                    <span class="item-genre">${song.category}</span>
                </div>
            </div>
            <div class="item-play-icon">
                <i class="fa-solid fa-play"></i>
            </div>
        `;

        // Playlist item click event
        li.addEventListener("click", function() {
            selectAndPlaySong(originalIndex);
        });

        playlistList.appendChild(li);
    }
}

// Current active song ko cards aur playlist mein highlight karna
function highlightActiveElements() {
    // 1. Grid cards ko update karna
    const allCards = document.querySelectorAll(".song-card");
    allCards.forEach(function(card) {
        const index = parseInt(card.getAttribute("data-index"), 10);
        if (index === currentSongIndex) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });

    // 2. Playlist items ko update karna
    const allPlaylistItems = document.querySelectorAll(".playlist-item");
    allPlaylistItems.forEach(function(item) {
        const index = parseInt(item.getAttribute("data-index"), 10);
        if (index === currentSongIndex) {
            item.classList.add("active");
            // Agar view se bahar ho to scroll kar ke samnay lana
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
            item.classList.remove("active");
        }
    });
}

// ==========================================================================
// 8. Categories Filter Functions
// ==========================================================================

// Categories buttons ko screen par dynamically generate karna
function renderCategories() {
    categoryContainer.innerHTML = "";

    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const btn = document.createElement("button");
        btn.className = "category-chip" + (cat === currentCategory ? " active" : "");
        btn.textContent = cat;
        btn.setAttribute("data-category", cat);

        // Click karne par category filter karna
        btn.addEventListener("click", function() {
            handleCategoryChange(cat);
        });

        categoryContainer.appendChild(btn);
    }
}

// Category change hone par filtered songs display karna
function handleCategoryChange(selectedCategory) {
    currentCategory = selectedCategory;

    // Active button class update karna
    const chips = document.querySelectorAll(".category-chip");
    chips.forEach(function(chip) {
        if (chip.getAttribute("data-category") === selectedCategory) {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }
    });

    // Subheading update karna
    if (selectedCategory === "All") {
        libraryHeading.textContent = "Explore Songs";
    } else {
        libraryHeading.textContent = selectedCategory + " Tracks";
    }

    // Filter apply karna
    filterAndDisplaySongs();
}

// ==========================================================================
// 9. Search Functionality
// ==========================================================================

// Search input aur Category filter ko mila kar songs display karna
function filterAndDisplaySongs() {
    const query = searchInput.value.trim().toLowerCase();

    // Clear search button ko show ya hide karna
    if (query.length > 0) {
        clearSearchBtn.style.display = "flex";
    } else {
        clearSearchBtn.style.display = "none";
    }

    // Filter logic: Title, Artist, ya Category match karna
    const filtered = songs.filter(function(song) {
        // 1. Category match check
        const matchesCategory = (currentCategory === "All" || song.category === currentCategory);

        // 2. Search query match check
        const matchesQuery = (
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.category.toLowerCase().includes(query)
        );

        return matchesCategory && matchesQuery;
    });

    // Filtered songs ko grid aur playlist mein show karna
    renderSongsGrid(filtered);
    renderPlaylist(filtered);
}

// Search input clear karne ka function
function clearSearch() {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    filterAndDisplaySongs();
    searchInput.focus();
}

// ==========================================================================
// 10. Toast Notification & Favorites
// ==========================================================================

// User ko clean friendly notification message dikhana
function showToast(message, type) {
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toastText.textContent = message;

    if (type === "error") {
        toastMessage.classList.add("error");
        toastIcon.className = "fa-solid fa-triangle-exclamation";
    } else {
        toastMessage.classList.remove("error");
        toastIcon.className = "fa-solid fa-circle-info";
    }

    toastMessage.classList.add("show");

    // 3.5 seconds baad notification ko gayab karna
    toastTimeout = setTimeout(function() {
        toastMessage.classList.remove("show");
    }, 3500);
}

// Song ko favorite karne ya un-favorite karne ka toggle
function toggleFavorite(songId) {
    const index = favoriteSongIds.indexOf(songId);
    if (index > -1) {
        favoriteSongIds.splice(index, 1);
        showToast("Removed from favorites", "info");
    } else {
        favoriteSongIds.push(songId);
        showToast("Added to favorites!", "info");
    }
    updateFavoriteUI(songId);
}

// Favorite button ke heart icons ko update karna
function updateFavoriteUI(songId) {
    const isFav = favoriteSongIds.indexOf(songId) > -1;

    // Bottom player heart
    if (isFav) {
        playerHeartBtn.classList.add("active");
        playerHeartBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        playerHeartBtn.classList.remove("active");
        playerHeartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }

    // Hero banner heart
    if (isFav) {
        heroFavBtn.classList.add("active");
        heroFavBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        heroFavBtn.classList.remove("active");
        heroFavBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
}

// ==========================================================================
// 11. Event Listeners Registration
// ==========================================================================
// Tamam buttons aur controls ke event listeners yahan register ho rahay hain

function setupEventListeners() {
    // Play / Pause button click
    playBtn.addEventListener("click", togglePlayPause);
    heroPlayBtn.addEventListener("click", togglePlayPause);

    // Next aur Previous button clicks
    nextBtn.addEventListener("click", playNext);
    prevBtn.addEventListener("click", playPrev);

    // Audio ke time updates aur ended events
    // Current time badalne par progress update karna
    audioPlayer.addEventListener("timeupdate", updateProgress);

    // Song mukammal hone par automatically agla song chalana
    audioPlayer.addEventListener("ended", function() {
        if (isRepeat) {
            // Agar repeat on ho to wahi song dubara chalayein
            audioPlayer.currentTime = 0;
            playSong();
        } else {
            // Warna normal next song chalayein
            playNext();
        }
    });

    // Audio loading error handling
    // Agar koi audio file na milay to user-friendly message show karna
    audioPlayer.addEventListener("error", function() {
        showToast("Unable to play this song. Please check the audio file.", "error");
        updatePlayPauseUI(false);
    });

    // Progress bar user seeking events
    progressBar.addEventListener("input", function() {
        progressFill.style.width = progressBar.value + "%";
    });
    progressBar.addEventListener("change", setProgress);

    // Volume Slider & Mute button events
    volumeSlider.addEventListener("input", handleVolumeChange);
    volumeBtn.addEventListener("click", toggleMute);

    // Shuffle Toggle Event
    shuffleBtn.addEventListener("click", function() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle("active", isShuffle);
        if (isShuffle) {
            showToast("Shuffle mode enabled", "info");
        } else {
            showToast("Shuffle mode disabled", "info");
        }
    });

    // Repeat Toggle Event
    repeatBtn.addEventListener("click", function() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle("active", isRepeat);
        if (isRepeat) {
            showToast("Repeat song enabled", "info");
        } else {
            showToast("Repeat song disabled", "info");
        }
    });

    // Playlist Queue Shuffle button
    playlistShuffleBtn.addEventListener("click", function() {
        isShuffle = true;
        shuffleBtn.classList.add("active");
        playNext();
        showToast("Shuffled & playing next track", "info");
    });

    // Playlist Show All Songs button
    playlistClearFilterBtn.addEventListener("click", function() {
        handleCategoryChange("All");
        clearSearch();
    });

    // Search input typing event (dynamically filter as user types)
    searchInput.addEventListener("input", filterAndDisplaySongs);
    clearSearchBtn.addEventListener("click", clearSearch);

    // Reset filter button in empty state
    resetFilterBtn.addEventListener("click", function() {
        handleCategoryChange("All");
        clearSearch();
    });

    // Favorite button clicks
    playerHeartBtn.addEventListener("click", function() {
        toggleFavorite(songs[currentSongIndex].id);
    });
    heroFavBtn.addEventListener("click", function() {
        toggleFavorite(songs[currentSongIndex].id);
    });

    // Keyboard Shortcuts (Space to play/pause, Arrow keys for next/prev)
    document.addEventListener("keydown", function(e) {
        // Agar user search input mein likh raha ho to space bar se song pause na ho
        if (document.activeElement === searchInput) {
            return;
        }

        if (e.code === "Space") {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === "ArrowRight") {
            playNext();
        } else if (e.code === "ArrowLeft") {
            playPrev();
        }
    });
}

// ==========================================================================
// 12. Application Initialization
// ==========================================================================
// Page load hone par application ko shuru karna

function initMusicPlayer() {
    // 1. Initial song load karna
    loadSong(songs[currentSongIndex]);

    // 2. Categories buttons render karna
    renderCategories();

    // 3. Songs grid aur playlist list render karna
    renderSongsGrid(songs);
    renderPlaylist(songs);

    // 4. Initial volume set karna
    audioPlayer.volume = previousVolume;
    volumeSlider.value = previousVolume;
    volumeFill.style.width = (previousVolume * 100) + "%";
    volumePercent.textContent = Math.round(previousVolume * 100) + "%";

    // 5. Total tracks status badge update karna
    libraryCountText.textContent = songs.length + " Tracks Available";

    // 6. Tamam event listeners attach karna
    setupEventListeners();

    console.log("AuraWave Music Player Initialized Successfully!");
}

// DOM load hone par application shuru karein
document.addEventListener("DOMContentLoaded", initMusicPlayer);
