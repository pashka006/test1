document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky CTA Logic ---
    const heroSection = document.getElementById('hero');
    const stickyCta = document.getElementById('sticky-cta');

    if (heroSection && stickyCta) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    stickyCta.classList.remove('sticky-cta--hidden');
                } else {
                    stickyCta.classList.add('sticky-cta--hidden');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroSection);
    }

    // --- 2. Timer Logic ---
    const timerDisplay = document.getElementById('timer-display');
    const ctaButtons = document.querySelectorAll('.js-cta-btn');
    const DURATION = 15 * 60 * 1000;

    if (timerDisplay) {
        let endTime = localStorage.getItem('primeInvestEndTime');

        if (!endTime) {
            endTime = Date.now() + DURATION;
            localStorage.setItem('primeInvestEndTime', endTime);
        }

        function updateTimer() {
            const now = Date.now();
            const remaining = endTime - now;

            if (remaining <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "00:00";
                ctaButtons.forEach(btn => btn.textContent = "Последний шанс");
                return;
            }

            const minutes = Math.floor((remaining / 1000) / 60);
            const seconds = Math.floor((remaining / 1000) % 60);

            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    // --- 3. Swiper Init ---
    const swiper = new Swiper('.reviews-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    // --- 4. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq__question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');

            // Закрываем все
            faqItems.forEach(el => el.classList.remove('is-active'));

            // Открываем только если был закрыт
            if (!isActive) {
                item.classList.add('is-active');
            }
        });
    });

    // --- 5. Мультишаговая Форма и Валидация ---
    const leadForm = document.getElementById('lead-form');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const successModal = document.getElementById('success-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');

    // Настраиваем маску телефона (iMask)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        IMask(phoneInput, {
            mask: '+{0} (000) 000-00-00',
        });
    }

    // Переход на Шаг 2
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const inputsStep1 = step1.querySelectorAll('input');
            let isStepValid = true;

            // Используем встроенную HTML5 валидацию (checkValidity)
            inputsStep1.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    isStepValid = false;
                }
            });

            if (isStepValid) {
                step1.classList.add('form__step--hidden');
                step2.classList.remove('form__step--hidden');
            }
        });
    }

    // Возврат на Шаг 1
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            step2.classList.add('form__step--hidden');
            step1.classList.remove('form__step--hidden');
        });
    }

    // Отправка формы
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (leadForm.checkValidity()) {
                console.log('Отправка данных...');

                successModal.classList.remove('modal--hidden');

                leadForm.reset();
                step2.classList.add('form__step--hidden');
                step1.classList.remove('form__step--hidden');
            }
        });
    }

    // Закрытие модального окна
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            successModal.classList.add('modal--hidden');
        });
    }

    // Плавный скролл до формы при клике на любые кнопки CTA
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const leadSection = document.getElementById('lead');
            if (leadSection) {
                leadSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});