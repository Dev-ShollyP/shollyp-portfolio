// Olushola Shotayo (Sholly P) - Portfolio Application
// Integrating Three.js / Canvas Physics, Split Typewriter, Filter Tabs, and Modal Viewers

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initNavScroll();
  renderToolRibbon();
  renderProjects('all');
  renderXPosts();
  renderPhilosophy();
  initFilterTabs();
  initModalListeners();
  initContactActions();
  syncVideoSources();
  lucide.createIcons();
});

/* ==========================================================================
   1. Antigravity Particle Simulation (Canvas 2D Physics)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('hero-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const particleCount = Math.min(Math.floor((width * height) / 12000), 75);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      size: Math.random() * 2.5 + 1.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.45 + 0.15
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Natural Brownian floating
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse repulsion & elasticity
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force * 5;
        p.y -= Math.sin(angle) * force * 5;
      }

      // Draw particle with Imperial Blue
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(2, 31, 148, ${p.alpha})`;
      ctx.fill();

      // Soft connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(2, 31, 148, ${0.09 * (1 - dist2 / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    "WhatsApp AI Assistants",
    "Autonomous n8n Workflows",
    "Vapi Voice Agents",
    "Educational AI Videos",
    "Multi-Tenant Architectures",
    "Business CRM Pipelines"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 450; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll & Mobile Menu
   ========================================================================== */
