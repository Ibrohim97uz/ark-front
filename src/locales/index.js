import enLang from "./entries/en-US";
import ruLang from "./entries/ru-RU";
import uzLang from "./entries/uz-UZ";
import {addLocaleData} from "react-intl";

const AppLocale = {
  en: enLang,
  ru: ruLang,
  uz: uzLang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.ru.data);
addLocaleData(AppLocale.uz.data);

export default AppLocale;
