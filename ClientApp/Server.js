import React from "react";
import { SSRRoutes } from "./SSRRoutes";
import StateProvider from "./StateProvider";
import { createServerRenderer } from 'aspnet-prerendering';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default createServerRenderer((params) => {
  const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
  const routerContext = {};
  const serverData = params.data;
  const sheet = new ServerStyleSheet();

  const app = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StateProvider initState={null}>
        <SSRRoutes basename={basename} routerContext={routerContext}/>
      </StateProvider>
    </StyleSheetManager>
  );

  const styleTags = sheet.getStyleTags();

  return new Promise((resolve, reject) => {
    params.domainTasks.then(() => {
      resolve({
        html: app,
        globals: { serverData },
      });
    }, reject);
  });
});
