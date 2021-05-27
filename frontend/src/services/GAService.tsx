import ReactGA from 'react-ga';

const initGA = () => {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  }
};

const logPageView = (pathname: string, search: string) => {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(`${pathname}${search}`);
  }
};

export { logPageView, initGA };
