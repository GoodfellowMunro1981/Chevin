import { mdiHomeAnalytics } from '@mdi/js'

type NavigationItem = {
  text: 'Home',
  path: string,
  icon: string
}

export const navigation: NavigationItem[] = [
  {
    text: 'Home',
    path: '/',
    icon: `<svg viewBox="0 0 24 24"><path d="${mdiHomeAnalytics}" /></svg>`,
  }
];