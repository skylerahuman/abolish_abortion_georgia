## 2025-05-18 - Reduced Motion in Animations
**Learning:** Purely decorative animations like "scramble text" effects can be disorienting or inaccessible for users with vestibular disorders.
**Action:** Always wrap high-frequency animation logic in a `matchMedia('(prefers-reduced-motion: reduce)')` check to opt-out by default for these users.
