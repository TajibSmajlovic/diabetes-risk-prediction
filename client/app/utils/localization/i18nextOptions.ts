export default {
  debug: process.env.NODE_ENV !== "production",
  fallbackLng: "en",
  supportedLngs: ["en", "tr", "bh"],
  defaultNS: "common",
  ns: [],
  react: { useSuspense: false },
  resources: {},
};
