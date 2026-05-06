/* ─────────────────────────────────────────────
   MOBILE MENU
   Injects a slide-down panel when the hamburger
   button is tapped on small screens.
───────────────────────────────────────────── */
function toggleMobileMenu() {
    const existingMenu = document.getElementById('mobileNavPanel');

    if (existingMenu) {
        // Close: animate out then remove
        existingMenu.style.maxHeight = '0';
        existingMenu.style.opacity   = '0';
        setTimeout(() => existingMenu.remove(), 300);
        return;
    }

    // Build the panel
    const panel = document.createElement('div');
    panel.id = 'mobileNavPanel';
    Object.assign(panel.style, {
        position:       'fixed',
        top:            '64px',          // below the header
        left:           '0',
        right:          '0',
        zIndex:         '999',
        background:     'rgba(10, 10, 20, 0.97)',
        backdropFilter: 'blur(16px)',
        borderBottom:   '1px solid #1f1f2a',
        overflow:       'hidden',
        maxHeight:      '0',
        opacity:        '0',
        transition:     'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
        padding:        '0 5%',
        boxSizing:      'border-box'
    });

    const links = [
        { href: '#features',  label: 'Features' },
        { href: '#servers',   label: 'Servers' },
        { href: './converter.html', label: 'Convert M3U' },
        { href: '#platforms', label: 'Platforms' },
        { href: '#pricing',   label: 'Pricing' },
        { href: '#faq',       label: 'FAQ' },
        { href: '#contact',   label: 'Get Started', cta: true }
    ];

    const inner = document.createElement('div');
    Object.assign(inner.style, {
        display:       'flex',
        flexDirection: 'column',
        gap:           '0',
        padding:       '1rem 0 1.5rem'
    });

    links.forEach(link => {
        const a = document.createElement('a');
        a.href      = link.href;
        a.textContent = link.label;
        Object.assign(a.style, {
            display:       'block',
            padding:       '0.9rem 0',
            color:         link.cta ? '#a5b4fc' : '#a1a1aa',
            fontWeight:    link.cta ? '700' : '500',
            fontSize:      '1rem',
            textDecoration:'none',
            borderBottom:  '1px solid #1a1a28',
            transition:    'color 0.2s'
        });
        a.addEventListener('mouseenter', () => a.style.color = '#ffffff');
        a.addEventListener('mouseleave', () => a.style.color = link.cta ? '#a5b4fc' : '#a1a1aa');

        // Close menu after navigation
        a.addEventListener('click', () => {
            panel.style.maxHeight = '0';
            panel.style.opacity   = '0';
            setTimeout(() => panel.remove(), 300);
        });

        inner.appendChild(a);
    });

    panel.appendChild(inner);
    document.body.appendChild(panel);

    // Trigger open animation on next frame
    requestAnimationFrame(() => {
        panel.style.maxHeight = '400px';
        panel.style.opacity   = '1';
    });

    // Close when clicking outside the menu or header
    setTimeout(() => {
        document.addEventListener('click', function outsideClick(e) {
            const header = document.getElementById('header');
            if (!panel.contains(e.target) && !header.contains(e.target)) {
                panel.style.maxHeight = '0';
                panel.style.opacity   = '0';
                setTimeout(() => panel.remove(), 300);
                document.removeEventListener('click', outsideClick);
            }
        });
    }, 50);
}

/* ─────────────────────────────────────────────
   SERVER SELECTION
───────────────────────────────────────────── */
function selectServer(el, name) {
    document.querySelectorAll('.server-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    console.log('Selected server:', name);
}

/* ─────────────────────────────────────────────
   PRICING TAB SWITCHER
───────────────────────────────────────────── */
function switchTab(tab) {
    const subPlans = document.getElementById('subscriptionPlans');
    const resPlans = document.getElementById('resellerPlans');
    const subBtn   = document.getElementById('subBtn');
    const resBtn   = document.getElementById('resBtn');

    if (tab === 'subscription') {
        subPlans.classList.remove('hidden');
        resPlans.classList.add('hidden');
        subBtn.classList.add('active');
        resBtn.classList.remove('active');
    } else {
        subPlans.classList.add('hidden');
        resPlans.classList.remove('hidden');
        resBtn.classList.add('active');
        subBtn.classList.remove('active');
    }
}

/* ─────────────────────────────────────────────
   BUY PLAN
───────────────────────────────────────────── */
function buyPlan(plan, price) {
    alert(`Thank you! You selected ${plan} for ${price}.\nOur team will contact you on WhatsApp for payment and activation.`);
    window.open('https://wa.me/212614567031', '_blank');
}

/* ─────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────── */
function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const icon   = btn.querySelector('.faq-icon i');

    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.classList.replace('fa-minus', 'fa-plus');
    } else {
        // Close any currently open answer
        document.querySelectorAll('.faq-answer').forEach(a => {
            if (a !== answer) {
                a.style.maxHeight = null;
                const i = a.previousElementSibling?.querySelector('.faq-icon i');
                if (i) i.classList.replace('fa-minus', 'fa-plus');
            }
        });
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.classList.replace('fa-plus', 'fa-minus');
    }
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const reveals  = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);   // fire once
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
});