// Dynamic copyright year
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Theme Toggle Support (System Preference + LocalStorage)
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('ethica_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ethica_theme', nextTheme);
    });
  }

  // Email Notification Form Handling
  const notifyForm = document.getElementById('notifyForm');
  const emailInput = document.getElementById('emailInput');
  const formFeedback = document.getElementById('formFeedback');

  if (notifyForm && emailInput && formFeedback) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.className = 'form-feedback error';
        emailInput.focus();
        return;
      }

      // Store in localStorage for demonstration / prototype collection
      try {
        const storedEmails = JSON.parse(localStorage.getItem('ethica_subscribers') || '[]');
        if (!storedEmails.includes(email)) {
          storedEmails.push(email);
          localStorage.setItem('ethica_subscribers', JSON.stringify(storedEmails));
        }
      } catch (err) {
        console.error('Storage error', err);
      }

      formFeedback.textContent = "Thank you! You're on the list for early access.";
      formFeedback.className = 'form-feedback success';
      emailInput.value = '';
    });
  }
});
