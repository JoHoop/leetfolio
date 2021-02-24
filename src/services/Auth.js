import Firebase from './Firebase';

export const signUp = (email, password) => {
  return Firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (email, password) => {
  return Firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = () => {
  const provider = new Firebase.auth.GoogleAuthProvider();
  return Firebase.auth().signInWithPopup(provider);
};

export const signOut = () => {
  return Firebase.auth().signOut();
};

export const changeUsername = (username) => {
  return Firebase.auth().currentUser.updateProfile({
    displayName: username,
  });
};

export const changeEmail = (email) => {
  return Firebase.auth().currentUser.updateEmail(email);
};

export const verifyEmail = () => {
  return Firebase.auth().currentUser.sendEmailVerification();
};

export const changePassword = (password) => {
  return Firebase.auth().currentUser.updatePassword(password);
};

export const resetPassword = (email) => {
  return Firebase.auth().sendPasswordResetEmail(email);
};

export const uploadPhoto = (userID, file) => {
  return Firebase.storage()
    .ref()
    .child(`userPhotos/${userID}${file.name}`)
    .put(file);
};

export const changePhoto = (url) => {
  return Firebase.auth().currentUser.updateProfile({
    photoURL: url,
  });
};

export const deletePhoto = (url) => {
  if (!url) return;
  return Firebase.storage().refFromURL(url).delete();
};

export const deleteUser = () => {
  return Firebase.auth().currentUser.delete();
};
