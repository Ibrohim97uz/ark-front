import {SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH,UPDATE_MENUS,UPDATE_STATE} from "constants/ActionTypes";
import {validatingJSON}  from '../../util/CustomFunc';
import {
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_FIXED,
  // NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_COLOR_SELECTION,
  THEME_COLOR_SELECTION_PRESET,
  THEME_TYPE,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";

const initialSettings = {
  navCollapsed: true,
  // navStyle: NAV_STYLE_FIXED,
  navStyle: localStorage.getItem("navStyle") ?localStorage.getItem("navStyle"):NAV_STYLE_FIXED,
  layoutType:localStorage.getItem("layoutType") ?localStorage.getItem("layoutType"): LAYOUT_TYPE_FULL,
  themeType:localStorage.getItem("themeType") ?localStorage.getItem("themeType"): THEME_TYPE_LITE,
  colorSelection: THEME_COLOR_SELECTION_PRESET,

  pathname: '',
  width: localStorage.getItem("width") ?localStorage.getItem("width"):window.innerWidth,
  isDirectionRTL: false,
  locale: validatingJSON(localStorage.getItem('locale'))  ? validatingJSON(localStorage.getItem('locale')) : {
    languageId: 'nameEn',
    locale: 'en',
    name: 'English',
    icon: 'us'
  },
  menus:[],
  resume:[],
  suggestionAndQuestion:[]

};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        pathname: action.payload.pathname,
        navCollapsed: false
      };

    case UPDATE_MENUS:
      localStorage.setItem("menus", action.payload.menus);
      return {
        ...state,
        menus: action.payload.menus
      };
    case TOGGLE_COLLAPSED_NAV:
      localStorage.setItem("navCollapsed", action.navCollapsed);
      return {
        ...state,
        navCollapsed: action.navCollapsed
      };
    case WINDOW_WIDTH:
      localStorage.setItem("width",action.width);
      return {
        ...state,
        width: action.width,
      };
    case THEME_TYPE:
      localStorage.setItem("themeType",action.themeType);
      return {
        ...state,
        themeType: action.themeType
      };
    case THEME_COLOR_SELECTION:
      localStorage.setItem("colorSelection",action.colorSelection);
      return {
        ...state,
        colorSelection: action.colorSelection
      };

    case NAV_STYLE:
      localStorage.setItem("navStyle",action.navStyle);
      return {
        ...state,
        navStyle: action.navStyle
      };
    case LAYOUT_TYPE:
      localStorage.setItem("layoutType",action.layoutType);
      return {
        ...state,
        layoutType: action.layoutType
      };

    case SWITCH_LANGUAGE:
      localStorage.setItem('locale', JSON.stringify(action.payload));
      return {
        ...state,
        locale: action.payload,
      };
    case UPDATE_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state;
  }
};

export default settings;