function initNavScroll() {
  const nav = document.querySelector('.glass-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* ==========================================================================
   4. Tool Stack Ribbon (Antigravity Sinusoidal Wave)
   ========================================================================== */
function renderToolRibbon() {
  const track = document.getElementById('tool-ribbon-track');
  if (!track) return;

  const tools = PORTFOLIO_DATA.skills.toolStack;
  // Duplicate for seamless infinite loop
  const duplicated = [...tools, ...tools];

  track.innerHTML = duplicated.map(tool => `
    <div class="tool-ribbon-item">
      <span class="w-2 h-2 rounded-full" style="background-color: var(--color-imperial-blue);"></span>
      <span>${tool.name}</span>
      <span class="text-xs text-slate-400 font-mono">(${tool.category})</span>
    </div>
  `).join('');
}

/* ==========================================================================
   5. Project Cards Render & Filter Tabs
   ========================================================================== */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

function renderProjects(category) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = category === 'all' 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => p.category === category);

  container.innerHTML = filtered.map(project => {
    const hasVideo = !!project.videoUrl;
    const isVideoThumb = project.previewImage && project.previewImage.endsWith('.mp4');
    const thumbImage = project.previewImage || project.gallery?.[0]?.url || 'Gym Workflow/Airtable Interface.png';

    return `
      <article class="case-study-card group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all" data-project-id="${project.id}">
        <!-- Visual Thumbnail / Video Trigger -->
        <div class="case-study-thumb cursor-pointer relative" onclick="openProjectModal('${project.id}')">
          ${isVideoThumb ? `
            <video preload="metadata" muted playsinline class="w-full h-full object-cover">
              <source src="${getVideoUrl(project.videoUrl)}#t=1.5" type="video/mp4">
            </video>
          ` : `
            <img src="${thumbImage}" alt="${project.title}" loading="lazy" class="w-full h-full object-cover" />
          `}
          
          ${hasVideo ? `
            <div class="video-play-overlay">
              <div class="play-circle">
                <i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>
              </div>
            </div>
            <span class="absolute bottom-3 right-3 text-xs bg-slate-900/80 text-white px-2.5 py-1 rounded-md backdrop-blur font-mono">
              ▶ Video Preview
            </span>
          ` : `
            <div class="video-play-overlay opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="play-circle">
                <i data-lucide="maximize-2" class="w-5 h-5"></i>
              </div>
            </div>
          `}

          <div class="absolute top-3 left-3">
            <span class="badge-category">
              ${project.categoryLabel}
            </span>
          </div>
        </div>

        <!-- Content Area (Tejiri Style: Short, Clean & Scannable) -->
        <div class="p-6 md:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#021F94] transition-colors mb-1">
              ${project.title}
            </h3>
            <p class="text-sm text-slate-500 mb-5 leading-relaxed">
              ${project.tagline}
            </p>

            <!-- Structured The Need & The Solution (Concise 2-Liners) -->
            <div class="space-y-4 mb-5">
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">THE NEED</div>
                <p class="text-sm text-slate-700 leading-relaxed">${project.need}</p>
              </div>
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">THE SOLUTION</div>
                <p class="text-sm text-slate-700 leading-relaxed">${project.solution}</p>
              </div>
            </div>
          </div>

          <div>
            <!-- Tech Stack Badges -->
            <div class="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-slate-100">
              ${project.stack.map(tech => `
                <span class="badge-convolvulus">${tech}</span>
              `).join('')}
            </div>

            <!-- Card Actions -->
            <div class="flex items-center gap-2">
              ${project.id === 'churchflow-ai' ? `
                <button onclick="openSimulatorModal('churchflow')" class="btn-primary text-xs sm:text-sm py-2 px-3 flex-1 flex items-center justify-center gap-1.5 bg-[#00a884] hover:bg-[#008f6f] border-transparent shadow-sm" title="Launch WhatsApp Simulator">
                  <i data-lucide="message-square" class="w-4 h-4"></i>
                  <span>Try Simulator</span>
                </button>
                <button onclick="openProjectModal('${project.id}')" class="btn-secondary text-xs sm:text-sm py-2 px-3">
                  <span>Details</span>
                </button>
              ` : `
                <button onclick="openProjectModal('${project.id}')" class="btn-primary flex-1 text-sm py-2.5">
                  <i data-lucide="${hasVideo ? 'play-circle' : 'layers'}" class="w-4 h-4"></i>
                  ${hasVideo ? 'Watch Video & Overview' : 'View Workflow'}
                </button>
              `}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  lucide.createIcons();
}

/* ==========================================================================
   6. Interactive Project Modal (Deep Dive, Video Player & Gallery)
   ========================================================================== */
function initModalListeners() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }
}

function openProjectModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-body');
  if (!modal || !modalContent) return;

  const hasVideo = !!project.videoUrl;
  const hasGallery = project.gallery && project.gallery.length > 0;

  modalContent.innerHTML = `
    <!-- Modal Header -->
    <div class="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="badge-glass">${project.categoryLabel}</span>
          <span class="text-xs text-slate-400 font-mono">Case Study Breakdown</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">${project.title}</h2>
        <p class="text-sm md:text-base text-slate-600 mt-2">${project.tagline}</p>
      </div>
      <button onclick="closeProjectModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>

    <!-- Modal Media Player Section -->
    <div class="p-6 md:p-8 space-y-6">
      ${hasVideo ? `
        <div class="rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-800">
          <video id="modal-video-player" controls autoplay class="w-full max-h-[460px] object-contain">
            <source src="${getVideoUrl(project.videoUrl)}" type="video/mp4">
            Your browser does not support video playback.
          </video>
        </div>
        ${project.secondaryVideoUrl ? `
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alternate Cut:</span>
            <button onclick="switchModalVideo('${project.secondaryVideoUrl}')" class="text-xs text-[#021F94] font-semibold underline hover:text-[#011566]">
              Play Alternate Walkthrough (Gym Spec.mp4)
            </button>
          </div>
        ` : ''}
      ` : ''}

      <!-- Interactive Simulator Banner for ChurchFlow -->
      ${project.id === 'churchflow-ai' ? `
        <div class="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-[#00a884] text-white flex items-center justify-center shrink-0 shadow-sm">
              <i data-lucide="message-square" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="text-base font-bold text-slate-900">Experience ChurchFlow Live</div>
              <div class="text-xs text-slate-600 mt-0.5">Test real-time prayer requests, bank accounts, service reminders, and scriptures in our interactive WhatsApp simulator.</div>
            </div>
          </div>
          <button onclick="openSimulatorModal('churchflow')" class="btn-primary text-xs py-2.5 px-4 shrink-0 bg-[#00a884] hover:bg-[#008f6f] border-transparent shadow-sm flex items-center gap-1.5">
            <span>Launch Live Simulator</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      ` : ''}

      <!-- Gallery / Screenshots -->
      ${hasGallery ? `
        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Workflow Diagrams & Interface Artifacts</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${project.gallery.map(item => `
              <div class="group rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                <a href="${item.url}" target="_blank" class="block relative overflow-hidden">
                  <img src="${item.url}" alt="${item.title}" class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Click to Open Full Res ↗
                  </div>
                </a>
                <div class="p-3 bg-white text-xs font-medium text-slate-700 border-t border-slate-100 flex items-center justify-between">
                  <span>${item.title}</span>
                  <span class="text-slate-400 font-mono">Zoom</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Need & Solution Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">THE NEED</div>
          <p class="text-sm text-slate-700 leading-relaxed mb-5">${project.need}</p>

          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">THE SOLUTION</div>
          <p class="text-sm text-slate-700 leading-relaxed">${project.solution}</p>
        </div>

        <div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            ${project.capabilities ? 'WITH THE ASSISTANT, YOU CAN:' : 'KEY OUTCOMES'}
          </div>
          <ul class="space-y-2 mb-6">
            ${(project.capabilities || project.highlights).map(h => `
              <li class="flex items-start gap-2 text-sm text-slate-700">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>

          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">TOOLS USED</div>
          <div class="flex flex-wrap gap-1.5">
            ${project.stack.map(tech => `<span class="badge-convolvulus">${tech}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Modal Footer CTA -->
      <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <a href="${PORTFOLIO_DATA.profile.socials.whatsappUrl}" target="_blank" class="btn-primary">
          <i data-lucide="message-square" class="w-4 h-4"></i>
          Discuss a Similar Build with Sholly P
        </a>
        <button onclick="closeProjectModal()" class="btn-secondary">
          Close Window
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function switchModalVideo(newSrc) {
  const player = document.getElementById('modal-video-player');
  if (player) {
    player.src = newSrc;
    player.play();
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const player = document.getElementById('modal-video-player');
  if (player) {
    player.pause();
    player.src = "";
  }
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function openDirectVideoModal(title, videoUrl, subtitle, description) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-body');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="badge-glass">AI Video Showcase</span>
          <span class="text-xs text-slate-400 font-mono">Video Production</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">${title}</h2>
        <p class="text-sm md:text-base text-slate-600 mt-2">${subtitle || 'Creative AI video direction and sound design by Sholly P.'}</p>
      </div>
      <button onclick="closeProjectModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>

    <div class="p-6 md:p-8 space-y-6">
      <div class="rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-800">
        <video id="modal-video-player" controls autoplay class="w-full max-h-[500px] object-contain">
          <source src="${getVideoUrl(videoUrl)}" type="video/mp4">
          Your browser does not support video playback.
        </video>
      </div>

      ${description ? `
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p class="text-sm text-slate-700 leading-relaxed">${description}</p>
        </div>
      ` : ''}

      <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <a href="${PORTFOLIO_DATA.profile.socials.whatsappUrl}" target="_blank" class="btn-primary">
          <i data-lucide="video" class="w-4 h-4"></i>
          Commission an AI Video with Sholly P
        </a>
        <button onclick="closeProjectModal()" class="btn-secondary">
          Close Window
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

/* ==========================================================================
   7. Curated X (Twitter) Posts Section
   ========================================================================== */
function renderXPosts() {
  const container = document.getElementById('x-posts-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.xPosts.map(post => `
    <div class="glass-card p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-4">
          <div class="flex items-center gap-3">
            <img src="${PORTFOLIO_DATA.profile.avatar}" alt="Olushola Shotayo" class="w-10 h-10 rounded-full object-cover border border-[#021F94]/20" />
            <div>
              <div class="text-sm font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                ${PORTFOLIO_DATA.profile.name}
                <span class="text-[#021F94] font-bold text-xs">✓</span>
              </div>
              <div class="text-xs text-slate-500 font-mono">${PORTFOLIO_DATA.profile.socials.xHandle}</div>
            </div>
          </div>
          <span class="badge-glass text-[11px]">${post.badge}</span>
        </div>

        <p class="text-sm text-slate-800 leading-relaxed mb-4">
          ${post.text}
        </p>

        <div class="flex flex-wrap gap-1.5 mb-5">
          ${post.tags.map(t => `<span class="text-xs font-mono text-[#021F94] bg-blue-50/80 px-2 py-0.5 rounded">${t}</span>`).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs text-slate-400 font-mono">${post.date}</span>
        <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-semibold text-[#021F94] hover:underline">
          View on X <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   8. Philosophy & Core Learnings (Bento Grid)
   ========================================================================== */
function renderPhilosophy() {
  const container = document.getElementById('philosophy-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.philosophy.map((item, idx) => `
    <div class="glass-card p-6 md:p-8 flex flex-col justify-between ${idx === 0 || idx === 1 ? 'md:col-span-1' : ''}">
      <div>
        <div class="text-2xl font-mono font-bold text-[#021F94]/30 mb-2">${item.num}</div>
        <h3 class="text-lg md:text-xl font-bold text-slate-900 mb-3">${item.title}</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${item.desc}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   9. Fast Contact & Clipboard Actions
   ========================================================================== */
function initContactActions() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.socials.email).then(() => {
        showToast("Email address copied: " + PORTFOLIO_DATA.profile.socials.email);
      });
    });
  });

  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.socials.whatsapp).then(() => {
        showToast("WhatsApp number copied: " + PORTFOLIO_DATA.profile.socials.whatsapp);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> <span>${message}</span>`;
  lucide.createIcons();
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   10. Sync Video Sources with Supabase Storage if configured
   ========================================================================== */
function syncVideoSources() {
  if (typeof SUPABASE_STORAGE_BASE === 'string' && SUPABASE_STORAGE_BASE.trim() !== '') {
    document.querySelectorAll('video source[data-video-file]').forEach(source => {
      const filename = source.getAttribute('data-video-file');
      if (filename) {
        source.src = getVideoUrl(filename);
        if (source.parentElement) {
          source.parentElement.load();
        }
      }
    });
  }
}

/* ==========================================================================
   11. Interactive Automation Simulator (ChurchFlow AI WhatsApp Assistant)
   ========================================================================== */
function openSimulatorModal(type) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-body');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="p-4 sm:p-5 bg-[#075E54] text-white flex items-center justify-between gap-4 rounded-t-2xl shadow-md">
      <div class="flex items-center gap-3">
        <div class="relative">
          <img src="./ChurchFlow WhatsApp UI.png" alt="EVF Bot" class="w-11 h-11 rounded-full object-cover border-2 border-white/40 shadow-sm" />
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
        </div>
        <div>
          <div class="text-base font-bold flex items-center gap-1.5">
            <span>EVF Bot</span>
            <span class="text-[11px] bg-emerald-400/20 text-emerald-200 px-1.5 py-0.5 rounded font-mono">RCCG Everflourishing</span>
          </div>
          <div class="text-xs text-emerald-100/90 font-medium flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
            <span>online · WhatsApp Business AI Assistant</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a href="tel:+2348083708357" class="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors" title="Call Pastoral Line">
          <i data-lucide="phone" class="w-5 h-5"></i>
        </a>
        <button onclick="closeProjectModal()" class="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors" title="Close Simulator">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>
    </div>

    <div class="wa-chat-container p-4 sm:p-6 flex flex-col justify-between" style="min-height: 520px; max-height: 78vh;">
      <!-- Chat History Stream -->
      <div id="wa-chat-stream" class="overflow-y-auto space-y-3.5 pr-1 max-h-[390px] scrollbar-thin">
        <!-- Initial Bot Message with Flyer & Interactive Buttons -->
        <div class="flex items-start gap-2 max-w-[92%] sm:max-w-[82%]">
          <div class="wa-bubble-bot p-3 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-sm">
            <img src="./ChurchFlow WhatsApp UI.png" alt="Welcome to EVF Sanctuary" class="w-full max-h-52 object-cover rounded-lg mb-2.5 border border-white/10" />
            <div class="font-bold text-emerald-400 mb-1 text-sm sm:text-base">🎉 WELCOME TO RCCG EVERFLOURISHING MEGA SANCTUARY! 🎉</div>
            <p class="text-slate-200">We are overjoyed to have you join us! At EVF Sanctuary, you are family, and we believe God brought you here for a glorious purpose.</p>
            
            <div class="mt-2.5 pt-2 border-t border-white/10">
              <p class="text-[11px] text-slate-300 mb-2 font-medium">How may we assist you today? Tap a quick option below, or type your message:</p>
              <div class="flex flex-wrap gap-1.5">
                <button onclick="handleChurchflowChip('Check service times and upcoming events')" class="px-2.5 py-1.5 rounded-lg bg-[#00A884]/20 hover:bg-[#00A884]/40 text-emerald-300 text-xs font-medium border border-emerald-500/30 flex items-center gap-1 transition-all">
                  <span>⏰ Service Times</span>
                </button>
                <button onclick="handleChurchflowChip('Access church bank details')" class="px-2.5 py-1.5 rounded-lg bg-[#00A884]/20 hover:bg-[#00A884]/40 text-emerald-300 text-xs font-medium border border-emerald-500/30 flex items-center gap-1 transition-all">
                  <span>💳 Giving & Tithes</span>
                </button>
                <button onclick="handleChurchflowChip('Register as a first-timer')" class="px-2.5 py-1.5 rounded-lg bg-[#00A884]/20 hover:bg-[#00A884]/40 text-emerald-300 text-xs font-medium border border-emerald-500/30 flex items-center gap-1 transition-all">
                  <span>👋 I\'m New Here</span>
                </button>
              </div>
            </div>

            <div class="text-[10px] text-slate-400 text-right mt-2 font-mono">Just now</div>
          </div>
        </div>

        <!-- Capability Overview Bubble -->
        <div class="flex items-start gap-2 max-w-[92%] sm:max-w-[82%]">
          <div class="wa-bubble-bot p-3 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-sm">
            <p class="font-bold text-emerald-400 mb-1.5">With this assistant, you can:</p>
            <div class="text-slate-200 space-y-1 text-xs sm:text-sm">
              <div>✅ Submit personal prayer requests</div>
              <div>✅ Access church bank details</div>
              <div>✅ Check service times and upcoming events</div>
              <div>✅ Receive service reminders</div>
              <div>✅ Register as a first-timer</div>
              <div>✅ Connect with pastoral support</div>
              <div>✅ Explore Bible books, chapters, and verses</div>
              <div>✅ Get Bible verses for different situations</div>
            </div>
            <div class="text-[10px] text-slate-400 text-right mt-2 font-mono">Just now</div>
          </div>
        </div>
      </div>

      <!-- Quick Action Chips Carousel -->
      <div class="mt-3 pt-2.5 border-t border-white/10">
        <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Tap Feature Chip to Test Live Workflow:</span>
          </div>
          <span class="text-emerald-400 font-mono text-[10px]">Real n8n Logic</span>
        </div>
        <div class="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
          <button onclick="handleChurchflowChip('Submit personal prayer requests')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">🙏 Prayer Requests</button>
          <button onclick="handleChurchflowChip('Access church bank details')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">🏛️ Bank Details</button>
          <button onclick="handleChurchflowChip('Check service times and upcoming events')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">⏰ Service Times</button>
          <button onclick="handleChurchflowChip('Receive service reminders')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">🔔 Service Reminders</button>
          <button onclick="handleChurchflowChip('Register as a first-timer')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">👋 First-Timer Welcome</button>
          <button onclick="handleChurchflowChip('Connect with pastoral support')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">🤝 Pastoral Support</button>
          <button onclick="handleChurchflowChip('Explore Bible books, chapters, and verses')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">📖 Bible Quiz & Verses</button>
          <button onclick="handleChurchflowChip('Get Bible verses for different situations')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">✨ Verses for Situations</button>
          <button onclick="handleChurchflowChip('Where is the church located?')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">📍 Location & GPS</button>
          <button onclick="handleChurchflowChip('RCCG Anthem lyrics')" class="wa-chip-btn px-2.5 py-1.5 rounded-lg text-xs font-medium">🎵 RCCG Anthem</button>
        </div>
      </div>

      <!-- Chat Input Field -->
      <form onsubmit="handleChurchflowSubmit(event)" class="mt-3 flex items-center gap-2">
        <input type="text" id="wa-custom-input" placeholder="Type a message (e.g. prayer, account number, service times, quiz)..." class="flex-1 bg-[#202C33] text-white placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500" />
        <button type="submit" class="bg-[#00A884] hover:bg-[#008F6F] text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-sm" title="Send message">
          <i data-lucide="send" class="w-4 h-4"></i>
        </button>
        <button type="button" onclick="resetChurchflowChat()" class="text-slate-400 hover:text-white p-2.5 text-xs font-medium shrink-0" title="Reset chat">
          <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
        </button>
      </form>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

/* Helper functions for ChurchFlow Simulator */
function handleChurchflowChip(text) {
  sendChurchflowMessage(text);
}

function handleChurchflowSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('wa-custom-input');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = '';
  sendChurchflowMessage(text);
}

function sendChurchflowMessage(userText) {
  const stream = document.getElementById('wa-chat-stream');
  if (!stream) return;

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add User bubble
  const userDiv = document.createElement('div');
  userDiv.className = 'flex items-start justify-end gap-2';
  userDiv.innerHTML = `
    <div class="wa-bubble-user p-3 sm:p-4 text-xs sm:text-sm leading-relaxed max-w-[88%] sm:max-w-[78%]">
      <p>${escapeHtml(userText)}</p>
      <div class="text-[10px] text-emerald-200/80 text-right mt-1 font-mono flex items-center justify-end gap-1">
        <span>${now}</span>
        <span class="text-blue-300">✓✓</span>
      </div>
    </div>
  `;
  stream.appendChild(userDiv);
  stream.scrollTop = stream.scrollHeight;

  // Add Typing Indicator
  const typingDiv = document.createElement('div');
  typingDiv.id = 'wa-typing-bubble';
  typingDiv.className = 'flex items-start gap-2 max-w-[88%] sm:max-w-[78%]';
  typingDiv.innerHTML = `
    <div class="wa-bubble-bot px-4 py-2.5 text-xs text-slate-400 italic font-mono flex items-center gap-1.5">
      <span>EVF Bot is typing</span>
      <span class="animate-pulse">...</span>
    </div>
  `;
  stream.appendChild(typingDiv);
  stream.scrollTop = stream.scrollHeight;

  // Compute intelligent response strictly aligned with ChurchFlow.json workflow logic
  let botReply = "";
  const lower = userText.toLowerCase().trim();

  // 1. Off-topic / Non-faith Guardrail (as defined in ChurchFlow.json node 0)
  const isNonFaith = /\b(python|javascript|coding|programming|write.*code|write.*script|crypto|bitcoin|forex|homework|solve.*equation)\b/i.test(lower);
  const isFaithQuery = /service|church|hymn|bible|scripture|prayer|pastor|rccg|jesus|god|giving|tithe|offering/i.test(lower);

  if (isNonFaith && !isFaithQuery) {
    botReply = `I am EVF Bot, the official church assistant for <strong>RCCG Everflourishing Mega Sanctuary</strong> 🙏<br/><br/>I am dedicated exclusively to helping you with church services, upcoming programs, prayer requests, hymns, and spiritual guidance.<br/><br/>How may I assist you with our church services or prayers today? ✨`;
  }
  // 2. Church Giving & Tithes (Access Bank & UBA as verified in ChurchFlow.json node 4)
  else if (lower.includes('bank') || lower.includes('give') || lower.includes('giving') || lower.includes('tithe') || lower.includes('offering') || lower.includes('account number') || lower.includes('account')) {
    botReply = `💳 <strong>CHURCH GIVING & TITHES</strong><br/><br/>
🏛️ <strong>Tithe & Offering Account</strong><br/>
• <strong>Bank:</strong> Access Bank<br/>
• <strong>Account Number:</strong> <code class="bg-black/40 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">0695126926</code><br/>
• <strong>Account Name:</strong> RCCG Everflourishing Parish<br/><br/>
🏗️ <strong>Building Project Account</strong><br/>
• <strong>Bank:</strong> United Bank for Africa (UBA)<br/>
• <strong>Account Number:</strong> <code class="bg-black/40 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">1028494770</code><br/>
• <strong>Account Name:</strong> RCCG EVERFLOURISHING PROJECT<br/><br/>
<em>"God bless you abundantly as you give to His work!"</em> ✨`;
  }
  // 3. Service Times & Upcoming Programs (exact weekly schedule & special encounters in ChurchFlow.json)
  else if (lower.includes('service') || lower.includes('time') || lower.includes('event') || lower.includes('schedule') || lower.includes('program') || lower.includes('sunday') || lower.includes('tuesday') || lower.includes('thursday') || lower.includes('today')) {
    botReply = `🏛️ <strong>RCCG EVERFLOURISHING SERVICE SCHEDULE</strong><br/><br/>
🗓️ <strong>Weekly Regular Services:</strong><br/>
• <strong>Sundays:</strong><br/>
&nbsp;&nbsp;• 1st Service: <strong>8:00 AM</strong><br/>
&nbsp;&nbsp;• Sunday School: <strong>9:45 AM</strong><br/>
&nbsp;&nbsp;• 2nd Service: <strong>10:15 AM</strong><br/>
• <strong>Tuesdays (Digging Deep Bible Study):</strong> 6:00 PM – 7:30 PM<br/>
• <strong>Thursdays (Faith Clinic Miracle & Deliverance):</strong> 6:00 PM – 7:00 PM<br/><br/>
📍 <strong>Location:</strong> Main Sanctuary<br/>
7, Powerline Street, Moshalashi B/Stop, Iyana Iyesi, Ota, Ogun State<br/><br/>
✨ <strong>Upcoming Special Program:</strong><br/>
• <strong>Divine Encounter:</strong> <em>"Cover My Nakedness, Oh Lord"</em><br/>
📖 <strong>Scripture:</strong> <em>"And the Lord shall guide thee continually, and satisfy thy soul in drought, and make fat thy bones." — Isaiah 58:11</em><br/><br/>
<em>Come expectant — God has something special for you!</em> 🙌`;
  }
  // 4. First-Timer Flow & Registration (prompts for Name, Location, Prayer in ChurchFlow.json node 4b)
  else if (lower.includes('first-timer') || lower.includes('first timer') || lower.includes('new here') || lower.includes("i'm new") || lower.includes('im new') || lower.includes('register as a first-timer')) {
    botReply = `🎉 <strong>WELCOME TO RCCG EVERFLOURISHING MEGA SANCTUARY!</strong> 🎉<br/><br/>
We are overjoyed to have you join us! At EVF Sanctuary, you are family, and we believe God brought you here for a glorious purpose.<br/><br/>
✨ <strong>Our Regular Weekly Services:</strong><br/>
• <strong>Sundays:</strong> 1st Service @ 8:00 AM | Sunday School @ 9:45 AM | 2nd Service @ 10:15 AM<br/>
• <strong>Tuesdays (Digging Deep):</strong> 6:00 PM – 7:30 PM<br/>
• <strong>Thursdays (Faith Clinic):</strong> 6:00 PM – 7:00 PM<br/><br/>
📍 <strong>Location:</strong> Main Sanctuary, 7, Powerline Street, Moshalashi B/Stop, Iyana Iyesi, Ota<br/><br/>
We would love to get to know you better! Please reply to us with:<br/>
1️⃣ <strong>Your Full Name</strong><br/>
2️⃣ <strong>Your Residential Location / Area</strong><br/>
3️⃣ <strong>Any Prayer Request you would like us to pray for</strong><br/><br/>
<em>God bless you richly!</em> 🙏`;
  }
  // 4b. Visitor introducing name / location in response to first-timer prompt
  else if (lower.startsWith('my name is') || lower.startsWith('i am') || lower.includes('living in') || lower.includes('from ota') || lower.includes('located at')) {
    botReply = `God bless you richly! 🙌 We have logged your information into our ChurchFlow Supabase directory and notified our Hospitality and Follow-up team. You are warmly welcomed as an honoured part of the Everflourishing family!<br/><br/>
📖 <em>"The Lord bless thee, and keep thee: The Lord make his face shine upon thee, and be gracious unto thee." — Numbers 6:24-25</em><br/><br/>
Feel free to ask for any prayer requests, counseling, or service details at any time! ✨`;
  }
  // 5. Personal Prayer Requests (logs to pastoral council & intercessory prayer team)
  else if (lower.includes('prayer') || lower.includes('pray') || lower.includes('intercession') || lower.includes('sick') || lower.includes('heal') || lower.includes('request')) {
    botReply = `🙏 <strong>Prayer Request Received & Logged</strong><br/><br/>
Your prayer request has been received and forwarded directly to our Intercessory Prayer Council and Pastoral Team. The ministers are lifting your situation up before the Throne of Grace in faith.<br/><br/>
📖 <em>"The prayer of faith shall save the sick, and the Lord shall raise him up." — James 5:15</em><br/><br/>
📖 <em>"Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known unto God." — Philippians 4:6</em><br/><br/>
<em>We stand in agreement with you. May the Lord answer you speedily and grant your heart's desires!</em> 🙌`;
  }
  // 6. Automated Service Reminders (runs on WAT cron broadcast engine)
  else if (lower.includes('reminder') || lower.includes('broadcast') || lower.includes('notification')) {
    botReply = `🔔 <strong>Automated Service Reminders Active!</strong><br/><br/>
Your WhatsApp line is enrolled in our automated broadcast queue (powered by our n8n scheduled workflow). You will automatically receive:<br/><br/>
• <strong>Sunday Service alert & flyer:</strong> Delivered at 7:00 AM WAT<br/>
• <strong>Tuesday Digging Deep alert:</strong> Delivered at 5:00 PM WAT<br/>
• <strong>Special program broadcasts:</strong> Delivered with theme flyers, scriptures, and venue directions.<br/><br/>
<em>Never miss an encounter in God's presence!</em> ✨`;
  }
  // 7. Pastoral Support & Counseling
  else if (lower.includes('pastor') || lower.includes('counsel') || lower.includes('counseling') || lower.includes('hotline') || lower.includes('minister') || lower.includes('talk to a pastor') || lower.includes('support')) {
    botReply = `🤝 <strong>PASTORAL SUPPORT & SPIRITUAL COUNSELING</strong><br/><br/>
Our Pastoral Council and ordained ministers are available to provide spiritual guidance, prayers, and confidential pastoral care.<br/><br/>
📞 <strong>Pastoral Care Hotline:</strong> <a href="tel:+2348083708357" class="text-emerald-300 underline font-semibold">+234 808 370 8357</a><br/>
🏢 <strong>Sanctuary Office:</strong> 7, Powerline Street, Moshalashi B/Stop, Iyana Iyesi, Ota, Ogun State<br/><br/>
You can also type your counseling need directly here, and a designated pastoral minister will reach out to you in privacy. 🙏`;
  }
  // 8. Bible Books, Chapters, Verses & Interactive Bible Quiz
  else if (lower.includes('quiz') || lower.includes('trivia') || lower.includes('jonah') || lower.includes('zacchaeus') || lower.includes('sycamore')) {
    if (lower.includes('jonah')) {
      botReply = `🎉 <strong>Spot on! That is 100% correct!</strong> It was the Prophet Jonah (Jonah 1:17) who was swallowed by a great fish when running from God\'s call. Excellent Bible knowledge!<br/><br/>
Ready for the next question? 🌳 <em>"Who was the short chief tax collector who climbed a sycamore tree to see Jesus passing through Jericho?"</em>`;
    } else if (lower.includes('zacchaeus') || lower.includes('sycamore')) {
      botReply = `🌟 <strong>Hallelujah! Correct again!</strong> It was Zacchaeus (Luke 19:1-4)! Jesus saw him, stayed at his home, and salvation came to his household that day.<br/><br/>
Would you like another Bible quiz question, or a scripture for your day? 🙌`;
    } else {
      botReply = `🧠 <strong>RCCG Bible Trivia Challenge!</strong> ✨<br/><br/>
<strong>Question:</strong> Who was swallowed by a great fish after fleeing from the presence of the Lord on a ship heading to Tarshish?<br/><br/>
<em>(Type your answer in the box below to test your Bible knowledge!)</em>`;
    }
  } else if (lower.includes('bible') || lower.includes('verse') || lower.includes('chapter') || lower.includes('scripture') || lower.includes('psalm') || lower.includes('john 3') || lower.includes('timothy')) {
    botReply = `📖 <strong>Scripture Spotlight:</strong><br/><br/>
• <strong>Psalm 23:1</strong> — <em>"The Lord is my shepherd; I shall not want."</em><br/>
• <strong>2 Timothy 2:15</strong> — <em>"Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."</em><br/>
• <strong>John 3:16</strong> — <em>"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."</em><br/><br/>
💡 <em>Tip: You can ask for scriptures for specific situations (Peace, Healing, Provision, Strength) or type "Bible Quiz" to play!</em>`;
  }
  // 9. Bible Verses for Different Situations (Peace, Strength, Healing, Provision)
  else if (lower.includes('situation') || lower.includes('peace') || lower.includes('anxiety') || lower.includes('fear') || lower.includes('strength') || lower.includes('provision') || lower.includes('money')) {
    botReply = `✨ <strong>Scriptures For Your Current Season & Situation:</strong><br/><br/>
🕊️ <strong>For Peace & Overcoming Anxiety:</strong><br/>
📖 <em>"Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid."</em> — John 14:27<br/><br/>
💪 <strong>For Strength in Trials:</strong><br/>
📖 <em>"They that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles."</em> — Isaiah 40:31<br/><br/>
🩺 <strong>For Divine Health & Healing:</strong><br/>
📖 <em>"For I will restore health unto thee, and I will heal thee of thy wounds, saith the Lord."</em> — Jeremiah 30:17<br/><br/>
💰 <strong>For Supernatural Financial Provision:</strong><br/>
📖 <em>"And my God shall supply all your need according to His riches in glory by Christ Jesus."</em> — Philippians 4:19`;
  }
  // 10. Location, Address & Directions (Google Maps directions in ChurchFlow.json)
  else if (lower.includes('location') || lower.includes('address') || lower.includes('direction') || lower.includes('where is') || lower.includes('map') || lower.includes('gps')) {
    botReply = `📍 <strong>RCCG Everflourishing Mega Sanctuary</strong><br/><br/>
🏢 <strong>Address:</strong><br/>
7, Powerline Street, Moshalashi B/Stop, Iyana Iyesi, Ota, Ogun State<br/><br/>
🗺️ <strong>Turn-by-Turn Navigation & Map Pin:</strong><br/>
<a href="https://maps.app.goo.gl/kCfijizViY9445b86" target="_blank" rel="noopener noreferrer" class="text-emerald-300 underline font-semibold flex items-center gap-1 mt-1">
  <span>Open in Google Maps</span>
  <span>↗</span>
</a><br/>
<em>God bless you as you come! We look forward to worshipping with you! 🙌</em>`;
  }
  // 11. Hymns & Anthems (exact anthem text from ChurchFlow.json)
  else if (lower.includes('anthem') || lower.includes('hymn') || lower.includes('song') || lower.includes('redeemites')) {
    botReply = `🎵 <strong>RCCG ANTHEM</strong><br/><br/>
<strong>Verse 1</strong><br/>
We are Redeemites<br/>
United in love<br/>
Jesus is for us<br/>
We shall conquer<br/><br/>
<strong>Verse 2</strong><br/>
We are together<br/>
United in love<br/>
Jesus is for us<br/>
We shall conquer<br/><br/>
<strong>Verse 3</strong><br/>
We are victorious<br/>
United in love<br/>
Jesus is for us<br/>
We shall conquer<br/><br/>
<strong>Verse 4</strong><br/>
Covenant children<br/>
United in love<br/>
Jesus is for us<br/>
We shall conquer<br/><br/>
<strong>Verse 5</strong><br/>
Hallelujah, Hallelujah<br/>
Hallelujah, Hallelujah! ✨`;
  }
  // 12. Default Helpful Menu
  else {
    botReply = `Welcome to <strong>RCCG Everflourishing Mega Sanctuary</strong>! 🙏 How may I assist you today? You can ask about:<br/><br/>
• <strong>Service times and upcoming programs</strong><br/>
• <strong>Church bank details & giving</strong><br/>
• <strong>Submitting personal prayer requests</strong><br/>
• <strong>First-timer registration</strong><br/>
• <strong>Connecting with pastoral counseling</strong><br/>
• <strong>Bible verses and RCCG anthem</strong>`;
  }

  setTimeout(() => {
    const typing = document.getElementById('wa-typing-bubble');
    if (typing) typing.remove();

    const botDiv = document.createElement('div');
    botDiv.className = 'flex items-start gap-2 max-w-[88%] sm:max-w-[78%]';
    botDiv.innerHTML = `
      <div class="wa-bubble-bot p-3 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-sm">
        <p>${botReply}</p>
        <div class="text-[10px] text-slate-400 text-right mt-1.5 font-mono">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    `;
    stream.appendChild(botDiv);
    stream.scrollTop = stream.scrollHeight;
  }, 420);
}

function resetChurchflowChat() {
  openSimulatorModal('churchflow');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


