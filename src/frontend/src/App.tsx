import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { WarRoom } from "./pages/WarRoom";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const warRoomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: WarRoom,
});

const routeTree = rootRoute.addChildren([warRoomRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
