    console.log('Happy developing ✨')

document.addEventListener('DOMContentLoaded', function() {
    // --- Модальное окно ---
    const ctaButton = document.querySelector('.cta-button');
    const modal = document.getElementById('download-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const closeModal = document.getElementById('close-modal');

    function openModal() {
        if(modal && backdrop) {
            modal.style.display = 'block';
            backdrop.style.display = 'block';
            document.body.classList.add('modal-open');
        }
    }
    function closeModalFunc() {
        if(modal && backdrop) {
            modal.style.display = 'none';
            backdrop.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    if(ctaButton) ctaButton.addEventListener('click', openModal);
    if(closeModal) closeModal.addEventListener('click', closeModalFunc);
    if(backdrop) backdrop.addEventListener('click', closeModalFunc);

    const ctaButtonNav = document.querySelector('.cta-button-nav');
    if (ctaButtonNav) {
        ctaButtonNav.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Предотвращаем отправку формы контактов (демо)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваше сообщение!');
            contactForm.reset();
        });
    }

    // --- Мобильное меню (бургер) ---
    const burger = document.querySelector('.burger');
    const mainNav = document.querySelector('.main-nav');
    if (burger && mainNav) {
        burger.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            burger.classList.toggle('active');
        });
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                burger.classList.remove('active');
            });
        });
    }

    // --- Слайдер ---
    const sliderContainer = document.querySelector('.hero-slider.single-image');
    const sliderTrack = document.querySelector('.slider-track');
    const sliderImages = document.querySelectorAll('.slider-img-16-9');
    const leftArrow = document.querySelector('.slider-arrow.left');
    const rightArrow = document.querySelector('.slider-arrow.right');

    if (sliderTrack && sliderImages.length > 0 && leftArrow && rightArrow) {
        let currentSlide = 0;
        const totalSlides = sliderImages.length;

        const showSlide = (idx) => {
            const offset = -idx * 100;
            sliderTrack.style.transform = `translateX(${offset}%)`;
        };

        leftArrow.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });

        rightArrow.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });

        // Swipe functionality
        let isMouseDown = false;
        let startX;
        let endX;

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (startX - endX > swipeThreshold) {
                rightArrow.click();
            } else if (endX - startX > swipeThreshold) {
                leftArrow.click();
            }
        };

        const onPointerDown = (e) => {
            isMouseDown = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            if (sliderContainer) sliderContainer.style.cursor = 'grabbing';
        };

        const onPointerUp = (e) => {
            if (!isMouseDown) return;
            isMouseDown = false;
            endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
            if (sliderContainer) sliderContainer.style.cursor = 'grab';
            handleSwipe();
        };

        const onPointerLeave = () => {
            if (isMouseDown) {
                isMouseDown = false;
                if (sliderContainer) sliderContainer.style.cursor = 'grab';
            }
        };

        sliderContainer.addEventListener('mousedown', onPointerDown);
        sliderContainer.addEventListener('mouseup', onPointerUp);
        sliderContainer.addEventListener('mouseleave', onPointerLeave);
        sliderContainer.addEventListener('touchstart', onPointerDown, { passive: true });
        sliderContainer.addEventListener('touchend', onPointerUp);
    }
    
    // Включаем анимацию после загрузки страницы
    document.body.classList.add('transitions-ready');

    // --- Scroll reveal для секций ---
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('reveal');
    });
    function revealOnScroll() {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- Анимация кнопок ---
    document.querySelectorAll('.cta-button, .cta-button-nav, .download-link').forEach(btn => {
        btn.addEventListener('mousedown', () => btn.classList.add('bounce'));
        btn.addEventListener('mouseup', () => btn.classList.remove('bounce'));
        btn.addEventListener('mouseleave', () => btn.classList.remove('bounce'));
    });

    // --- Анимация иконок в модальном окне ---
    document.querySelectorAll('.modal .download-link svg').forEach(svg => {
        const parent = svg.closest('.download-link');
        if (parent) {
            parent.addEventListener('mouseenter', () => svg.classList.add('icon-anim'));
            parent.addEventListener('mouseleave', () => svg.classList.remove('icon-anim'));
        }
    });
});
