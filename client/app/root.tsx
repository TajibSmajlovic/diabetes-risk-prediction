import {
    ActionFunction,
    createCookie,
    json,
    Link,
    LinksFunction,
    LoaderFunction,
    useLoaderData,
} from 'remix';
import { LiveReload, Outlet, Links, Scripts } from 'remix';

import resetStylesUrl from './styles/reset.css';
import sharedStylesUrl from './styles/shared.css';
import typographyStylesUrl from './styles/typography.css';
import indexStylesUrl from './styles/index.css';

import { Decoration as Decorations, Navigation } from './components';
import { decorationLinks, navigationLinks } from './components/index.styles';
import { useSetupTranslations } from 'remix-i18next';
import remixI18n from './utils/localization/i18n.server';
import { useTranslation } from 'react-i18next';

export const links: LinksFunction = () => {
    return [
        ...decorationLinks(),
        ...navigationLinks(),
        {
            rel: 'stylesheet',
            href: resetStylesUrl,
        },
        {
            rel: 'stylesheet',
            href: sharedStylesUrl,
        },
        {
            rel: 'stylesheet',
            href: typographyStylesUrl,
        },
        {
            rel: 'stylesheet',
            href: indexStylesUrl,
        },
    ];
};

export const loader: ActionFunction = async ({ request }) => {
    const locale = await remixI18n.getLocale(request);
    const t = await remixI18n.getFixedT(request, 'index');
    const title = t('headTitle');
    const lngInQuery = new URL(request.url).searchParams.get('lng');
    const options = {} as any;
    if (lngInQuery) {
        // on language change via lng search param, save selection to cookie
        options.headers = {
            'Set-Cookie': await createCookie('locale').serialize(locale),
        };
    }
    return json({ locale, title }, options);
};

export default function App() {
    const { i18n } = useTranslation();
    const { locale } = useLoaderData();
    useSetupTranslations(locale);

    return (
        <html lang={i18n.language}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>Diabetes Risk Prediction</title>
                <Links />
            </head>
            <body>
                <Decorations />
                <Navigation />
                <Outlet />
                <Scripts />
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
            </body>
        </html>
    );
}
