import { fs } from '../../../../utils/fs.js';
import { path } from '../../../../utils/path.js';
import type { MarkdownEnv } from '../../Markdown.js';
import type { ImportCodeTokenMeta } from './ImportCodeTokenMeta.js';

export const resolveImportCode = (
  { importPath, lineStart, lineEnd }: ImportCodeTokenMeta,
  { filePath }: MarkdownEnv
): {
  importFilePath: string | null;
  importCode: string;
} => {
  let importFilePath = importPath;

  if (!path.isAbsolute(importPath)) {
    // If the importPath is relative path, we need to resolve it according to the markdown filePath.
    if (!filePath) {
      return {
        importFilePath: null,
        importCode: 'Error when resolving path'
      };
    }
    importFilePath = path.resolve(filePath, '..', importPath);
  }

  // Check file existence.
  if (!fs.existsSync(importFilePath)) {
    return {
      importFilePath,
      importCode: 'File not found'
    };
  }

  // Read file content.
  const fileContent = fs.readFileSync(importFilePath).toString();

  // Resolve partial import.
  return {
    importFilePath,
    importCode: fileContent
      .split('\n')
      .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
      .join('\n')
      .replace(/\n?$/, '\n')
  };
};
