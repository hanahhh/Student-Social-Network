import { Tag } from "antd";
export const getScoreStatus = (status) => {
  if (status === 0) {
    return <Tag color="green">Passed</Tag>;
  } else if (status === 1) {
    return <Tag color="red">Failed</Tag>;
  } else {
    return <Tag color="gold">On going</Tag>;
  }
};

export const subject_status_option = [
  {
    label: "Passed",
    value: 0,
  },
  {
    label: "Failed",
    value: 1,
  },
  {
    label: "Ongoing",
    value: 2,
  },
];
