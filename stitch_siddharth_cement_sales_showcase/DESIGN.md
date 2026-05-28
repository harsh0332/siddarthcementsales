---
name: Industrial Precision
colors:
  surface: '#faf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#faf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ef'
  surface-container: '#efeee9'
  surface-container-high: '#e9e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1b1c19'
  on-surface-variant: '#5c403f'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#906f6e'
  outline-variant: '#e5bdbb'
  surface-tint: '#bf0229'
  primary: '#9e001f'
  on-primary: '#ffffff'
  primary-container: '#c8102e'
  on-primary-container: '#ffdad8'
  inverse-primary: '#ffb3b1'
  secondary: '#4f54b4'
  on-secondary: '#ffffff'
  secondary-container: '#959aff'
  on-secondary-container: '#292b8d'
  tertiary: '#005468'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e87'
  on-tertiary-container: '#b6ebff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#04006d'
  on-secondary-fixed-variant: '#373a9b'
  tertiary-fixed: '#b6ebff'
  tertiary-fixed-dim: '#82d1ed'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#faf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e3e3de'
  warm-base: '#FAFAF7'
  surface-white: '#FFFFFF'
  blueprint-grid: rgba(46, 49, 146, 0.05)
  text-ink: '#1A1A1A'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.03em
  title-md:
    fontFamily: Roboto Flex
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Roboto Flex
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Roboto Flex
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 24px
  margin-edge: 32px
  container-max: 1440px
---

## Brand & Style

This design system embodies the reliability and structural integrity of the industrial sector. The aesthetic is "Light Industrial"—a sophisticated blend of raw material textures and high-precision corporate standards. It targets contractors, distributors, and logistics partners who value clarity, durability, and professional authority.

The visual style leverages **Minimalism** with **Modern Industrial** accents. It utilizes a blueprint-inspired grid motif and subtle concrete textures to ground the digital experience in the physical nature of the product. The interface evokes a sense of established trust through heavy, impactful typography balanced against vast, clean workspaces.

## Colors

The palette is anchored by a warm, off-white base that prevents the "clinical" feel of pure white, providing a more architectural backdrop. The primary brand color, a bold red, is used strategically for calls to action and critical status indicators to ensure high visibility and energy.

Light concrete gray is reserved for structural elements—backgrounds of sidebars, section headers, and nested containers—creating a clear tiered hierarchy. High-contrast white is used exclusively for content cards and input areas to maximize legibility and focus. The secondary navy is used for technical data, links, and secondary navigation elements to maintain a professional, corporate lean.

## Typography

The typographic system utilizes a "High/Low" contrast strategy. Headlines use a condensed, heavy sans-serif to mimic industrial signage and structural markings; these must always be set in all-caps. 

For body content, a flexible sans-serif provides maximum readability across data-dense tables and long-form reports. A monospaced font is introduced for labels, serial numbers, and technical specifications to reinforce the precision-engineering theme. All typography must adhere to WCAG AA standards against their respective backgrounds, prioritizing ink-dark grays over pure black for a more refined finish.

## Layout & Spacing

This design system uses a **fixed grid** model for desktop and a **fluid grid** for mobile. The layout is structured on a strict 4px baseline shift to ensure all elements align to a mathematical "blueprint" standard.

- **Desktop (12 columns):** 1440px max-width, 24px gutters, 32px outer margins.
- **Tablet (8 columns):** Fluid width, 16px gutters, 24px outer margins.
- **Mobile (4 columns):** Fluid width, 12px gutters, 16px outer margins.

The layout should incorporate "Blueprint Motifs"—faint 1px lines or grid patterns in the background—to delineate sections without adding visual weight. Whitespace should be used generously to separate logical modules, reflecting an organized and efficient workspace.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Bold Borders** rather than soft shadows. This mimics the flat, stacked nature of construction materials.

1.  **Level 0 (Base):** The warm off-white background (#FAFAF7).
2.  **Level 1 (Sub-sections):** Light concrete gray (#F0EFEA) with no border.
3.  **Level 2 (Interactive/Cards):** Pure white (#FFFFFF) with a 1px solid border in a slightly darker gray or the primary red for active states.
4.  **Level 3 (Pop-overs/Modals):** Pure white with a crisp, 2px solid black border and a high-offset "hard" shadow (4px 4px 0px) to provide a tactile, technical feel.

Avoid blurs and gradients. Depth should feel structural, not ethereal.

## Shapes

The shape language is strictly **Sharp**. In an industrial context, right angles represent precision, stacking, and structural integrity. 

- **Containers:** All corners must be 0px (sharp). 
- **Buttons:** Sharp corners with 1px or 2px borders.
- **Icons:** Use geometric, stroke-based icons with consistent weights. Avoid rounded terminals; prefer butt caps and miter joins for icon paths.
- **Separators:** Use thin, solid lines to divide content, suggesting technical drawings.

## Components

### Buttons
Primary buttons use a solid primary red background with white uppercase text. Secondary buttons use a white background with a 2px navy border. All buttons must have a clear "hover" state where the background shifts to a slightly darker shade or fills with a hatch-pattern texture.

### Cards
Cards are the primary content vessel. They must be pure white with a subtle 1px border. Use the `label-caps` typography for "overhead" category tags in the top-left corner of the card to mimic shipping manifests.

### Input Fields
Inputs should have a light gray background and a 1px bottom-border only, or a full 1px border that turns red on focus. Labels should be small, monospaced, and positioned above the field.

### Chips & Status
Use rectangular, sharp-edged chips. Status indicators (e.g., "In Transit", "Delivered") should use high-saturation semantic colors (green, amber, red) but always paired with the monospaced font for a technical look.

### Data Tables
Tables are critical for this system. Use alternating row stripes in the light concrete gray. Header cells should have a navy background with white text and use the condensed headline font at a small scale. All cell data should be aligned to the 4px grid for perfect vertical rhythm.