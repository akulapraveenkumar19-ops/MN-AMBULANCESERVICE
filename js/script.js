/* ==========================================================================
   MN AMBULANCE SERVICE HYDERABAD - VANILLA JAVASCRIPT
   Features: Sticky Header, Mobile Navigation, FAQ Accordions, Form Validation,
   Modal Feedback, Active Links, Back to Top Smooth Scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header on Scroll
  const header = document.querySelector('.main-header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (header) header.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (header) header.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  });

  // Back to Top Button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileClose = document.getElementById('mobileDrawerClose');

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (mobileToggle) mobileToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Mobile Dropdown Toggle
  const mobileDropdownBtn = document.getElementById('mobileDropdownBtn');
  const mobileDropdownContent = document.getElementById('mobileDropdownContent');
  if (mobileDropdownBtn && mobileDropdownContent) {
    mobileDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileDropdownContent.classList.toggle('open');
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // Open first FAQ item by default if available
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAns = firstItem.querySelector('.faq-answer');
    firstItem.classList.add('active');
    if (firstAns) firstAns.style.maxHeight = firstAns.scrollHeight + 'px';
  }

  // Contact / Booking Form Validation & Modal
  const bookingForm = document.getElementById('ambulanceBookingForm');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('patientName');
      const phoneInput = document.getElementById('phoneNumber');
      const locationInput = document.getElementById('pickupLocation');

      let isValid = true;

      if (nameInput && !nameInput.value.trim()) {
        showError(nameInput, 'Please enter patient/caller name');
        isValid = false;
      } else if (nameInput) {
        clearError(nameInput);
      }

      if (phoneInput && !/^[0-9+ ]{10,15}$/.test(phoneInput.value.trim())) {
        showError(phoneInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
      } else if (phoneInput) {
        clearError(phoneInput);
      }

      if (locationInput && !locationInput.value.trim()) {
        showError(locationInput, 'Please specify pickup area or landmark in Hyderabad');
        isValid = false;
      } else if (locationInput) {
        clearError(locationInput);
      }

      if (isValid) {
        if (successModal) successModal.classList.add('active');
        bookingForm.reset();
      }
    });
  }

  function showError(inputEl, msg) {
    const errorEl = inputEl.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
    inputEl.style.borderColor = '#d90429';
  }

  function clearError(inputEl) {
    const errorEl = inputEl.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.style.display = 'none';
    inputEl.style.borderColor = '';
  }

  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  // Close modal on click outside
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.classList.remove('active');
    });
  }

  // Keyboard accessibility (Escape key closes drawers & modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      if (successModal) successModal.classList.remove('active');
    }
  });
});
