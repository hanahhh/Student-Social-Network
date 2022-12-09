import events from "events";
const eventEmitter = new events.EventEmitter();
import { deleteOldImagePostListener } from "../listener/imageListener.js";

export const deleteOldImagePostEvent = (image) => {
  //lang nghe su kien
  eventEmitter.once("IMAGE_DELETED", deleteOldImagePostListener);
  //sinh ra su kien
  eventEmitter.emit("AVATAR_DELETED", `${image}`);
};
function deleteOldCustomerAvatarEvent(avatar) {
  //lang nghe su kien
  eventEmitter.once(
    "AVATAR_DELETED",
    supplierListener.deleteOldCustomerAvatarListener
  );
  //sinh ra su kien
  eventEmitter.emit("AVATAR_DELETED", `public/${avatar}`);
}
