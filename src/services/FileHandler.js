import Firebase from '../services/Firebase';

export const createUploadTask = (userID, file) => {
  return Firebase.storage()
    .ref()
    .child(`userPhotos/${userID}${file.name}`)
    .put(file);
};
