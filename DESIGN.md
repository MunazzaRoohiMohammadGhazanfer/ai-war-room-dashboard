# Design Brief

## Direction
Second — AI chief of staff for startup founders. Single-feed War Room interface delivering daily briefings, decision intelligence, and focus recommendations.

## Tone
Brutally minimal editorial. Every element signals purpose. Cyan accents cut through dark neutrals only for urgent actions, not decoration.

## Differentiation
Time-sensitive color coding on cards — decisions due today show subtle background tint, overdue items surface in destructive red. Urgency emerges from data, not visual noise.

## Color Palette

| Token          | OKLCH             | Role                                 |
| -------------- | ----------------- | ------------------------------------ |
| background     | 0.145 0.014 260   | Near-black, primary surface          |
| foreground     | 0.95 0.01 260     | Near-white, body text                |
| card           | 0.18 0.014 260    | Elevated surface, feed items         |
| primary/accent | 0.75 0.15 190     | Cyan, buttons & active states only   |
| secondary      | 0.22 0.02 260     | Input backgrounds, subtle dividers   |
| muted          | 0.22 0.02 260     | Disabled text, metadata              |
| destructive    | 0.55 0.2 25       | Overdue alerts, destructive actions  |
| border         | 0.28 0.02 260     | Subtle section dividers              |

## Typography
- Display: Space Grotesk — headings, War Room title, section labels. Bold, tracking-tight for hierarchy.
- Body: DM Sans — all content, feed text, metadata. Neutral, high readability.
- Mono: Geist Mono — timestamps, revenue figures, code snippets.
- Scale: hero `text-2xl font-bold tracking-tight`, h2 `text-lg font-semibold`, label `text-xs uppercase tracking-widest`, body `text-base`.

## Elevation & Depth
Cards lift slightly from background (`shadow-card`). No drop shadows on text. Section headers sit flush with background to anchor feed rhythm.

## Structural Zones

| Zone    | Background     | Border              | Notes                                          |
| ------- | -------------- | ------------------- | ---------------------------------------------- |
| Header  | bg-background  | border-b border-border | War Room title, sticky during scroll           |
| Content | bg-background  | —                   | Alternates: card bg-card / muted bg-muted/10  |
| Footer  | bg-background  | border-t border-border | Metadata, action buttons, optional footer      |

## Spacing & Rhythm
Spacious. Gap between feed items: `gap-6`. Card padding: `p-6`. Subsections: `gap-3`. Micro-spacing (buttons, labels) `gap-2`. Single column on all breakpoints.

## Component Patterns
- Buttons: Primary cyan bg-primary text-primary-foreground, hover darkens L by 0.05. Secondary transparent, border-border. No shadows.
- Cards: `rounded-md` (6px), `bg-card`, `p-6`, optional `shadow-card` for modest elevation.
- Badges: `rounded-sm` (2px), `bg-muted` text-muted-foreground for default. `bg-destructive` for alerts.

## Motion
- Entrance: `animate-fade-in` 0.2s on feed items as they load. No bounce.
- Hover: Text buttons gain `underline-offset-2`, primaries shift `opacity-90`.
- Decorative: None. Motion serves load state clarity only.

## Constraints
- No icons. Typography and color carry meaning.
- No dashboards, no charts. Metrics appear inline within feed items.
- Single column. No sidebars or multi-column layouts.
- All interactive elements use Cyan accent sparingly. Default to muted text.

## Signature Detail
Time-based urgency via background wash: cards with decisions due "today" receive subtle `bg-blue-500/5` tint; overdue items inherit `destructive` color property for text emphasis.
