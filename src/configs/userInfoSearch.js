import { ReconciliationOutlined, TableOutlined } from "@ant-design/icons";
import Posts from "../components/Posts";
import UserInfo from "../components/UserInfo";

const userInfoSearch = [
  {
    label: "Posts",
    to: "/post",
    icon: TableOutlined,
    element: Posts,
  },
  {
    label: "User information",
    to: "/info",
    icon: ReconciliationOutlined,
    element: UserInfo,
  },
];

export default userInfoSearch;
