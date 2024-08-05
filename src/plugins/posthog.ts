import posthog from "posthog-js";
import type { App } from "vue";

export default {
  install(app: App) {
    app.config.globalProperties.$posthog = posthog.init(
      // TODO: replace with a real key
      "ph_project_api_key",
      {
        // TODO: replace with a real instance
        api_host: "ph_instance_address",
        capture_pageview: false,
      }
    );
  },
};
