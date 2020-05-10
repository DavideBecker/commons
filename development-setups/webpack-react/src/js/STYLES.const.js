import Color from 'color'

/**
 * @type {STYLES}
 */
let STYLES = {}

STYLES.COLORS = {
  BG: Color('#f3e8dc'),
  WHITE1: Color('rgb(255, 255, 255)'),
  WHITE2: Color('rgba(255, 255, 255, 0.95)'),
  WHITE3: Color('rgba(255, 255, 255, 0.5)'),
  BLACK1: Color('rgb(0, 0, 0)'),
  BLACK2: Color('rgba(0, 0, 0, 0.95)'),
  BLACK3: Color('rgba(0, 0, 0, 0.52)'),
  GRAY_DARK: Color('rgb(52, 54, 69)'),
  GRAY_TEXT: Color('rgb(79, 79, 79)'),
  GRAY_MEDIUM: Color('rgba(58, 53, 75, 0.7)'),
  GRAY_LIGHT: Color('rgb(232, 232, 232)'),
  SUBTILE: Color('rgb(240, 240, 240)'),

  DARK1: Color('#161D29'),
  DARK2: Color('#1F2732'),
  DARK3: Color('#262D37'),

  PURPLE: Color('#ce81fa'),
  BLUE: Color('#8b93f7'),
  ORANGE: Color('#ee905b'),
  YELLOW: Color('#f1d258'),
  PINK: Color('#ffa1b0'),
  CYAN: Color('#60dbbc'),
  GREEN: Color('#74cc86'),
  RED: Color('#ff6863'),
  BROWN: Color('#998254'),
}

// Shadow values from TailwindCSS
// -> https://tailwindcss.com/docs/box-shadow/
STYLES.SHADOWS = {
  XS: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  S: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  BASE: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  M: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  L: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  XL:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  XXL: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  INNER: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  OUTLINE: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  NONE: 'none',
}

STYLES.GRADIENTS = {}

STYLES.FONTS = {
  SCANDIA: `scandia-web, sans-serif`,
  SCANDIA_LINE: `scandia-line-web, sans-serif`,
  SCANDIA_STENCIL: `'ScandiaWebStencil', sans-serif`,
  SCANDIA_LINE_STENCIL: `'ScandiaLineWebStencil', sans-serif`,
}

STYLES.TRANSITIONS = {
  ELASTIC: 'cubic-bezier(.62,.28,.23,.99)',
}

STYLES.FONT_SIZES = {
  H1: 64,
  H2: 56,
  H3: 42,
  H4: 32,
  H5: 24,
  H6: 20,
  SUBLINE: 18,
  BODY1: 16,
  BODY2: 14,
  CAPTION: 12,
}

STYLES.WIDTHS = {
  XS: 320,
  S: 480,
  M: 720,
  L: 900,
  XL: 1200,
}

STYLES.BREAKPOINTS = {
  XS: 0,
  S: 600,
  M: 960,
  L: 1280,
  XL: 1920,
}

STYLES.BREAKPOINTS.UP = (BP) =>
  `@media (min-width: ${STYLES.BREAKPOINTS[BP]}px)`
STYLES.BREAKPOINTS.DOWN = (BP) =>
  `@media (max-width: ${STYLES.BREAKPOINTS[BP] - 0.05}px)`

export default STYLES
