document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const coverScreen = document.getElementById('cover-screen');
    const albumScreen = document.getElementById('album-screen');
    const finalScreen = document.getElementById('final-screen');

    const startBtn = document.getElementById('start-btn');
    const openAlbumBtn = document.getElementById('open-album-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');

    const memoryImg = document.getElementById('memory-img');
    const memoryText = document.getElementById('memory-text');
    const memoryEmoji = document.getElementById('memory-emoji');
    const speechBubble = document.getElementById('speech-bubble');
    const pageIndicator = document.getElementById('page-indicator');

    let currentIndex = 0;

    function switchScreen(hideScreen, showScreen) {
        hideScreen.classList.remove('active');
        setTimeout(() => {
            showScreen.classList.add('active');
        }, 400);
    }

    startBtn.addEventListener('click', () => {
        switchScreen(welcomeScreen, coverScreen);
    });

    openAlbumBtn.addEventListener('click', () => {
        currentIndex = 0;
        updatePageContent();
        switchScreen(coverScreen, albumScreen);
    });

    function updatePageContent() {
        const memory = memoriesData[currentIndex];
        const bookElement = document.querySelector('.book');
        bookElement.style.opacity = '0.3';

        setTimeout(() => {
            memoryImg.src = `/static/images/${memory.image}`;
            memoryText.textContent = memory.text;
            memoryEmoji.textContent = memory.emoji;
            pageIndicator.textContent = `${currentIndex + 1} / ${memoriesData.length}`;

            if (currentIndex === 8) {
                speechBubble.style.display = 'block';
            } else {
                speechBubble.style.display = 'none';
            }

            bookElement.style.opacity = '1';
        }, 200);

        prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < memoriesData.length - 1) {
            currentIndex++;
            updatePageContent();
        } else {
            switchScreen(albumScreen, finalScreen);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updatePageContent();
        }
    });

    restartBtn.addEventListener('click', () => {
        switchScreen(finalScreen, welcomeScreen);
    });
});