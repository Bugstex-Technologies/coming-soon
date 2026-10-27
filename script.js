// ==========================================================================
// BUGSTEX TECHNOLOGIES — INTERACTIVE ALIGNMENT TOPOLOGY & UI CONTROLLER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Default Dark)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('bugstex_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('bugstex_theme', next);
    });
  }

  // 3. Ambient Spotlight Cursor Tracking
  const ambientGlow = document.getElementById('ambientGlow');
  window.addEventListener('pointermove', (e) => {
    if (ambientGlow) {
      ambientGlow.style.left = `${e.clientX}px`;
      ambientGlow.style.top = `${e.clientY}px`;
    }
  });

  // 4. Early Access Form Submission
  const notifyForm = document.getElementById('notifyForm');
  const emailInput = document.getElementById('emailInput');
  const formFeedback = document.getElementById('formFeedback');

  if (notifyForm && emailInput && formFeedback) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        formFeedback.textContent = 'ERR // Please enter a valid corporate or institutional email.';
        formFeedback.className = 'form-status error';
        emailInput.focus();
        return;
      }

      try {
        const list = JSON.parse(localStorage.getItem('bugstex_waitlist') || '[]');
        if (!list.includes(email)) {
          list.push(email);
          localStorage.setItem('bugstex_waitlist', JSON.stringify(list));
        }
      } catch (_) {
        // Ignore storage restrictions
      }

      formFeedback.textContent = 'REGISTERED // Priority access request logged.';
      formFeedback.className = 'form-status success';
      emailInput.value = '';
    });
  }

  // 5. Interactive Alignment Topology Canvas
  const canvas = document.getElementById('alignmentCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const coordsEl = document.getElementById('cursorCoords');
  const scoreEl = document.getElementById('readoutScore');
  const driftEl = document.getElementById('readoutDrift');
  const stateEl = document.getElementById('readoutState');

  const AXES = [
    'SAFETY',
    'COMPLIANCE',
    'AUTONOMY',
    'RESILIENCE',
    'OVERSIGHT',
    'FAIRNESS',
    'TRACEABILITY'
  ];

  const PROFILES = {
    autonomous: {
      values: [0.95, 0.88, 0.92, 0.96, 0.91, 0.86, 0.94],
      score: '0.942',
      drift: '\u00B10.014',
      state: 'CONVERGED'
    },
    financial: {
      values: [0.89, 0.98, 0.84, 0.91, 0.95, 0.94, 0.97],
      score: '0.958',
      drift: '\u00B10.009',
      state: 'VERIFIED'
    },
    clinical: {
      values: [0.99, 0.96, 0.93, 0.90, 0.98, 0.95, 0.92],
      score: '0.967',
      drift: '\u00B10.008',
      state: 'OPTIMAL'
    },
    defense: {
      values: [0.96, 0.91, 0.87, 0.99, 0.97, 0.85, 0.96],
      score: '0.949',
      drift: '\u00B10.011',
      state: 'LOCKED'
    }
  };

  let targetValues = [...PROFILES.autonomous.values];
  let currentValues = [...PROFILES.autonomous.values];
  let pointer = { x: 0.5, y: 0.5, active: false };
  let pulsePhase = 0;

  // Profile Switcher Controls
  const profileBtns = document.querySelectorAll('.profile-btn');
  profileBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      profileBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-profile');
      const prof = PROFILES[key];
      if (prof) {
        targetValues = [...prof.values];
        if (scoreEl) scoreEl.textContent = prof.score;
        if (driftEl) driftEl.textContent = prof.drift;
        if (stateEl) stateEl.textContent = prof.state;
      }
    });
  });

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  canvas.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    pointer.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    pointer.active = true;
    if (coordsEl) {
      coordsEl.textContent = `X: ${pointer.x.toFixed(3)} \u00B7 Y: ${pointer.y.toFixed(3)}`;
    }

    // Dynamic readout micro-fluctuation on interaction
    if (scoreEl) {
      const avg = currentValues.reduce((a, b) => a + b, 0) / currentValues.length;
      const mod = (pointer.x - 0.5) * 0.015;
      scoreEl.textContent = Math.min(0.999, Math.max(0.8, avg + mod)).toFixed(3);
    }
  });

  canvas.addEventListener('pointerleave', () => {
    pointer.active = false;
    if (coordsEl) {
      coordsEl.textContent = 'X: 0.500 \u00B7 Y: 0.500';
    }
  });

  function render() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const maxRadius = Math.min(w, h) * 0.36;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    ctx.clearRect(0, 0, w, h);
    pulsePhase += 0.02;

    const ringStroke = isLight ? 'rgba(10, 12, 16, 0.08)' : 'rgba(255, 255, 255, 0.08)';
    const axisStroke = isLight ? 'rgba(10, 12, 16, 0.10)' : 'rgba(255, 255, 255, 0.10)';
    const labelColor = isLight ? 'rgba(10, 12, 16, 0.55)' : 'rgba(245, 246, 248, 0.55)';
    const polyFill = isLight ? 'rgba(10, 12, 16, 0.07)' : 'rgba(245, 246, 248, 0.08)';
    const polyStroke = isLight ? 'rgba(10, 12, 16, 0.85)' : 'rgba(245, 246, 248, 0.88)';
    const nodeColor = isLight ? '#0a0b0e' : '#ffffff';

    const n = AXES.length;

    // Draw concentric reference polygons (4 levels)
    for (let level = 1; level <= 4; level++) {
      const r = (maxRadius / 4) * level;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ringStroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw radial axes & labels
    ctx.font = '500 9.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const xEnd = cx + Math.cos(angle) * maxRadius;
      const yEnd = cy + Math.sin(angle) * maxRadius;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = axisStroke;
      ctx.lineWidth = 1;
      ctx.stroke();

      const labelR = maxRadius + 24;
      const lx = cx + Math.cos(angle) * labelR;
      const ly = cy + Math.sin(angle) * labelR;
      ctx.fillStyle = labelColor;
      ctx.fillText(AXES[i], lx, ly);
    }

    // Interpolate current values toward target + subtle interactive oscillation
    const points = [];
    for (let i = 0; i < n; i++) {
      const wave = Math.sin(pulsePhase + i * 0.9) * 0.015;
      const pointerEffect = pointer.active
        ? ((pointer.x - 0.5) * Math.cos(i) + (pointer.y - 0.5) * Math.sin(i)) * 0.045
        : 0;
      const desired = Math.min(1, Math.max(0.4, targetValues[i] + wave + pointerEffect));
      currentValues[i] += (desired - currentValues[i]) * 0.08;

      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = currentValues[i] * maxRadius;
      points.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r
      });
    }

    // Draw active alignment polygon
    ctx.beginPath();
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fillStyle = polyFill;
    ctx.fill();
    ctx.strokeStyle = polyStroke;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Draw vertex telemetry nodes
    points.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
});
