import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18nextOptions from "./utils/localization/i18nextOptions";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // Here you also need to initialize i18next using initReactI18next, you should
  // use the same configuration as in your client side.
  if (!i18next.isInitialized)
    // prevent i18next to be initialized multiple times
    await i18next.use(initReactI18next).init(i18nextOptions);

  let markup = renderToString(
    <I18nextProvider i18n={i18next}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
