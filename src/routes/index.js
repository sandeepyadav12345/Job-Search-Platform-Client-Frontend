import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const PagesLanding2 = Loadable(lazy(() => import('views/pages/landing2')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([{ path: '/', element: <PagesLanding /> },{path:'/userlogged', element:<PagesLanding2/>}, AuthenticationRoutes, LoginRoutes, MainRoutes]);
}
