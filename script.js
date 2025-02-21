// List of phrases for each slide
const phrases = [
    "Zor'kha Vrraa",
    "Luu'mah Shreee",
    "Kraa'vol Zzzzt",
    "Vee'lor Grrraa",
    "Shii'kaa Wrrroo",
    "Tuu'raa Kkkkk",
    "Grrr'maa Zzzuu",
    "Raa'voo Ssshhh",
    "Zzz'kaa Vrrroo",
    "Kaa'loo Wrrraa",
    "Vrrr'sha Zzzii",
    "Shrr'kaa Llluu",
    "Krrr'voo Zzzee",
    "Zuu'maa Rrrsss",
    "Vaa'roo Kkkrrr",
    "Luu'kaa Zzzuu"
];

const numberOfSlides = 50;

function generateSlides() {
    const slideshow = document.querySelector('.slideshow');

    for (let i = 1; i <= numberOfSlides; i++) {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const img = document.createElement('img');
        img.src = `images/animal_${i}.png`;
        img.alt = `Imagined Animal ${i}`;
        img.classList.add('large-image');
        slide.appendChild(img);

        const phrase = document.createElement('p');
        phrase.classList.add('animal-language');
        phrase.textContent = phrases[(i - 1) % phrases.length];
        slide.appendChild(phrase);

        const audio = document.createElement('audio');
        audio.classList.add('audio');
        audio.src = `sounds/sound${i}.wav`;
        audio.loop = true; // Enable looping for each audio track
        slide.appendChild(audio);

        slideshow.appendChild(slide);
    }
}

// Initialize the slideshow
generateSlides();

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const audioElements = document.querySelectorAll('.audio');
const slideInterval = 5000; // Change slide every 5 seconds
const audioFadeDuration = 2000;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? 1 : 0;
    });
}

function setupAudioLoop(audio) {
    // Handle the audio ending
    audio.addEventListener('ended', () => {
        // If the audio has ended naturally, restart it
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio playback error:', e));
    });
}

function playAudioTracks() {
    audioElements.forEach((audio, index) => {
        // Setup looping behavior for each audio track
        setupAudioLoop(audio);
        
        // Stagger the initial start of each track
        setTimeout(() => {
            audio.currentTime = 0;
            audio.volume = 0;
            
            // Start playing and fade in
            audio.play().then(() => {
                fadeInAudio(audio);
            }).catch(e => console.log('Audio playback error:', e));
        }, index * 1000); // Stagger each track by 1 second
    });
}

function fadeInAudio(audio) {
    let volume = 0;
    const interval = setInterval(() => {
        if (volume < 1) {
            volume += 0.1;
            audio.volume = volume;
        } else {
            clearInterval(interval);
        }
    }, audioFadeDuration / 10);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    // Note: We're not restarting audio here anymore
}

function startSlideshow() {
    showSlide(currentSlide);
    playAudioTracks(); // Play audio tracks once at the start
    
    // Only handle slide transitions, not audio
    setInterval(nextSlide, slideInterval);
}

startSlideshow();