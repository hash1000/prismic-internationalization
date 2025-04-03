// ./src/components/LanguageSwitcher.tsx

import { PrismicNextLink } from '@prismicio/next';

interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
}

const localeLabels = {
  'en-us': 'EN',
  'de-de': 'DE',
};

export const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => (
  <div className="flex justify-center items-center w-full absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
    <span aria-hidden>🌐</span>
    <ul className="flex gap-3">
      {locales.map((locale) => (
        <li key={locale.lang} className="first:font-semibold">
          <PrismicNextLink
            href={locale.url}
            locale={locale.lang}
            aria-label={`Change language to ${locale.lang_name}`}
            className="hover:underline"
          >
            {localeLabels[locale.lang as keyof typeof localeLabels] || locale.lang}
          </PrismicNextLink>
        </li>
      ))}
    </ul>
  </div>
);
