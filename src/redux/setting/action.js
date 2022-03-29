import {SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH,UPDATE_MENUS} from "constants/ActionTypes";
import {LAYOUT_TYPE, NAV_STYLE, THEME_COLOR_SELECTION, THEME_TYPE} from "../../constants/ThemeSetting";
import {UPDATE_STATE} from "../auth/actionType";


export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
}

export function updateWindowWidth(width) {
  return {type: WINDOW_WIDTH, width};
}

export function setThemeType(themeType) {
  return {type: THEME_TYPE, themeType};
}

export function setThemeColorSelection(colorSelection) {
  return {type: THEME_COLOR_SELECTION, colorSelection};
}

export function onNavStyleChange(navStyle) {
  return {type: NAV_STYLE, navStyle};
}

export function onLayoutTypeChange(layoutType) {
  return {type: LAYOUT_TYPE, layoutType};
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}
export function onUpdateMenus(menus) {
  return {
    type: UPDATE_MENUS,
    payload: menus
  };
}
export const updateState = (data) => {
  return {
    type: UPDATE_STATE,
    payload: data
  }
};
