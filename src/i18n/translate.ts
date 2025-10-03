import type { TOptions } from "i18next";
import i18n, { t } from "i18next";
import { TxKeyPath } from "./i18n";

/**
 * Translates text.
 * @param {TxKeyPath} key - The i18n key.
 * @param {TOptions} options - The i18n options.
 * @returns {string} - The translated text.
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "./i18n"
 *
 * translate("common:ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TOptions): string {
  if (!i18n.isInitialized) {
    // uncomment to enable debug mode
    console.error("Translation attempted before i18n initialization:", key);
    return key; // Return key as fallback
  }

  return t(key, options);
}
