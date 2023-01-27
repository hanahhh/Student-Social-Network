import {
  CrownOutlined,
  CrownFilled,
  HomeOutlined,
  HomeFilled,
  SlackOutlined,
  SlackCircleFilled,
  UserOutlined,
  SplitCellsOutlined,
} from "@ant-design/icons";

const _nav = [
  {
    label: "Home",
    to: "/",
    icon: HomeOutlined,
    iconFill: HomeFilled,
  },
  {
    label: "Post",
    to: "/posts",
    icon: CrownOutlined,
    iconFill: CrownFilled,
  },
  {
    label: "User",
    to: "/user/post",
    icon: UserOutlined,
    iconFill: UserOutlined,
  },
  {
    label: "Logout",
    to: "/login",
    icon: SplitCellsOutlined,
    iconFill: SplitCellsOutlined,
  },
];

export default _nav;
