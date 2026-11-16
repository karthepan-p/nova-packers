
// IMAGE ERROR FALLBACK (Graceful SVG Placeholder for missing files)

function handleImgError(imgElement, label) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
            <rect width="600" height="400" fill="#111827"/>
            <text x="50%" y="46%" font-family="sans-serif" font-size="22" font-weight="bold" fill="#06b6d4" text-anchor="middle">
                ${label || 'Nova Packers & Transport'}
            </text>
            <text x="50%" y="56%" font-family="sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle">
                [ Place image in project images/ folder ]
            </text>
        </svg>
    `.trim();
    imgElement.onerror = null;
    imgElement.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// SMOOTH PRELOADER ROLLING & FLIP FLIGHT ENGINE

function runRobustPreloader() {
    const overlay = document.getElementById('preloader-overlay');
    const flightWrap = document.getElementById('splash-flight-wrap');
    const splashLogo = document.getElementById('splash-logo');
    const spinnerRing = document.querySelector('.preloader-spinner-ring');
    const targetLogo = document.getElementById('header-logo-target');
    const roadTrack = document.querySelector('.preloader-road-track');
    const textGroup = document.querySelector('.preloader-text-group');

    if (!overlay || !flightWrap || !splashLogo || !targetLogo) {
        document.body.classList.remove('loading-locked');
        return;
    }

    setTimeout(() => {
        // Step 1: Smoothly fade out spinner ring, road track, and tagline
        if (roadTrack) roadTrack.classList.add('preloader-sub-hidden');
        if (textGroup) textGroup.classList.add('preloader-sub-hidden');
        if (spinnerRing) spinnerRing.style.opacity = '0';

        // Step 2: Measure exact centroids between 1:1 circle containers (FLIP)
        const initialRect = flightWrap.getBoundingClientRect();
        const targetRect = targetLogo.getBoundingClientRect();

        const deltaX = (targetRect.left + targetRect.width / 2) - (initialRect.left + initialRect.width / 2);
        const deltaY = (targetRect.top + targetRect.height / 2) - (initialRect.top + initialRect.height / 2);
        const scale = targetRect.width / initialRect.width;

        // Step 3: Trigger Hardware-Accelerated Rolling + Translation + Scale-Down
        requestAnimationFrame(() => {
            splashLogo.classList.add('rolling-active');

            flightWrap.style.transition = 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.82s cubic-bezier(0.4, 0, 0.2, 1)';
            flightWrap.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`;
            flightWrap.style.opacity = '0';

            overlay.classList.add('fade-out');

            setTimeout(() => {
                targetLogo.classList.add('visible');
            }, 620);

            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
                document.body.classList.remove('loading-locked');
            }, 950);
        });
    }, 700);
}

// Trigger once DOM elements and brand assets are loaded
if (document.readyState === 'complete') {
    runRobustPreloader();
} else {
    window.addEventListener('load', runRobustPreloader);
}

// MULTI-PAGE VIEW ROUTER

function switchPage(pageId) {
    // [MODIFIED] Backward-compatible alias in case 'categories' is called anywhere
    const resolvedPageId = (pageId === 'categories') ? 'reach-us' : pageId;

    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    const targetPage = document.getElementById(resolvedPageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    navButtons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(resolvedPageId)) {
            btn.classList.add('active');
        }
    });

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// DYNAMIC FULLSCREEN LIGHTBOX & GALLERY FILTERING ENGINES

let visibleCards = [];
let activeLightboxIndex = 0;

function syncLightboxWithCard(card) {
    if (!card) return;

    const img = card.querySelector('.gallery-image-box img');
    const title = card.querySelector('.gallery-title');
    const desc = card.querySelector('.gallery-desc');
    const tag = card.querySelector('.gallery-tag');

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxBadge = document.getElementById('lightbox-badge');
    const lightboxCounter = document.getElementById('lightbox-counter');

    if (lightboxImg && img) lightboxImg.src = img.src;
    if (lightboxTitle && title) lightboxTitle.innerText = title.innerText;
    if (lightboxDesc && desc) lightboxDesc.innerText = desc.innerText;
    if (lightboxBadge && tag) lightboxBadge.innerText = tag.innerText;
    if (lightboxCounter) lightboxCounter.innerText = `${activeLightboxIndex + 1} / ${visibleCards.length}`;
}

