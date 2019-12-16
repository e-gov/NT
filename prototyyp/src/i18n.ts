import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { ProcessAndArena, ProcessState } from './process/Base';

console.log("i18n init");

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'et',
    debug: process.env.NODE_ENV !== "production",
    backend: {
      loadPath: (window.location.pathname.includes("/ui/") ? "../../" : "") + 'locales/{{lng}}/{{ns}}.json'
    },
    // MUST be nonempty?
    whitelist: [ "et", "en"],
    nonExplicitWhitelist: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;

export function languages() {
  return i18n.options.whitelist;
}

export function _(...labels: string[]): string {
  return i18n.t(labels.join("."));
}

export type Translator = (...k: string[]) => string;
export type TranslatorWithParams = (k: string[], opts: any) => string;

export function __(props: ProcessAndArena<any>, labels: string[], options?: any): string {
  const suffix = labels.join(".");
  const arena = props.arena;
  const proc = props.process.name;
  const impl = props.process.type;
  return i18n.t([
    [arena, proc],
    [arena, impl],
    [impl],
    []
  ].map(pref => pref.concat(suffix).join(".")), options);
}

export function styleNameFor(arena: string, name: string, type?: string): string {
  return __({ arena: arena, process: { name: name, type: type! } as ProcessState<any> }, ["stylename"]);
}

export function person(id: string, prop: string): string {
  return i18n.t([`person.${id}.${prop}`, `person.default.${prop}`]).replace("ISIKUKOOD", id);
}

export function fullname(id: string): string {
  return person(id, "name");
}

export function business(id: string, prop: string): string {
  return i18n.t(`business.${id}.${prop}`);
}
