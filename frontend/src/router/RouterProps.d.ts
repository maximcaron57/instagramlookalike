import { ComponentType, LazyExoticComponent } from 'react';

export interface RouteProps {
  key: string;
  path: string;
  exact: boolean;
  component?: LazyExoticComponent<ComponentType<any>>;
  children?: RouteProps[];
  redirect?: string;
  private?: boolean;
}
