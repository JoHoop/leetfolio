import firebase from './Firebase';

export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signInWithAuthProvider = (provider, mobile) => {
  const authProvider = new firebase.auth.OAuthProvider(provider.id);
  if (mobile) {
    return firebase.auth().signInWithRedirect(authProvider);
  }
  return firebase.auth().signInWithPopup(authProvider);
};

export const anonSignIn = () => {
  return firebase.auth().signInAnonymously();
};

export const signOut = () => {
  return firebase.auth().signOut();
};

export const changeUsername = (username) => {
  return firebase.auth().currentUser.updateProfile({
    displayName: username,
  });
};

export const changeEmail = (email) => {
  return firebase.auth().currentUser.updateEmail(email);
};

export const verifyEmail = () => {
  return firebase.auth().currentUser.sendEmailVerification();
};

export const changePassword = (password) => {
  return firebase.auth().currentUser.updatePassword(password);
};

export const resetPassword = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const uploadPhoto = (userID, file) => {
  return firebase
    .storage()
    .ref()
    .child(`userPhotos/${userID}${file.name}`)
    .put(file);
};

export const changePhoto = (url) => {
  return firebase.auth().currentUser.updateProfile({
    photoURL: url,
  });
};

export const deletePhoto = (url) => {
  if (!url) return;
  return firebase.storage().refFromURL(url).delete();
};

export const deleteUser = () => {
  return firebase.auth().currentUser.delete();
};
