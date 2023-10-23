import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signOut = () => {
    return firebase.auth().signOut();
  }

export const auth = firebase.auth();