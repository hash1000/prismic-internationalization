import { notFound } from 'next/navigation';
import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { getLocales } from '@/utils/getLocales';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

type Params =  {  uid: string; lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolvedParams = await Promise.resolve(params);
  const { lang, uid } = resolvedParams;

  const client = createClient();
  try {
    const page = await client.getByUID('page', uid, { lang });
    const locales = await getLocales(page, client);

    return (
      <>
        <LanguageSwitcher locales={locales} />
        <SliceZone slices={page.data.slices} components={components} />
      </>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    notFound();
  }
}

// Generate static paths at build time
export async function generateStaticParams(): Promise<Params[]> {
  const client = createClient();

  const pages = await client.getAllByType('page', {
    predicates: [prismic.filter.not('my.page.uid', 'home')],
    lang: '*',
  });

  return pages.map((page) => ({ uid: page.uid, lang: page.lang }));
}
