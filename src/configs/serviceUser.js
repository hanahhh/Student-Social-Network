import {
  ReconciliationOutlined,
  SettingOutlined,
  SnippetsOutlined,
  TableOutlined,
} from "@ant-design/icons";
import NewSubject from "../View/userDetail/page/NewSubject";
import OwnPost from "../View/userDetail/page/OwnPost";
import Setting from "../View/userDetail/page/Setting";
import Study from "../View/userDetail/page/Study";

const userService = [
  {
    label: "Posts",
    to: "/post",
    icon: TableOutlined,
    element: OwnPost,
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
