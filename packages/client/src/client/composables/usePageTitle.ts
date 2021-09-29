import { SiteLocaleData, toTitleCase } from '@vitebook/core/shared';
import { computed, ComputedRef } from 'vue';

import type { LoadedPage } from '../../shared/types/Page';
import { useLocalizedSiteOptions } from './useLocalizedSiteOptions';
import { usePage } from './usePage';

export type PageTitleRef = ComputedRef<string>;

export function usePageTitle(): PageTitleRef {
  const page = usePage();
  const site = useLocalizedSiteOptions();
  return computed(() => resolvePageTitle(site.value, page.value));
}

const resolvePageTitle = (
  siteLocale: SiteLocaleData,
  page?: LoadedPage
): string => {
  const title = page?.meta.title ?? inferPageTitle(page);
  return title ? `${title} | ${siteLocale.title}` : siteLocale.title;
};

const PAGE_TITLE_RE = /\/(.+)\.html$/;

export function inferPageTitle(page?: LoadedPage): string | null {
  if (!page) return null;
  return toTitleCase(page.route.match(PAGE_TITLE_RE)?.[1] ?? '');
}
