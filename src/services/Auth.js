import firebase from './Firebase';

const auth = firebase.auth();

export const signUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signInWithAuthProvider = (provider, mobile) => {
  const authProvider = new firebase.auth.OAuthProvider(provider.id);
  if (mobile) {
    return auth.signInWithRedirect(authProvider);
  }
  return auth.signInWithPopup(authProvider);
};

export const anonSignIn = () => {
  return auth.signInAnonymously();
};

export const signOut = () => {
  return auth.signOut();
};

export const linkAuthProvider = (provider, mobile) => {
  const authProvider = new firebase.auth.OAuthProvider(provider.id);
  if (mobile) {
    return auth.currentUser.linkWithRedirect(authProvider);
  }
  return auth.currentUser.linkWithPopup(authProvider);
};

export const unlinkAuthProvider = (provider) => {
  return auth.currentUser.unlink(provider.id);
};

export const authProviderData = (providerId) => {
  if (!providerId) {
    return;
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    return;
  }

  const providerData = currentUser.providerData;
  if (!providerData) {
    return;
  }

  return providerData.find(
    (authProvider) => authProvider.providerId === providerId
  );
};

export const changeUsername = (username) => {
  return auth.currentUser.updateProfile({
    displayName: username,
  });
};

export const changeEmail = (email) => {
  return auth.currentUser.updateEmail(email);
};

export const verifyEmail = () => {
  return auth.currentUser.sendEmailVerification();
};

export const changePassword = (password) => {
  return auth.currentUser.updatePassword(password);
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

export const uploadPhoto = (userID, file) => {
  return firebase
    .storage()
    .ref()
    .child(`userPhotos/${userID}${file.name}`)
    .put(file);
};

export const changePhoto = (url) => {
  return auth.currentUser.updateProfile({
    photoURL: url,
  });
};

export const deletePhoto = (url) => {
  if (!url) return;
  return firebase.storage().refFromURL(url).delete();
};

export const deleteUser = () => {
  return auth.currentUser.delete();
};
