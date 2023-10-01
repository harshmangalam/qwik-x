import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:url" content="https://qwik-x.onrender.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="qwik-x | Social Media web app" />
        <meta
          property="og:description"
          content="Social media web app like Twitter build with Qwikcity"
        />
        <meta property="og:image" content="Image URL Here" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="qwik-x.onrender.com" />
        <meta property="twitter:url" content="https://qwik-x.onrender.com/" />
        <meta name="twitter:title" content="qwik-x | Social Media web app" />
        <meta
          name="twitter:description"
          content="Social media web app like Twitter build with Qwikcity"
        />
        <meta name="twitter:image" content="Image URL Here" />

        <meta
          name="description"
          content="Social media web app like Twitter build with Qwikcity"
        />

        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