function openDynamicLightbox(cardElement) {
    visibleCards = Array.from(document.querySelectorAll('.gallery-card:not(.gallery-item-hidden)'));
    activeLightboxIndex = visibleCards.indexOf(cardElement);

    if (activeLightboxIndex === -1) activeLightboxIndex = 0;

    syncLightboxWithCard(visibleCards[activeLightboxIndex]);

    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function changeLightboxImage(direction, event) {
    if (event) event.stopPropagation();
    if (!visibleCards.length) return;

    activeLightboxIndex = (activeLightboxIndex + direction + visibleCards.length) % visibleCards.length;
    syncLightboxWithCard(visibleCards[activeLightboxIndex]);
}

// Lightbox keyboard controls
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'ArrowRight') changeLightboxImage(1);
});

// BOOK MOVE FORM

const WHATSAPP_BUSINESS_NUMBER = '918778493877'; // Nova Packers Official WhatsApp Number

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const statusBox = document.getElementById('form-status-msg');

    // 1. Capture Form Inputs
    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const pickup = document.getElementById('cust-pickup').value.trim();
    const drop = document.getElementById('cust-drop').value.trim();
    const pickupFloor = document.getElementById('cust-pickup-floor').value.trim();
    const dropFloor = document.getElementById('cust-drop-floor').value.trim();
    const pickupLift = document.getElementById('cust-pickup-lift').value;
    const dropLift = document.getElementById('cust-drop-lift').value;
    const category = document.getElementById('cust-category').value;
    const rawDate = document.getElementById('cust-date').value;
    const message = document.getElementById('cust-message').value.trim() || 'Not specified';

    // Format date nicely (DD-MM-YYYY) if provided
    let formattedDate = 'Flexible / Not decided';
    if (rawDate) {
        const [year, month, day] = rawDate.split('-');
        formattedDate = `${day}-${month}-${year}`;
    }

    // 2.Build Structured WhatsApp Message Template
    const whatsappMessage = [
        `*NEW MOVING QUOTE REQUEST*`,
        `*Nova Packers & Transport*`,
        `----------------------------------`,
        `*Customer Name:* ${name}`,
        `*Phone Number:* ${phone}`,
        `*Move Category:* ${category}`,
        `*Shifting Date:* ${formattedDate}`,
        `----------------------------------`,
        `*PICKUP DETAILS:*`,
        `• *Address:* ${pickup}`,
        `• *Floor:* ${pickupFloor} (Lift: ${pickupLift})`,
        ``,
        `*DROP DETAILS:*`,
        `• *Address:* ${drop}`,
        `• *Floor:* ${dropFloor} (Lift: ${dropLift})`,
        `----------------------------------`,
        `*Belongings / Heavy Items:*`,
        `${message}`,
        `----------------------------------`,
        `_Please review and share the moving estimate._`
    ].join('\n');

    // 3. URL-Encode Message & Construct wa.me URL
    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedText}`;

    // 4. Update UI Feedback & Trigger Redirect
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp fa-beat"></i> Opening WhatsApp...';

    statusBox.style.display = 'block';
    statusBox.style.backgroundColor = '#d1fae5';
    statusBox.style.color = '#065f46';
    statusBox.style.border = '1px solid #34d399';
    statusBox.innerText = 'Redirecting to WhatsApp with your formatted quote details...';

    // Open WhatsApp in a new tab/app window
    window.open(whatsappUrl, '_blank');

    // Reset button and form after brief delay
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Send Quote Request';
        form.reset();
    }, 1500);
}

// HERO BANNER SLIDER CONTROLS

function manualSlide(sliderKey, index) {
    const carousel = document.querySelector(`.slider-carousel[data-slider="${sliderKey}"]`);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.slide-item');
    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
    });

    const dots = document.querySelectorAll('#hero-slider-dots .slider-dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
    });
}

// DOMContentLoaded: SLIDERS & INSTANT COLLAPSING GALLERY FILTER

document.addEventListener('DOMContentLoaded', () => {
    // Automatically update copyright year in the footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    // [MODIFIED] Gallery Filter Listeners - collapses non-matching cards cleanly using display: none
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) return;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Step 1: Immediately collapse non-matching cards with display:none so grid height recalculates with zero extra space
            galleryCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isMatch = (filter === 'all' || category === filter);

                if (isMatch) {
                    card.classList.remove('gallery-item-hidden');
                    card.classList.add('gallery-fade-out');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.classList.remove('gallery-fade-out');
                        });
                    });
                } else {
                    card.classList.add('gallery-fade-out');
                    card.classList.add('gallery-item-hidden');
                }
            });
        });
    });

    // Auto-rotation engine for all carousels
    const carousels = document.querySelectorAll('.slider-carousel');
    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll('.slide-item');
        if (slides.length <= 1) return;

        let currentIndex = 0;
        const sliderKey = carousel.getAttribute('data-slider');

        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');

            if (sliderKey === 'hero') {
                const dots = document.querySelectorAll('#hero-slider-dots .slider-dot');
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentIndex);
                });
            }
        }, 3500);
    });
});