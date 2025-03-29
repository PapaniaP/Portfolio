# 🛍️ Implement Sticky TOC Sidebar Navigation (for Case Study Page)

## 🌟 Goal

Create a responsive, scroll-aware Table of Contents (TOC) sidebar on the RaskRask case study page that:

- Is built dynamically from the `sections` array already passed to `CaseStudyLayout`
- Acts as navigation for all main sections of the case study
- Highlights the active section while the user scrolls
- Is styled with Tailwind and optionally animated with Framer Motion

---

## 📁 Files Involved

- `src/pages/projects/raskrask-recharge.astro` → passes the `sections` prop
- `src/layouts/CaseStudyLayout.astro` → modify or inject TOC here
- Optional: create `src/components/TocSidebar.astro` (or `.jsx`/`.tsx` if using interactivity)

---

## 🧱 Basic Layout

### Add inside `CaseStudyLayout.astro`:

```astro
<aside class="hidden lg:block sticky top-24 w-64 pr-8 text-sm text-gray-400">
  <nav class="space-y-2">
    {sections.map(section => (
      <a
        href={`#${section.id}`}
        class="block hover:underline transition-colors"
        class:list={[section.id === activeId ? 'text-primary font-semibold' : '']}
      >
        {section.title}
      </a>
    ))}
  </nav>
</aside>
```

You’ll need to track `activeId` either via Astro island or a client-side React component.

---

## 🧐 Scrollspy Logic (Client Component)

Use `IntersectionObserver` in a client-only React component to update which section is active:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

Export the current `activeId` to highlight the TOC item.

---

## 💅 Styling Tips (Tailwind)

- Sidebar container: `sticky top-24 w-64 hidden lg:block`
- Links: `text-sm text-gray-400 hover:underline`
- Active link: `text-primary font-semibold`
- Animate scroll (smooth): add `scroll-smooth` on `html`

---

## 🌀 Optional: Add Framer Motion

If using React, import `motion` from `framer-motion` and animate the TOC links or active indicator:

```tsx
<motion.a
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
  ...
/>
```

You could also animate the indicator as a sliding dot or underline using `layout` props.

Framer Motion could also be used to animate:

- Section headers fading in as they enter view
- A "scroll to top" button appearing after scrolling
- Smooth transitions between anchored sections

---

## 📱 Mobile Experience

- Optionally render a collapsible version of the TOC on mobile (using `Disclosure` from Headless UI or `Radix Accordion`)
- Or hide it entirely with `hidden lg:block`

---

## ✅ Summary

- Dynamically render sidebar from `sections`
- Use `IntersectionObserver` to scrollspy active section
- Style and animate with Tailwind and optionally Framer Motion
- Place sidebar inside `CaseStudyLayout.astro` or extract into `TocSidebar.astro`

Let your agent know to build it incrementally: TOC > scrollspy > animation.
