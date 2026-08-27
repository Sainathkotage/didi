/* ==========================================================================
   SISTER MEMORY CHRONICLES - INTERACTIVE JAVASCRIPT & AUDIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. PHOTO CATALOG DATA (Old to New Chronological Order)
    // ==========================================================================
    const oldPhotos = [
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.03.jpeg', title: 'Lil Munchkin Days 👶', desc: 'Where the journey started! Cute, small, and always looking for trouble.', date: 'Throwback Chapter 1' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.04.jpeg', title: 'Partner in Crime 🕵️‍♀️', desc: 'Plotting how to steal extra sweets before dinner.', date: 'Old Golden Memory #2' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.04 (1).jpeg', title: 'Naughty Smiles 😁', desc: 'The iconic innocent face right after breaking something.', date: 'Old Golden Memory #3' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.04 (2).jpeg', title: 'Rakhi Classic Ritual 🎀', desc: 'Celebrating Rakshabandhan when we were tiny kiddos!', date: 'Old Golden Memory #4' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.05.jpeg', title: 'Dress Up & Pose 👗', desc: 'Always ready to pose like a superstar for the camera.', date: 'Old Golden Memory #5' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.05 (1).jpeg', title: 'Sibling Fights & Hugs 🫂', desc: 'Fighting 5 minutes ago, hugging 5 minutes later.', date: 'Old Golden Memory #6' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.05 (2).jpeg', title: 'Festive Joy 🪔', desc: 'Dressed up in festive ethnic wear looking adorable.', date: 'Old Golden Memory #7' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.05 (3).jpeg', title: 'Birthday Memories 🎂', desc: 'Blowing birthday candles together in childhood!', date: 'Old Golden Memory #8' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.06.jpeg', title: 'Summer Outing 🍦', desc: 'Eating ice cream and enjoying sunny family trips.', date: 'Old Golden Memory #9' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.06 (1).jpeg', title: 'School Days Outfit 🎒', desc: 'Waking up early and getting ready for school.', date: 'Old Golden Memory #10' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.06 (2).jpeg', title: 'Candid Laughs 😂', desc: 'Unfiltered joy and pure belly laughter.', date: 'Old Golden Memory #11' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.07.jpeg', title: 'Sister Logic 🧠', desc: '"What is yours is mine, and what is mine is mine!"', date: 'Old Golden Memory #12' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.07 (1).jpeg', title: 'Precious Moments 🌸', desc: 'Simple sweet days filled with warmth.', date: 'Old Golden Memory #13' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.07 (2).jpeg', title: 'Family Happiness 💖', desc: 'Cherished childhood memories captured forever.', date: 'Old Golden Memory #14' },
        { src: 'photos/old/WhatsApp Image 2026-08-27 at 21.52.07 (3).jpeg', title: 'Growing Up Fast 🚀', desc: 'The end of childhood era, stepping into modern times!', date: 'Old Golden Memory #15' }
    ];

    const newPhotos = [
        { src: 'photos/new/WhatsApp Image 2026-08-27 at 21.54.09.jpeg', title: 'Modern Fashion Icon ✨', desc: 'Grown up and serving absolute style goals!', date: 'Recent Chapter 1' },
        { src: 'photos/new/WhatsApp Image 2026-08-27 at 21.54.09 (1).jpeg', title: 'Best Friends Forever 👯‍♀️', desc: 'Not just siblings anymore, true lifelong besties.', date: 'Recent Chapter 2' },
        { src: 'photos/new/WhatsApp Image 2026-08-27 at 21.54.09 (2).jpeg', title: 'Travel & Vibes ✈️', desc: 'Exploring new places and making fresh memories.', date: 'Recent Chapter 3' },
        { src: 'photos/new/WhatsApp Image 2026-08-27 at 21.54.10.jpeg', title: 'Rakhi 2026 Celebration 🪔', desc: 'Celebrating Rakshabandhan with endless love & laughter.', date: 'Recent Chapter 4' },
        { src: 'photos/new/WhatsApp Image 2026-08-27 at 21.54.10 (1).jpeg', title: 'Birthday Princess 👑', desc: 'Happy Birthday to the most amazing sister in the universe!', date: 'Special Milestone' }
    ];

    // Combine all photos sequentially (Old 15 + New 5 = 20 Photos total)
    const memoryCatalog = [
        ...oldPhotos.map(item => ({ ...item, era: 'old' })),
        ...newPhotos.map(item => ({ ...item, era: 'new' }))
    ];

    // State Variables
    let currentIndex = 0;
    let autoPlayTimer = null;
    let isMusicPlaying = false;
    let hasReachedNewEra = false;

    // ==========================================================================
    // 2. IMMEDIATE AUTOPLAY BACKGROUND MUSIC ENGINE (Forever Young - Alphaville)
    // ==========================================================================
    const bgAudioFile = document.getElementById('bgAudioFile');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const musicBars = document.getElementById('musicBars');
    const songTitleText = document.getElementById('songTitleText');

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function startBackgroundMusic() {
        if (isMusicPlaying) return;
        initAudioContext();
        isMusicPlaying = true;

        if (bgAudioFile) {
            bgAudioFile.volume = 0.75;
            const playPromise = bgAudioFile.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    songTitleText.textContent = "Forever Young - Alphaville";
                    musicToggleBtn.classList.add('active-music');
                    musicBars.classList.remove('paused');
                }).catch((err) => {
                    console.log("Autoplay waiting for initial user interaction:", err);
                    isMusicPlaying = false;
                });
            }
        }
    }

    function stopBackgroundMusic() {
        isMusicPlaying = false;
        if (bgAudioFile) {
            bgAudioFile.pause();
        }
        musicToggleBtn.classList.remove('active-music');
        musicBars.classList.add('paused');
    }

    // Trigger music immediately on page open!
    startBackgroundMusic();

    // Fallback: If browser blocks audio before any user interaction, trigger music on VERY FIRST tap/click/move anywhere on page!
    const unlockAudioEvents = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
    function unlockAudioOnInteraction() {
        if (!isMusicPlaying) {
            startBackgroundMusic();
        }
        unlockAudioEvents.forEach(evt => window.removeEventListener(evt, unlockAudioOnInteraction));
    }
    unlockAudioEvents.forEach(evt => window.addEventListener(evt, unlockAudioOnInteraction, { once: true }));

    musicToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMusicPlaying) {
            stopBackgroundMusic();
        } else {
            startBackgroundMusic();
        }
    });

    // Sound FX helper for UI button clicks
    function playSynthTone(freq, type = 'sine', duration = 0.15, volume = 0.15) {
        try {
            initAudioContext();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(volume, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.log('Audio pop notice:', e);
        }
    }

    function playPopSound() {
        playSynthTone(587.33, 'triangle', 0.12, 0.2); // D5 note pop
        setTimeout(() => playSynthTone(880, 'sine', 0.1, 0.15), 50); // A5 chime
    }

    function playClickSound() {
        playSynthTone(440, 'sine', 0.08, 0.1);
    }

    function playSuccessFanfare() {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            setTimeout(() => playSynthTone(freq, 'triangle', 0.25, 0.2), idx * 120);
        });
    }

    // Clock Display
    function updateClock() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('currentTime').textContent = `${hrs}:${mins}`;
    }
    updateClock();
    setInterval(updateClock, 30000);

    // ==========================================================================
    // 3. RETRO LAUNCHER & SCREEN NAVIGATION
    // ==========================================================================
    const heroScreen = document.getElementById('heroScreen');
    const memoryStage = document.getElementById('memoryStage');
    const gallerySection = document.getElementById('gallerySection');

    const startBtn = document.getElementById('startBtn');
    const dlgYesBtn = document.getElementById('dlgYesBtn');
    const dlgNoBtn = document.getElementById('dlgNoBtn');
    const exitStageBtn = document.getElementById('exitStageBtn');
    const openGalleryBtn = document.getElementById('openGalleryBtn');
    const closeGalleryBtn = document.getElementById('closeGalleryBtn');

    function launchMemoryStage() {
        startBackgroundMusic(); // Ensure music is playing
        playSuccessFanfare();
        heroScreen.classList.remove('active-screen');
        heroScreen.classList.add('hidden-screen');
        memoryStage.classList.remove('hidden-screen');
        memoryStage.classList.add('active-screen');
        createSparkleBurst();
    }

    startBtn.addEventListener('click', launchMemoryStage);
    dlgYesBtn.addEventListener('click', launchMemoryStage);
    dlgNoBtn.addEventListener('click', launchMemoryStage);

    exitStageBtn.addEventListener('click', () => {
        playClickSound();
        memoryStage.classList.remove('active-screen');
        memoryStage.classList.add('hidden-screen');
        heroScreen.classList.remove('hidden-screen');
        heroScreen.classList.add('active-screen');
        stopAutoPlay();
    });

    openGalleryBtn.addEventListener('click', () => {
        playClickSound();
        renderScrapbookGrid('all');
        gallerySection.classList.remove('hidden-screen');
        gallerySection.classList.add('active-screen');
    });

    closeGalleryBtn.addEventListener('click', () => {
        playClickSound();
        gallerySection.classList.remove('active-screen');
        gallerySection.classList.add('hidden-screen');
    });

    // ==========================================================================
    // 4. INTERACTIVE POLAROID POP-UP SYSTEM (Old -> New)
    // ==========================================================================
    const polaroidDesk = document.getElementById('polaroidDesk');
    const deskPlaceholder = document.getElementById('deskPlaceholder');
    const currentCount = document.getElementById('currentCount');
    const totalCount = document.getElementById('totalCount');
    const eraTag = document.getElementById('eraTag');

    const popNextBtn = document.getElementById('popNextBtn');
    const popAllBtn = document.getElementById('popAllBtn');
    const resetStageBtn = document.getElementById('resetStageBtn');

    const eraTransitionOverlay = document.getElementById('eraTransitionOverlay');
    const continueEraBtn = document.getElementById('continueEraBtn');

    totalCount.textContent = memoryCatalog.length;

    function popNextPhoto() {
        if (currentIndex >= memoryCatalog.length) {
            playSuccessFanfare();
            createConfettiBurst();
            stopAutoPlay();
            return;
        }

        const data = memoryCatalog[currentIndex];

        // Check if we just transitioned to New Photos (Index 15)
        if (data.era === 'new' && !hasReachedNewEra && currentIndex === 15) {
            hasReachedNewEra = true;
            stopAutoPlay();
            eraTransitionOverlay.classList.remove('hidden-element');
            return;
        }

        // Hide desk placeholder
        if (deskPlaceholder) deskPlaceholder.style.display = 'none';

        // Create Polaroid DOM element
        const card = document.createElement('div');
        card.className = 'polaroid-card';

        // Responsive scatter parameters for mobile (Samsung S21 FE)
        const isMobile = window.innerWidth <= 480;
        const rot = Math.floor(Math.random() * 20) - 10; // -10deg to +10deg
        const posX = Math.floor(Math.random() * (isMobile ? 30 : 60)) - (isMobile ? 15 : 30);
        const posY = Math.floor(Math.random() * (isMobile ? 30 : 50)) - (isMobile ? 15 : 25);

        card.style.transform = `translate(${posX}px, ${posY}px) rotate(${rot}deg)`;
        card.style.zIndex = currentIndex + 5;

        const isNewTag = data.era === 'new' ? '<span class="polaroid-tag new-era">NEW ✨</span>' : '<span class="polaroid-tag">OLD 🐣</span>';

        card.innerHTML = `
            <div class="polaroid-tape"></div>
            <div class="polaroid-photo-frame">
                <img src="${data.src}" alt="${data.title}">
                ${isNewTag}
            </div>
            <div class="polaroid-details">
                <h3 class="polaroid-caption">${data.title}</h3>
                <p class="polaroid-hint">Tap to enlarge note 🔍</p>
            </div>
        `;

        // Click/Tap to view Modal
        card.addEventListener('click', (e) => {
            playClickSound();
            openPhotoModal(data);
        });

        // Add drag & touch behavior
        makeElementDraggable(card);

        polaroidDesk.appendChild(card);
        playPopSound();

        currentIndex++;
        currentCount.textContent = currentIndex;

        // Update Era tag label
        if (data.era === 'old') {
            eraTag.textContent = `CHAPTER 1: OLD (${currentIndex}/15)`;
        } else {
            eraTag.textContent = `CHAPTER 2: NEW (${currentIndex - 15}/5)`;
        }
    }

    continueEraBtn.addEventListener('click', () => {
        playClickSound();
        eraTransitionOverlay.classList.add('hidden-element');
        popNextPhoto();
    });

    popNextBtn.addEventListener('click', () => {
        stopAutoPlay();
        popNextPhoto();
    });

    popAllBtn.addEventListener('click', () => {
        if (autoPlayTimer) {
            stopAutoPlay();
        } else {
            popAllBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Auto';
            popAllBtn.classList.add('glow');
            autoPlayTimer = setInterval(() => {
                if (currentIndex >= memoryCatalog.length) {
                    stopAutoPlay();
                } else {
                    popNextPhoto();
                }
            }, 900);
        }
    });

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
            popAllBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Auto Pop All!';
            popAllBtn.classList.remove('active');
        }
    }

    resetStageBtn.addEventListener('click', () => {
        playClickSound();
        stopAutoPlay();
        currentIndex = 0;
        hasReachedNewEra = false;
        currentCount.textContent = '0';
        eraTag.textContent = 'CHAPTER 1: OLD MEMORIES (OLD DAYS 🐣)';
        polaroidDesk.innerHTML = '';
        if (deskPlaceholder) {
            deskPlaceholder.style.display = 'block';
            polaroidDesk.appendChild(deskPlaceholder);
        }
    });

    // Make Cards Draggable (Mouse + Touch Support for Samsung S21 FE)
    function makeElementDraggable(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.onmousedown = dragMouseDown;
        elmnt.ontouchstart = dragTouchStart;

        function dragMouseDown(e) {
            e = e || window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        function dragTouchStart(e) {
            const touch = e.touches[0];
            pos3 = touch.clientX;
            pos4 = touch.clientY;
            document.ontouchend = closeTouchElement;
            document.ontouchmove = elementTouchMove;
        }

        function elementTouchMove(e) {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                pos1 = pos3 - touch.clientX;
                pos2 = pos4 - touch.clientY;
                pos3 = touch.clientX;
                pos4 = touch.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        }

        function closeTouchElement() {
            document.ontouchend = null;
            document.ontouchmove = null;
        }
    }

    // ==========================================================================
    // 5. MODAL EXPAND HANDLER
    // ==========================================================================
    const photoModal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openPhotoModal(data) {
        modalImg.src = data.src;
        modalDate.textContent = data.date;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        photoModal.classList.remove('hidden-element');
    }

    closeModalBtn.addEventListener('click', () => {
        playClickSound();
        photoModal.classList.add('hidden-element');
    });

    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            photoModal.classList.add('hidden-element');
        }
    });

    // ==========================================================================
    // 6. SCRAPBOOK GALLERY GRID
    // ==========================================================================
    const scrapbookGrid = document.getElementById('scrapbookGrid');
    const filterChips = document.querySelectorAll('.filter-chip');

    function renderScrapbookGrid(filter) {
        scrapbookGrid.innerHTML = '';
        const list = memoryCatalog.filter(item => filter === 'all' || item.era === filter);

        list.forEach(item => {
            const card = document.createElement('div');
            card.className = 'scrapbook-card';
            card.innerHTML = `
                <div class="scrapbook-img-box">
                    <img src="${item.src}" alt="${item.title}">
                </div>
                <div class="scrapbook-info">
                    <div class="scrapbook-title">${item.title}</div>
                </div>
            `;
            card.addEventListener('click', () => {
                playClickSound();
                openPhotoModal(item);
            });
            scrapbookGrid.appendChild(card);
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            playClickSound();
            renderScrapbookGrid(chip.dataset.filter);
        });
    });

    // ==========================================================================
    // 7. CELEBRATION EVENTS (CAKE + RAKHI + AWARD)
    // ==========================================================================
    
    // Virtual Cake
    const candlesGroup = document.querySelectorAll('.candle');
    const lightCakeBtn = document.getElementById('lightCakeBtn');
    const blowCakeBtn = document.getElementById('blowCakeBtn');

    lightCakeBtn.addEventListener('click', () => {
        playClickSound();
        candlesGroup.forEach(c => c.classList.add('lit'));
    });

    blowCakeBtn.addEventListener('click', () => {
        candlesGroup.forEach(c => c.classList.remove('lit'));
        playSuccessFanfare();
        createConfettiBurst();
    });

    candlesGroup.forEach(candle => {
        candle.addEventListener('click', () => {
            playClickSound();
            candle.classList.toggle('lit');
        });
    });

    // Virtual Rakhi Ceremony
    const tieRakhiBtn = document.getElementById('tieRakhiBtn');
    const sweetBoxBtn = document.getElementById('sweetBoxBtn');
    const placedRakhi = document.getElementById('placedRakhi');
    const rakhiStatus = document.getElementById('rakhiStatus');

    tieRakhiBtn.addEventListener('click', () => {
        placedRakhi.classList.remove('hidden-element');
        rakhiStatus.textContent = '💖 Rakhi Tied! Sibling bond & protection promise renewed!';
        playSuccessFanfare();
        createSparkleBurst();
    });

    sweetBoxBtn.addEventListener('click', () => {
        playClickSound();
        rakhiStatus.textContent = '🍬 Feeding delicious Kaju Katli sweets to sister!';
        createSparkleBurst();
    });

    // Award Certificate Modal
    const openAwardBtn = document.getElementById('openAwardBtn');
    const awardModal = document.getElementById('awardModal');
    const closeAwardBtn = document.getElementById('closeAwardBtn');

    openAwardBtn.addEventListener('click', () => {
        playSuccessFanfare();
        awardModal.classList.remove('hidden-element');
        createConfettiBurst();
    });

    closeAwardBtn.addEventListener('click', () => {
        playClickSound();
        awardModal.classList.add('hidden-element');
    });

    awardModal.addEventListener('click', (e) => {
        if (e.target === awardModal) {
            awardModal.classList.add('hidden-element');
        }
    });

    // ==========================================================================
    // 8. CANVAS PARTICLES & CONFETTI ENGINE
    // ==========================================================================
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ['#ff85a1', '#52b788', '#f9c74f', '#3b6998', '#ffb703', '#e7c6ff'];

    class Particle {
        constructor(x, y, isConfetti = false) {
            this.x = x || Math.random() * width;
            this.y = y || Math.random() * height;
            this.size = isConfetti ? Math.random() * 7 + 3 : Math.random() * 3.5 + 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.vx = isConfetti ? (Math.random() - 0.5) * 7 : (Math.random() - 0.5) * 1.2;
            this.vy = isConfetti ? Math.random() * -7 - 3 : Math.random() * -0.8 - 0.3;
            this.gravity = isConfetti ? 0.22 : 0;
            this.life = isConfetti ? 110 : 250;
            this.alpha = 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.life--;
            this.alpha = Math.max(0, this.life / 110);
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Ambient floating sparkles
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }

    function createConfettiBurst() {
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle(width / 2, height / 2 + 80, true));
        }
    }

    function createSparkleBurst() {
        for (let i = 0; i < 35; i++) {
            particles.push(new Particle(Math.random() * width, Math.random() * height, true));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }

        if (particles.length < 18) {
            particles.push(new Particle());
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});
