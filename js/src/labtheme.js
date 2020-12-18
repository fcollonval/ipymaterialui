import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Return the current material-ui theme fitting the JupyterLab theme
 */
export function getMuiTheme() {
  let theme;
  if (Private.currentTheme) {
    theme = Private.THEMES[Private.currentTheme];
  } else {
    theme = Private.generateMuiThemeFromJPVar();
  }

  return theme;
}

/**
 * Set the current JupyterLab theme
 *
 * @param name JupyterLab theme
 */
export function setCurrentTheme(name) {
  Private.currentTheme = name;
  if (name && !Private.THEMES[name]) {
    Private.THEMES[name] = Private.generateMuiThemeFromJPVar();
  }
}

const Private = {
  /**
   * Cache of material-ui themes generated from JupyterLab themes.
   */
  THEMES: {},

  // eslint-disable-next-line prefer-const
  currentTheme: null,

  /**
   * Get the value of a CSS variable
   *
   * @param name CSS variable name
   * @returns The CSS variable value
   */
  getCSSVar: (name) =>  {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  },

  /**
   * Create a material-ui theme from the current JupyterLab theme
   *
   * @returns The material-ui theme
   */
  generateMuiThemeFromJPVar: () => {
    return createMuiTheme({
      palette: {
        primary: {
          main: getCSSVar('--jp-brand-color1'),
          contrastText: getCSSVar('--jp-ui-inverse-font-color1'),
        },
        secondary: {
          main: getCSSVar('--jp-accent-color1'),
          contrastText: getCSSVar('--jp-ui-inverse-font-color1'),
        },
        error: {
          main: getCSSVar('--jp-error-color1'),
          contrastText: getCSSVar('--jp-ui-inverse-font-color1'),
        },
        warning: {
          main: getCSSVar('--jp-warn-color1'),
          contrastText: getCSSVar('--jp-ui-inverse-font-color1'),
        },
        info: {
          main: getCSSVar('--jp-info-color1'),
        },
        success: {
          main: getCSSVar('--jp-success-color1'),
        },
        text: {
          primary: getCSSVar('--jp-ui-font-color1'),
          secondary: getCSSVar('--jp-ui-font-color2'),
          disabled: getCSSVar('--jp-ui-font-color3'),
        },
        background: {
          default: getCSSVar('--jp-layout-color1'),
          paper: getCSSVar('--jp-layout-color1'),
        },
      },
      typography: {
        fontFamily: getCSSVar('--jp-ui-font-family'),
      },
    });
  }
}
