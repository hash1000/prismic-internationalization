import { SliceZone } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { getLocales } from '@/utils/getLocales';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

type Params = { 
  lang: string;
  uid?: string;
};

export default async function Index({ params }: { params: Promise<Params> }) {
  const resolvedParams = await Promise.resolve(params);
  const { lang, uid } = resolvedParams;
  const client = createClient();
  
  const pageUid = uid || 'home';

  try {
    const page = await client.getByUID('page', pageUid, { lang });
    const locales = await getLocales(page, client);

    return (
      <>
        <LanguageSwitcher locales={locales} />
        <SliceZone slices={page.data.slices} components={components} />
      </>
    );
  } catch (error) {
    console.error('Failed to fetch page:', error);
    return <div>Page not found</div>;
  }
}
