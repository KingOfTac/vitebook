import { UserConfig as ViteConfig } from 'vite';

import type { AppConfig } from './app/AppOptions';

export * from './app/App';
export * from './app/AppOptions';
export * from './app/markdown/plugins';
export * from './app/markdown/types';
export * from './app/plugin/ClientPlugin';
export * from './app/plugin/Plugin';
export * from './cli/run';

export function defineConfig(
  config: ViteConfig & { book: AppConfig },
): typeof config {
  return config;
}

export * from '../shared';
export { filePathToRoute } from './app/create/resolvePages';
export { VM_PREFIX } from './app/vite/alias';
export { MarkdownPluginOptions } from './app/vite/plugins/markdownPlugin';
export * from './utils';
