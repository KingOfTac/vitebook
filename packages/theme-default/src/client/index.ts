import './styles/vars.css';
import './styles/vars-dark.css';
import './styles/global.css';
import './styles/code.css';
import './styles/admonition.css';

import { ClientTheme, currentRoute, inBrowser, pages } from '@vitebook/client';
import { get } from 'svelte/store';

import Layout from './layout/Layout.svelte';
import NotFound from './layout/NotFound.svelte';
import { updateDarkMode } from './stores/darkMode';
import { localizedThemeConfig } from './stores/localizedThemeConfig';

const theme: ClientTheme = {
  explorer: false,
  Layout,
  NotFound,
  configureRouter(router) {
    // Set theme before route loads to avoid flashing wrong theme.
    if (inBrowser) {
      updateDarkMode(get(localizedThemeConfig));
    }

    if (!router.hasRoute('/')) {
      const setHomePage = () => {
        const theme = get(localizedThemeConfig);
        const firstPage = get(pages)[0];
        const redirect =
          theme.homePage === false ? firstPage?.route : undefined;

        router.addRoute({
          path: '/',
          redirect,
          loader: () =>
            theme.homePage === false
              ? import('./layout/Blank.svelte')
              : import('./components/home/Home.svelte'),
        });

        if (import.meta.env.DEV) {
          const currentPath = get(currentRoute)?.path;
          if (currentPath === '/') {
            router.go('/', { replace: true });
          }
        }
      };

      if (import.meta.env.DEV) {
        let timer;
        const setHomePageDebounced = () => {
          clearTimeout(timer);
          timer = setTimeout(setHomePage, 100);
        };

        setHomePage();
        localizedThemeConfig.subscribe(setHomePageDebounced);
        pages.subscribe(setHomePageDebounced);
      } else {
        setHomePage();
      }
    }

    router.scrollOffset = () => ({
      top:
        document.querySelector('.navbar')?.getBoundingClientRect().height ?? 0,
      left: 0,
    });
  },
};

export * from '../shared';

export default theme;
