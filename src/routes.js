import Roles from "./configs/roles";
import Home from "./View/home/Home";
import SubjectDetail from "./View/home/SubjectDetail";
import NeighborDetail from "./View/neighborDetail/NeighborDetail";
import PostList from "./View/post/PostList";
import Setting from "./View/setting/Setting";
import Service from "./View/systemService/Service";
import User from "./View/userDetail/User";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    name: "Home",
    permission: [Roles.USER],
  },
  {
    path: "/posts",
    exact: true,
    component: PostList,
    name: "Post list",
    permission: [Roles.USER],
  },
  {
    path: "/service",
    exact: true,
    component: Service,
    name: "Service",
    permission: [Roles.USER],
  },
  {
    path: "/user/*",
    exact: true,
    component: User,
    name: "User",
    permission: [Roles.USER],
  },
  {
    path: "/setting",
    exact: true,
    component: Setting,
    name: "Setting",
    permission: [Roles.USER],
  },
  {
    path: "/neighbor/:id/*",
    exact: true,
    component: NeighborDetail,
    name: "Neighbor",
    permission: [Roles.USER],
  },
  {
    path: "/subject/:id",
    exact: true,
    component: SubjectDetail,
    name: "Subject detail",
    permission: [Roles.USER],
  },
];

export default routes;
