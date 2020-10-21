import { useIntl } from "gatsby-plugin-intl";

export type IntHelper = ReturnType<typeof getIntl>;

export function getIntl() {
  const intl = useIntl();
  const t = (id: string, values: { [k: string]: string | number } = {}) => intl.formatMessage({ id, ...values });
  return Object.freeze({ intl, t });
}

/**
 * i18n helper
 * Provides common functionality around i18n.
 *
 * @TODO move this into a reusable library rather than a per-project helper.
 * @TODO maybe we don't really need this helper at all?
 */

export enum BCPLocale {
  "cs-cz" = "cs-cz",
  "de-de" = "de-de",
  "el-gr" = "el-gr",
  "en-au" = "en-au",
  "en-gb" = "en-gb",
  "en-ph" = "en-ph",
  "en-pl" = "en-pl",
  "en-sg" = "en-sg",
  "en-us" = "en-us",
  "es-ar" = "es-ar",
  "es-es" = "es-es",
  "es-mx" = "es-mx",
  "fr-fr" = "fr-fr",
  "hu-hu" = "hu-hu",
  "id-id" = "id-id",
  "it-it" = "it-it",
  "ja-jp" = "ja-jp",
  "ko-kr" = "ko-kr",
  "pl-pl" = "pl-pl",
  "pt-br" = "pt-br",
  "ro-ro" = "ro-ro",
  "ru-ru" = "ru-ru",
  "th-th" = "th-th",
  "tr-tr" = "tr-tr",
  "vi-vn" = "vi-vn",
  "zh-cn" = "zh-cn",
  "zh-tw" = "zh-tw",
}

export enum RiotLocale {
  cs_CZ = "cs_CZ",
  de_DE = "de_DE",
  el_GR = "el_GR",
  en_AU = "en_AU",
  en_GB = "en_GB",
  en_PH = "en_PH",
  en_PL = "en_PL",
  en_SG = "en_SG",
  en_US = "en_US",
  es_AR = "es_AR",
  es_ES = "es_ES",
  es_MX = "es_MX",
  fr_FR = "fr_FR",
  hu_HU = "hu_HU",
  id_ID = "id_ID",
  it_IT = "it_IT",
  ja_JP = "ja_JP",
  ko_KR = "ko_KR",
  pl_PL = "pl_PL",
  pt_BR = "pt_BR",
  ro_RO = "ro_RO",
  ru_RU = "ru_RU",
  th_TH = "th_TH",
  tr_TR = "tr_TR",
  vi_VN = "vi_VN",
  zh_CN = "zh_CN",
  zh_TW = "zh_TW",
}

const UPPERCASE_EXCEPTIONS = ["ko-kr", "el-gr", "tr-tr"];

export type I18nHelper = ReturnType<typeof makeI18n>;
export function makeI18n(validLocales?: (BCPLocale | string)[]) {
  const locales: BCPLocale[] = validLocales?.map(bcpLocaleFromString) ?? Object.values(BCPLocale);

  const self = {
    isValid,
    getValidLocales,
    toValidLocale,
  };

  function isValid(locale: string): boolean {
    return locales.includes(bcpLocaleFromString(locale));
  }

  function getValidLocales(): BCPLocale[] {
    return locales;
  }

  function toValidLocale(str: string): BCPLocale {
    // TODO: Return the closes valid locale!
    if (!isValid(str)) {
      return str as BCPLocale;
    }
    return BCPLocale["en-us"];
  }

  return Object.freeze(self);
}

export function bcpLocaleFromString(s: string | BCPLocale): BCPLocale {
  if (!isBCPLocale(s)) {
    throw new TypeError(`Error: ${s} is not a valid BCP locale`);
  }
  return s as BCPLocale;
}
export function isBCPLocale(s: string): s is BCPLocale {
  return s in BCPLocale;
}

export function isRiotLocale(s: string): s is RiotLocale {
  return s in RiotLocale;
}

export function bcp2riot(bcp: BCPLocale): RiotLocale {
  const split = bcp.split("-");
  const riot = `${split[0]}_${split[1].toUpperCase()}`;
  if (!(riot in RiotLocale)) {
    throw new TypeError(`Error: ${riot} not in ${RiotLocale}`);
  }
  return riot as RiotLocale;
}

export function riot2bcp(riot: RiotLocale): BCPLocale {
  const split = riot.toLowerCase().split("_");
  const bcp = `${split[0]}-${split[1]}`;
  if (!(bcp in BCPLocale)) {
    throw new TypeError(`Error: ${bcp} not in ${BCPLocale}`);
  }
  return bcp as BCPLocale;
}

export function supportsUppercasing(locale: string) {
  return !UPPERCASE_EXCEPTIONS.includes(locale);
}
