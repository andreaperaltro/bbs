import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDohYHimO-EvkhMgBXM4lFhklGa14M8mpU",
  authDomain: "portfolio-bbs-c62f2.firebaseapp.com",
  projectId: "portfolio-bbs-c62f2",
  storageBucket: "portfolio-bbs-c62f2.firebasestorage.app",
  messagingSenderId: "983291858895",
  appId: "1:983291858895:web:624086165ec1188e6a0cba",
  measurementId: "G-RLXFB0N0WL"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app); 