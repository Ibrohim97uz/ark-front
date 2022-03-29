import React from "react";
import {FormattedMessage, injectIntl,} from "react-intl";
import {validatingJSON} from '../util/CustomFunc'
import config from "../util/config"
const {locales}=config;

const IntlMassage = props => <FormattedMessage {...props} />;
export default injectIntl(IntlMassage, {
  withRef: false
});


export function intlMessages(data) {
  let locale = validatingJSON(localStorage.getItem('locale'));
  if (!locale){
    locale=locales[0]
  }
  let relevantLanguageData = '';
  if (Object.keys(data).length !== 0) {
    for (let i in data) {
      if (locale.locale === i) {
        return data[i]
      }
    }
  }
  return relevantLanguageData;

}
