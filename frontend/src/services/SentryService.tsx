import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const initSentry = () => {
  if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      release: `${process.env.REACT_APP_NAME}@${process.env.npm_package_version}`,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
};

export { initSentry };
