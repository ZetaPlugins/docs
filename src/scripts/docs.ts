const root = document.documentElement;
const store = {
    get(key: string) {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    set(key: string, value: string) {
        try {
            localStorage.setItem(key, value);
        } catch {
            /* storage unavailable */
        }
    },
};

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
});

document
    .querySelectorAll('[data-menu-toggle]')
    .forEach((el) => el.addEventListener('click', () => document.body.classList.toggle('nav-open')));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('nav-open');
});

document.addEventListener('click', (e) => {
    document.querySelectorAll<HTMLDetailsElement>('.product-switcher[open]').forEach((d) => {
        if (!d.contains(e.target as Node)) d.open = false;
    });
});

// Tab groups that share a label (e.g. "Maven"/"Gradle") stay in sync and are remembered.
function selectTab(group: Element, label: string) {
    const buttons = [...group.querySelectorAll<HTMLButtonElement>(':scope > .tab-list > [role="tab"]')];
    const panels = [...group.querySelectorAll<HTMLElement>(':scope > [role="tabpanel"]')];
    const index = buttons.findIndex((b) => b.dataset.label === label);
    if (index < 0) return false;
    buttons.forEach((b, i) => b.setAttribute('aria-selected', String(i === index)));
    panels.forEach((p, i) => (p.hidden = i !== index));
    return true;
}
const tabGroups = [...document.querySelectorAll('[data-tabs]')];
const savedTabs: string[] = JSON.parse(store.get('tabs') ?? '[]');
tabGroups.forEach((group) => {
    for (const label of savedTabs) if (selectTab(group, label)) break;
    group.querySelectorAll<HTMLButtonElement>(':scope > .tab-list > [role="tab"]').forEach((button) =>
        button.addEventListener('click', () => {
            const label = button.dataset.label!;
            tabGroups.forEach((g) => selectTab(g, label));
            store.set('tabs', JSON.stringify([label, ...savedTabs.filter((l) => l !== label)].slice(0, 20)));
        }),
    );
});

document.querySelectorAll<HTMLPreElement>('.prose pre').forEach((pre) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrap';
    pre.replaceWith(wrapper);
    wrapper.append(pre);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
        await navigator.clipboard.writeText(pre.querySelector('code')?.innerText ?? pre.innerText);
        button.textContent = 'Copied';
        setTimeout(() => (button.textContent = 'Copy'), 1500);
    });
    wrapper.append(button);
});

document.querySelectorAll<HTMLHeadingElement>('.prose :is(h2, h3, h4)[id]').forEach((h) => {
    const a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = `#${h.id}`;
    a.setAttribute('aria-label', `Link to “${h.textContent}”`);
    a.textContent = '#';
    h.append(a);
});

const tocLinks = new Map(
    [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')].map((a) => [a.dataset.tocLink!, a]),
);
if (tocLinks.size) {
    const headings = [...tocLinks.keys()]
        .map((id) => document.getElementById(id))
        .filter((h): h is HTMLElement => h !== null);
    const update = () => {
        const offset = 120;
        let active = headings[0];
        for (const h of headings) if (h.getBoundingClientRect().top - offset <= 0) active = h;
        tocLinks.forEach((a, id) => a.classList.toggle('active', id === active?.id));
    };
    addEventListener('scroll', update, { passive: true });
    update();
}
