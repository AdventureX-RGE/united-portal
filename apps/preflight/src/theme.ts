export interface Theme {
    id: string; // id is defined when the user installs the theme
    repo: string;
}

const DEFAULT_THEME: Theme = {
    id: 'default',
    repo: 'https://github.com/AdventureX-RGE/united-portal-theme-shadcn.git'
}

export async function getCurrentTheme(): Promise<Theme> {
  return DEFAULT_THEME;
}