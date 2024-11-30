import type { Prisma, ThemeVariable, ThemeVariant } from '@churros/db/prisma';

export const DEFAULT_THEME_VALUES = {
  Light: {
    ColorBackground: '#fff',
    ColorBackground2: '#e7e7e7',
    ColorBackground3: '#cecece',
    ColorBackground4: '#9e9e9e',
    ColorShy: '#6d6d6d',
    ColorMuted: '#414141',
    ColorForeground: '#000',
    ColorPrimary: '#0a5bc5',
    ColorSuccess: '#056721',
    ColorWarning: '#c24600',
    ColorDanger: '#971212',
    ColorDangerBackground: '#ffcbcb',
    ColorPrimaryBackground: '#c3eaff',
    ColorSuccessBackground: '#caffd8',
    ColorWarningBackground: '#ffe58f',
    ImageLogoNavbarTop: '',
    ImageLogoNavbarSide: '',
    ImageBackgroundNavbarBottom: '',
    ImageBackgroundNavbarTop: '',
    PatternBackground: '',
  },
  Dark: {
    ColorBackground: '#000',
    ColorBackground2: '#1a1a1a',
    ColorBackground3: '#363636',
    ColorBackground4: '#585858',
    ColorShy: '#b8b8b8',
    ColorMuted: '#ddd',
    ColorForeground: '#fff',
    ColorPrimary: '#499eff',
    ColorSuccess: '#3fcf68',
    ColorWarning: '#f39c2b',
    ColorDanger: '#ff4848',
    ColorDangerBackground: '#1d0909',
    ColorPrimaryBackground: '#03212b',
    ColorSuccessBackground: '#0b2512',
    ColorWarningBackground: '#3f2508',
    ImageLogoNavbarTop: '',
    ImageLogoNavbarSide: '',
    ImageBackgroundNavbarBottom: '',
    ImageBackgroundNavbarTop: '',
    PatternBackground: '',
  },
} as const satisfies Record<ThemeVariant, Record<ThemeVariable, string>>;

export const DEFAULT_THEME_VALUES_FLAT = [
  ...Object.entries(DEFAULT_THEME_VALUES.Light).map(([variable, value]) => ({
    variable: variable as ThemeVariable,
    value,
    variant: 'Light' as const,
  })),
  ...Object.entries(DEFAULT_THEME_VALUES.Dark).map(([variable, value]) => ({
    variable: variable as ThemeVariable,
    value,
    variant: 'Dark' as const,
  })),
] as const satisfies Array<Omit<Prisma.ThemeValueCreateInput, 'theme'>>;
