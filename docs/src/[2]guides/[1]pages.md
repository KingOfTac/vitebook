<script>
import { Tabs, TabPanel } from '@vitebook/client/components/tabs';

const langs = ['Markdown', 'Preact', 'Svelte', 'Vue'];
</script>

# Pages

The files you'd like to declare as pages are configured in the Vitebook configuration file
as shown [here](../introduction/configuration.html#pages). Pages can be markdown files (`.md`),
or component files (`.vue,.svelte,.jsx,.tsx`), depending on the plugins you've setup.

It's important to note that a plugin _must_ resolve a file as a page via the `resolvePage` hook,
otherwise you'll see a warning in your terminal. If a file is _not_ resolved as a page by any
plugin but it's included in your configuration, it is assumed to not be supported and ultimately
not included in your application.

## Routing

Every file you declare as a page, is used to do something called file-based routing. This simply
means the path to your file determines the application route to that page in your browser. The
[`<srcDir>`](../introduction/configuration.html#directories) is used to determine the root of
all routes.

:::info
The example mappings below of file path to application routes is assuming your `<srcDir>` is
the default, which is `<rootDir>/src`.
:::

<Tabs values={langs} groupId="lang">
<TabPanel value="Markdown">

```
src/index.md -> site.com/
src/intro.md -> site.com/intro.html
src/about/README.md -> site.com/about/
src/button/index.md -> site.com/button/
src/button/usage.md -> site.com/button/usage.html
```

</TabPanel>

<TabPanel value="Preact">

```
src/index.jsx -> site.com/
src/intro.jsx -> site.com/intro.html
src/button/index.jsx -> site.com/button/
src/button/usage.jsx -> site.com/button/usage.html
src/Button/Button.story.jsx -> site.com/button/button.html
```

</TabPanel>

<TabPanel value="Svelte">

```
src/index.svelte -> site.com/
src/intro.svelte -> site.com/intro.html
src/button/index.svelte -> site.com/button/
src/button/usage.svelte -> site.com/button/usage.html
src/Button/Button.story.svelte -> site.com/button/button.html
```

</TabPanel>

<TabPanel value="Vue">

```
src/index.vue -> site.com/
src/intro.vue -> site.com/intro.html
src/button/index.vue -> site.com/button/
src/button/usage.vue -> site.com/button/usage.html
src/Button/Button.story.vue -> site.com/button/button.html
```

</TabPanel>
</Tabs>

### 404 Page

The theme you've selected will most likely already include a 404 page, but you can have a
custom one by creating a file at `<srcDir>/404.{md,jsx,tsx,vue,svelte}`. Now when
a user visits any unknown route in the browser they'll be redirected to this 404 page.

### Custom Routes

You can escape the default route resolution in two ways:

(1) Creating a [route resolver](../introduction/configuration.md#routes) in your Vitebook config file.

```js {4-6}
import { defineConfig } from '@vitebook/client/node';

export default defineConfig({
  resolveRoute({ filePath, relativeFilePath }) {
    // ...
  },
});
```

(2) Or, exporting a route in either the frontmatter for markdown files, or as an export binding for
JS modules.

<Tabs values={langs} groupId="lang">
<TabPanel value="Markdown">

```md
---
route: 'Design System/Atoms/Button'
---

# Title

...
```

</TabPanel>

<TabPanel value="Preact">

```tsx
export const __route = 'Design System/Atoms/Button';

function Page() {
  // ...
}

export default Page;
```

</TabPanel>

<TabPanel value="Svelte">

```svelte
<script context="module" lang="ts">
export const __route = 'Design System/Atoms/Button';
</script>

<script lang="ts">
  // ...
</script>

<!-- ... -->
```

</TabPanel>

<TabPanel value="Vue">

```vue
<script lang="ts">
export const __route = 'Design System/Atoms/Button';
</script>

<script setup lang="ts">
// ...
</script>

<template>
  <!-- ... -->
</template>
```

</TabPanel>
</Tabs>

## Page Meta

Page meta refers to metadata about the page such as the title, description, and head tags. You
can set the page meta via markdown frontmatter, or by exporting a `__pageMeta` object.

:::info
The title for markdown pages is automatically inferred by the top-level heading, and for all other
pages by the filename.
:::

<Tabs values={langs} groupId="lang">
<TabPanel value="Markdown">

```md
---
title: Awesome Title
description: Awesome description.
head:
  - - meta
    - name: foo
      content: bar
  - - script
    - type: module
      src: https://foobar.com
---

# Inferred Title

...
```

</TabPanel>

<TabPanel value="Preact">

```tsx
import type { PageMeta } from '@vitebook/client';

// This can also be an async function which receives the loaded page and module.
export const __pageMeta: PageMeta = {
  title: 'Awesome Title',
  description: 'Awesome description.',
  head: [
    ['meta', { name: 'foo', content: 'bar' }],
    ['script', { type: 'module', src: 'https://foobar.com' }],
    ['style', { type: 'text/css' }, 'p { color: red; }'],
  ],
};

function Page() {
  // ...
}

export default Page;
```

</TabPanel>

<TabPanel value="Svelte">

```svelte
<script context="module" lang="ts">
import type { PageMeta } from '@vitebook/client';

// This can also be an async function which receives the loaded page and module.
export const __pageMeta: PageMeta = {
  title: 'Awesome Title',
  description: 'Awesome description.',
  head: [
    ['meta', { name: 'foo', content: 'bar' }],
    ['script', { type: 'module', src: 'https://foobar.com' }],
    ['style', { type: 'text/css' }, 'p { color: red; }'],
  ],
}
</script>

<script lang="ts">
  // ...
</script>

<!-- ... -->
```

</TabPanel>

<TabPanel value="Vue">

```vue
<script lang="ts">
import type { PageMeta } from '@vitebook/client';

// This can also be an async function which receives the loaded page and module.
export const __pageMeta: PageMeta = {
  title: 'Awesome Title',
  description: 'Awesome description.',
  head: [
    ['meta', { name: 'foo', content: 'bar' }],
    ['script', { type: 'module', src: 'https://foobar.com' }],
    ['style', { type: 'text/css' }, 'p { color: red; }'],
  ],
};
</script>

<script setup lang="ts">
// ...
</script>

<template>
  <!-- ... -->
</template>
```

</TabPanel>
</Tabs>
