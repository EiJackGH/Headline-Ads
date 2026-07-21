/**
 * Headline Ads Widget
 * A lightweight, customisable, and responsive banner ad widget for any website.
 * Developed for ease of use via GitHub Pages or direct integration.
 */
(function () {
  const activeScript = document.currentScript;

  // Prevent duplicate initialization
  if (window.HeadlineAds) {
    return;
  }

  const DEFAULT_OPTIONS = {
    id: 'default-headline-ad',
    text: 'Check out our amazing new feature! Learn more today.',
    link: '#',
    ctaText: 'Get Started',
    position: 'top', // 'top', 'bottom', 'inline'
    target: '', // element ID for inline position
    bgColor: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    textColor: '#ffffff',
    ctaBg: '#ffffff',
    ctaColor: '#4f46e5',
    dismissible: true,
    animation: 'slide', // 'slide', 'fade', 'none'
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    shadow: true,
    fontSize: '14px',
    badgeText: 'PROMO',
    badgeBg: 'rgba(255, 255, 255, 0.2)',
    badgeColor: '#ffffff',
    closeColor: '#ffffff',
    rotationInterval: 0, // 0 for no rotation, or seconds if rotating multiple messages
    // multiple messages can be passed as a '|' separated string in text, e.g. "Msg 1|Msg 2|Msg 3"
  };

  const HeadlineAds = {
    init(customOptions = {}) {
      // Find current script script-based options
      const scriptOpts = this.getScriptOptions();
      const options = { ...DEFAULT_OPTIONS, ...scriptOpts, ...customOptions };

      // Check if dismissed
      if (options.dismissible && localStorage.getItem(`headline_ad_dismissed_${options.id}`)) {
        return null;
      }

      this.injectStyles(options);
      return this.render(options);
    },

    getScriptOptions() {
      const script = activeScript;
      if (!script) return {};

      const opts = {};
      const attrs = [
        'id', 'text', 'link', 'ctaText', 'position', 'target',
        'bgColor', 'textColor', 'ctaBg', 'ctaColor', 'dismissible',
        'animation', 'fontFamily', 'shadow', 'fontSize', 'badgeText',
        'badgeBg', 'badgeColor', 'closeColor', 'rotationInterval'
      ];

      attrs.forEach(attr => {
        const val = script.getAttribute(`data-${attr.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        if (val !== null && val !== undefined) {
          if (val === 'true') opts[attr] = true;
          else if (val === 'false') opts[attr] = false;
          else if (!isNaN(val) && val.trim() !== '' && attr === 'rotationInterval') opts[attr] = Number(val);
          else opts[attr] = val;
        }
      });

      return opts;
    },

    injectStyles(options) {
      const styleId = 'headline-ads-styles';
      if (document.getElementById(styleId)) return;

      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .hl-ad-banner-container {
          box-sizing: border-box;
          width: 100%;
          font-family: var(--hl-font-family);
          color: var(--hl-text-color);
          background: var(--hl-bg-color);
          font-size: var(--hl-font-size);
          line-height: 1.5;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          opacity: 0;
        }

        .hl-ad-banner-container * {
          box-sizing: border-box;
        }

        /* Positions */
        .hl-ad-banner-sticky-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          transform: translateY(-100%);
        }

        .hl-ad-banner-sticky-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          transform: translateY(100%);
        }

        .hl-ad-banner-inline {
          position: relative;
          border-radius: 8px;
          margin: 16px 0;
          transform: scale(0.95);
        }

        /* Animations & Entry States */
        .hl-ad-banner-container.hl-ad-visible {
          opacity: 1;
        }
        .hl-ad-banner-sticky-top.hl-ad-visible {
          transform: translateY(0);
        }
        .hl-ad-banner-sticky-bottom.hl-ad-visible {
          transform: translateY(0);
        }
        .hl-ad-banner-inline.hl-ad-visible {
          transform: scale(1);
        }

        /* Box Shadow */
        .hl-ad-shadow {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        /* Content Layout */
        .hl-ad-content {
          max-width: 1200px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          text-align: center;
          padding-right: 24px;
        }

        .hl-ad-message-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .hl-ad-badge {
          background: var(--hl-badge-bg);
          color: var(--hl-badge-color);
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          display: inline-block;
        }

        .hl-ad-message {
          transition: opacity 0.3s ease;
          display: inline;
        }

        .hl-ad-message-fade-out {
          opacity: 0;
        }

        /* CTA Button */
        .hl-ad-cta {
          background: var(--hl-cta-bg);
          color: var(--hl-cta-color);
          text-decoration: none;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: inline-block;
        }

        .hl-ad-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        .hl-ad-cta:active {
          transform: translateY(0);
        }

        /* Close / Dismiss Button */
        .hl-ad-close {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--hl-close-color);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .hl-ad-close:hover {
          opacity: 1;
        }

        .hl-ad-close svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        /* Adjust page body padding when sticky top is active */
        body.hl-ad-has-sticky-top {
          margin-top: var(--hl-push-height, 0px) !important;
          transition: margin-top 0.4s ease;
        }

        body.hl-ad-has-sticky-bottom {
          margin-bottom: var(--hl-push-height, 0px) !important;
          transition: margin-bottom 0.4s ease;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hl-ad-banner-container {
            padding: 12px 16px;
          }
          .hl-ad-content {
            flex-direction: column;
            gap: 8px;
            padding-right: 20px;
          }
          .hl-ad-message-wrapper {
            flex-direction: column;
            gap: 4px;
          }
          .hl-ad-cta {
            padding: 4px 12px;
            font-size: 0.8rem;
          }
          .hl-ad-close {
            right: 8px;
          }
        }
      `;
      document.head.appendChild(style);
    },

    render(options) {
      // Create element
      const container = document.createElement('div');
      container.className = 'hl-ad-banner-container';
      container.id = `hl-ad-banner-${options.id}`;

      // Set CSS Variables for easy customisation
      container.style.setProperty('--hl-bg-color', options.bgColor);
      container.style.setProperty('--hl-text-color', options.textColor);
      container.style.setProperty('--hl-cta-bg', options.ctaBg);
      container.style.setProperty('--hl-cta-color', options.ctaColor);
      container.style.setProperty('--hl-font-family', options.fontFamily);
      container.style.setProperty('--hl-font-size', options.fontSize);
      container.style.setProperty('--hl-badge-bg', options.badgeBg);
      container.style.setProperty('--hl-badge-color', options.badgeColor);
      container.style.setProperty('--hl-close-color', options.closeColor);

      // Handle position class
      if (options.position === 'bottom') {
        container.classList.add('hl-ad-banner-sticky-bottom');
      } else if (options.position === 'inline') {
        container.classList.add('hl-ad-banner-inline');
      } else {
        container.classList.add('hl-ad-banner-sticky-top');
      }

      if (options.shadow) {
        container.classList.add('hl-ad-shadow');
      }

      // XSS Prevention helper
      const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g,
          tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
          }[tag] || tag)
        );
      };

      // Handle rotating/multiple messages
      const messages = options.text.split('|').map(m => m.trim());
      let currentMessageIndex = 0;

      const badgeHTML = options.badgeText ? `<span class="hl-ad-badge">${escapeHTML(options.badgeText)}</span>` : '';
      const ctaHTML = options.ctaText ? `<a href="${escapeHTML(options.link)}" class="hl-ad-cta">${escapeHTML(options.ctaText)}</a>` : '';
      const closeHTML = options.dismissible ? `
        <button class="hl-ad-close" aria-label="Dismiss ad">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      ` : '';

      container.innerHTML = `
        <div class="hl-ad-content">
          <div class="hl-ad-message-wrapper">
            ${badgeHTML}
            <span class="hl-ad-message" id="hl-ad-msg-${options.id}">${escapeHTML(messages[0])}</span>
          </div>
          ${ctaHTML}
        </div>
        ${closeHTML}
      `;

      // Append to correct target or location
      let targetNode = document.body;
      if (options.position === 'inline') {
        if (options.target && document.getElementById(options.target)) {
          targetNode = document.getElementById(options.target);
        } else {
          // fallback to script tag location
          const currentScript = activeScript;
          if (currentScript && currentScript.parentNode) {
            currentScript.parentNode.insertBefore(container, currentScript);
            targetNode = null; // already placed
          }
        }
      }

      if (targetNode) {
        if (options.position === 'bottom') {
          targetNode.appendChild(container);
        } else if (options.position === 'top') {
          targetNode.insertBefore(container, targetNode.firstChild);
        } else {
          targetNode.appendChild(container);
        }
      }

      // Add Dismiss Event
      if (options.dismissible) {
        const closeBtn = container.querySelector('.hl-ad-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            this.dismiss(container, options);
          });
        }
      }

      // Rotation mechanism
      if (messages.length > 1 && options.rotationInterval > 0) {
        const msgSpan = container.querySelector(`#hl-ad-msg-${options.id}`);
        setInterval(() => {
          if (!msgSpan) return;
          msgSpan.classList.add('hl-ad-message-fade-out');
          setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
            msgSpan.textContent = messages[currentMessageIndex];
            msgSpan.classList.remove('hl-ad-message-fade-out');
          }, 300);
        }, options.rotationInterval * 1000);
      }

      // Trigger entry animation in next tick
      setTimeout(() => {
        container.classList.add('hl-ad-visible');
        if (options.position === 'top') {
          document.body.classList.add('hl-ad-has-sticky-top');
          document.body.style.setProperty('--hl-push-height', `${container.offsetHeight}px`);
        } else if (options.position === 'bottom') {
          document.body.classList.add('hl-ad-has-sticky-bottom');
          document.body.style.setProperty('--hl-push-height', `${container.offsetHeight}px`);
        }
      }, 50);

      return container;
    },

    dismiss(container, options) {
      container.classList.remove('hl-ad-visible');

      // Cleanup body spacing
      if (options.position === 'top') {
        document.body.style.removeProperty('--hl-push-height');
        document.body.classList.remove('hl-ad-has-sticky-top');
      } else if (options.position === 'bottom') {
        document.body.style.removeProperty('--hl-push-height');
        document.body.classList.remove('hl-ad-has-sticky-bottom');
      }

      localStorage.setItem(`headline_ad_dismissed_${options.id}`, 'true');

      // Remove from DOM after transition completes
      setTimeout(() => {
        container.remove();
      }, 400);
    },

    resetDismissal(id = 'default-headline-ad') {
      localStorage.removeItem(`headline_ad_dismissed_${id}`);
    }
  };

  // Assign to global namespace
  window.HeadlineAds = HeadlineAds;

  // Auto-init on DOMContentLoaded or immediately if DOM is already loaded
  function autoInit() {
    // Only auto-init if script tag has configuration attributes or container doesn't exist yet
    HeadlineAds.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
