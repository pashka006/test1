document.addEventListener('DOMContentLoaded', () => {

// ======================
// 1. Sticky CTA (fixed)
// ======================
    const heroButton = document.querySelector('#hero .js-cta-btn');
    const stickyCta = document.getElementById('sticky-cta');

    if (heroButton && stickyCta) {

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {

                    // если кнопка ВИДНА → скрываем sticky
                    if (entry.isIntersecting) {
                        stickyCta.classList.add('sticky-cta--hidden');
                    }
                    // если кнопка НЕ ВИДНА → показываем sticky
                    else {
                        stickyCta.classList.remove('sticky-cta--hidden');
                    }

                });
            },
            {
                threshold: 0
            }
        );

        observer.observe(heroButton);
    }
    // ======================
    // 2. Timer Logic
    // ======================
    const timerDisplay = document.getElementById('timer-display');
    const ctaButtons = document.querySelectorAll('.js-cta-btn');
    const DURATION = 15 * 60 * 1000;

    if (timerDisplay) {
        let endTime = localStorage.getItem('primeInvestEndTime');

        if (!endTime) {
            endTime = Date.now() + DURATION;
            localStorage.setItem('primeInvestEndTime', endTime);
        }

        endTime = Number(endTime);

        function updateTimer() {
            const now = Date.now();
            const remaining = endTime - now;

            if (remaining <= 0) {
                timerDisplay.textContent = "00:00";

                ctaButtons.forEach(btn => {
                    btn.textContent = "Последний шанс";
                });

                return;
            }

            const minutes = Math.floor(remaining / 1000 / 60);
            const seconds = Math.floor((remaining / 1000) % 60);

            timerDisplay.textContent =
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    // ======================
    // 3. Swiper
    // ======================
    const swiper = new Swiper('.reviews-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    // ======================
    // 4. FAQ Accordion
    // ======================
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq__question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');

            faqItems.forEach(el => el.classList.remove('is-active'));

            if (!isActive) {
                item.classList.add('is-active');
            }
        });
    });

    // ======================
    // 5. Form logic
    // ======================
    const leadForm = document.getElementById('lead-form');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const successModal = document.getElementById('success-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');

    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        IMask(phoneInput, {
            mask: '+{0} (000) 000-00-00'
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const inputs = step1.querySelectorAll('input');
            let valid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    valid = false;
                }
            });

            if (valid) {
                step1.classList.add('form__step--hidden');
                step2.classList.remove('form__step--hidden');
            }
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            step2.classList.add('form__step--hidden');
            step1.classList.remove('form__step--hidden');
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (leadForm.checkValidity()) {
                successModal.classList.remove('modal--hidden');

                leadForm.reset();

                step2.classList.add('form__step--hidden');
                step1.classList.remove('form__step--hidden');
            }
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            successModal.classList.add('modal--hidden');
        });
    }

    // ======================
    // 6. CTA scroll
    // ======================
    const ctaButtonsAll = document.querySelectorAll('.js-cta-btn');

    ctaButtonsAll.forEach(btn => {
        btn.addEventListener('click', () => {
            const leadSection = document.getElementById('lead');

            if (leadSection) {
                leadSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // 7. Fade-in animation
    // ======================
    setTimeout(() => {
        const elements = document.querySelectorAll('.fade-in');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            elements.forEach(el => observer.observe(el));
        } else {
            elements.forEach(el => el.classList.add('is-visible'));
        }
    }, 100);

});