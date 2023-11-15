import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LAYOUT_EN from "../locales/en/layout.json";
import LAYOUT_VI from "../locales/vi/layout.json";
import LAYOUT_JA from "../locales/ja/layout.json";
import LAYOUT_ZH from "../locales/zh/layout.json";
import LAYOUT_KO from "../locales/ko/layout.json";
import HOME_EN from "../locales/en/home.json";
import HOME_VI from "../locales/vi/home.json";
import HOME_JA from "../locales/ja/home.json";
import HOME_ZH from "../locales/zh/home.json";
import HOME_KO from "../locales/ko/home.json";
const resources = {
  en: {
    layout: LAYOUT_EN,
    home: HOME_EN,
  },
  vi: {
    layout: LAYOUT_VI,
    home: HOME_VI,
  },
  ja: {
    layout: LAYOUT_JA,
    home: HOME_JA,
  },
  zh: {
    layout: LAYOUT_ZH,
    home: HOME_ZH,
  },
  ko: {
    layout: LAYOUT_KO,
    home: HOME_KO,
  },
};

const defaultNS = "layout";

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["layout"],
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});
