import React from "react";

const base = require("@jupyter-widgets/base");
const apputils = require('@jupyterlab/apputils');
const jupyterMaterialui = require("./index");

module.exports = {
  id: "jupyter-materialui",
  optional: [apputils.IThemeManager],
  requires: [base.IJupyterWidgetRegistry],
  activate(app, widgets, themeManager) {
    if (themeManager) {
      setCurrentTheme(themeManager.theme);
    }

    /**
     * Widget view for React component wrapped within a Material UI
     * theme provider matching JupyterLab theme
     */
    class JupyterLabReactView extends jupyterMaterialui.ReactView {
      _style(component) {
        if (themeManager) {
          return (
            <apputils.UseSignal
              signal={themeManager.themeChanged}
              initialArgs={{
                name: "",
                oldValue: null,
                newValue: themeManager.theme,
              }}
            >
              {(_, changedTheme) => {
                setCurrentTheme((changedTheme && changedTheme.newValue) || null);
                const theme = getMuiTheme();
                return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
              }}
            </apputils.UseSignal>
          );
        } else {
          return super._style(component);
        }
      }
    }

    // Register models and view
    widgets.registerWidget({
      name: "jupyter-materialui",
      version: jupyterMaterialui.version,
      exports: {
        ...jupyterMaterialui,
        ReactView: JupyterLabReactView,
      },
    });
  },
  autoStart: true,
};
