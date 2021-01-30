import firebase from "firebase";

class User {
  static getUid(): string {
    return firebase.auth().currentUser?.uid ?? '';
  }
}

export default User;