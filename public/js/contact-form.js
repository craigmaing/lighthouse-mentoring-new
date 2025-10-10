// Form enhancement and spam protection
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitLoading = document.getElementById('submit-loading');
  const messageField = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const formTimeField = document.getElementById('form-time');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  // Record when form was loaded (spam protection - bots submit too fast)
  const formLoadTime = Date.now();
  if (formTimeField) {
    formTimeField.value = formLoadTime.toString();
  }

  // Character counter
  if (messageField && charCount) {
    messageField.addEventListener('input', () => {
      const length = messageField.value.length;
      charCount.textContent = length.toString();

      // Visual feedback when approaching limit
      if (length > 900) {
        charCount.classList.add('text-red-600', 'font-semibold');
      } else {
        charCount.classList.remove('text-red-600', 'font-semibold');
      }
    });
  }

  // Form submission handling
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Spam protection: Check if submitted too quickly (less than 3 seconds)
      const submitTime = Date.now();
      const timeSpent = (submitTime - formLoadTime) / 1000;

      if (timeSpent < 3) {
        console.warn('Form submitted too quickly - possible bot');
        showError();
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      if (submitText) submitText.classList.add('hidden');
      if (submitLoading) submitLoading.classList.remove('hidden');

      // Get form data
      const formData = new FormData(form);

      try {
        // Submit to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
          // Success - redirect to thank you page
          window.location.href = '/thank-you';
        } else {
          showError();
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showError();
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (submitLoading) submitLoading.classList.add('hidden');
      }
    });
  }

  function showError() {
    if (formError) formError.classList.remove('hidden');
    if (formSuccess) formSuccess.classList.add('hidden');

    // Scroll to error message
    if (formError) {
      formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Hide error after 8 seconds
    setTimeout(() => {
      if (formError) formError.classList.add('hidden');
    }, 8000);
  }

  // Email validation enhancement
  const emailField = document.getElementById('email');
  if (emailField) {
    emailField.addEventListener('blur', () => {
      const email = emailField.value;
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (email && !isValid) {
        emailField.setCustomValidity('Please enter a valid email address');
        emailField.reportValidity();
      } else {
        emailField.setCustomValidity('');
      }
    });
  }
});
