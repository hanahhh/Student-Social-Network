import fs from "fs";

export const deleteOldImagePostListener = (image) => {
  fs.unlink(image, (err) => {
    if (err) console.log(err);
    else {
      console.log(`\nDeleted old avatar: ${image}`);
    }
  });
};
function deleteOldCustomerAvatarListener(avatar) {
  fs.unlink(avatar, (err) => {
    if (err) console.log(err);
    else {
      console.log(`\nDeleted old avatar: ${avatar}`);
    }
  });
}
