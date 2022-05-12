import { resolveRelativePath } from '../../utils/path';
import type { AppConfig, AppOptions } from '../AppOptions';

export const createAppOptions = ({
  cliArgs = { command: 'dev', '--': [] },
  cwd = process.cwd(),
  root = '.',
  pages = 'pages',
  output = 'build',
  public: publicdir = 'public',
  debug = false,
  include = ['!node_modules', '**/[^_]*.{svelte,md}'],
  plugins = [],
  markdown = {},
}: AppConfig): AppOptions => {
  const _cwd = resolveRelativePath(process.cwd(), cwd);
  const _root = resolveRelativePath(_cwd, root);
  const _pages = resolveRelativePath(_root, pages);
  const _output = resolveRelativePath(_root, output);
  const _public = resolveRelativePath(_root, publicdir);

  return {
    cliArgs,
    debug,
    cwd: _cwd,
    root: _root,
    pages: _pages,
    output: _output,
    public: _public,
    include,
    plugins,
    markdown,
  };
};
