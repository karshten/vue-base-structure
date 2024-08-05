import "./assets/main.css";

import { createApp, nextTick } from "vue";
import { createPinia } from "pinia";
import * as Sentry from "@sentry/vue";
import posthog from "./plugins/posthog";
import VueGtagPlugin from "vue-gtag-next";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

Sentry.init({
  app,
  // TODO: replace with a real dsn
  dsn: "https://",
  integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

app.use(VueGtagPlugin, {
  // TODO: replace with a real id
  appId: "GA_MEASUREMENT_ID",
});

app.use(posthog);
app.use(createPinia());
app.use(router);

app.mount("#app");

router.afterEach((to, _from, failure) => {
  if (!failure) {
    nextTick(() => {
      app.config.globalProperties.$posthog.capture("$pageview", { path: to.fullPath });
    });
  }
});
