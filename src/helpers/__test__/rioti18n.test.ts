import { makeI18n, BCPLocale } from "../rioti18n";

describe("rioti18n helper", () => {
  test("defaults to supporting all locales", () => {
    const helper = makeI18n();
    const allLocales = Object.values(BCPLocale);
    expect(helper.getValidLocales()).toEqual(allLocales);
    expect(helper.isValid("en-us")).toBe(true);
  });

  test("can receive a subset of valid locales", () => {
    const helper = makeI18n([BCPLocale["en-us"]]);
    const allLocales = Object.values(BCPLocale);
    expect(helper.getValidLocales()).toEqual(["en-us"]);
    expect(helper.isValid("en-us")).toBe(true);
  });

  test("can receive a subset of valid locale strings", () => {
    const helper = makeI18n(["en-us"]);
    const allLocales = Object.values(BCPLocale);
    expect(helper.getValidLocales()).toEqual(["en-us"]);
  });

  test("can receive a mixed subset of valid locales and locale strings", () => {
    const helper = makeI18n(["en-us", BCPLocale["en-gb"]]);
    const allLocales = Object.values(BCPLocale);
    expect(helper.getValidLocales()).toEqual(["en-us", "en-gb"]);
  });
});
