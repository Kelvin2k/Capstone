import React from "react";
import { https } from "./configServ";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// const userServ = () => ({

// })

const userServ = () => ({
  // basic
  //     loginServ: (data) => {
  //         return https.post("/api/QuanlyNguoiDung/DangNhap", data)
  //     }

  //   then catch
  //   loginServ: (data) => {
  //     return signInWithEmailAndPassword(auth, data.email, data.password)
  //       .then((data) => {
  //         console.log("Firebase login successfully");
  //         console.log(auth.currentUser);
  //         return data
  //       })
  //       .catch((err) => {
  //         console.error("Wrong email or password!");
  //         throw err
  //       });
  //   }

  //   async await
  loginServ: async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("Firebase sign in successfully!");
      console.log(auth.currentUser);
      return userCredential;
    } catch (error) {
      console.error("Wrong email or password!");
      throw error;
    }
  },
});

export default userServ;
