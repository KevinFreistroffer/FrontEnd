export interface IRouteConfig {
  path: string;
  display: string;
}

export const publicRoutes: IRouteConfig[] = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/signup",
    display: "Signup",
  },
];

export const privateRoutes: IRouteConfig[] = [
  {
    path: "/table",
    display: "Table",
  },
];

export const routes = [...publicRoutes, ...privateRoutes];
