import {
  SettingOutlined,
  SnippetsOutlined,
  ReconciliationOutlined,
  DashboardOutlined,
  TableOutlined,
} from "@ant-design/icons";
import Post from "../View/userDetail/page/Post";
import Setting from "../View/userDetail/page/Setting";
import NewSubject from "../View/userDetail/page/NewSubject";
import Study from "../View/userDetail/page/Study";

const userService = [
  {
    label: "Posts",
    to: "/post",
    icon: TableOutlined,
    element: Post,
  },
  {
    label: "Setting",
    to: "/setting",
    icon: SettingOutlined,
    element: Setting,
  },
  {
    label: "New subject",
    to: "/newSubject",
    icon: SnippetsOutlined,
    element: NewSubject,
  },
  {
    label: "Study",
    to: "/study",
    icon: ReconciliationOutlined,
    element: Study,
  },
];

export default userService;
