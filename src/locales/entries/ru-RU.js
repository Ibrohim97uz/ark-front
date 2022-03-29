import antdRu from "antd/lib/locale-provider/ru_RU";
import appLocaleData from "react-intl/locale-data/ru";
import ruMessages from "../locales/ru_RU.json";

const RuLang = {
  messages: {
    ...ruMessages
  },
  antd: antdRu,
  locale: 'ru-RU',
  data: appLocaleData
};
export default RuLang;
