import { NextSeo } from 'next-seo';
import { SITE } from './src/config';

export default function Head() {
    return <NextSeo title={SITE.title} description={SITE.description} useAppDir={true} />;
}
