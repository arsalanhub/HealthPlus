import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";

export default function Fireauth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const create = async () => {
    let res = await auth.createUserWithEmailAndPassword(email, password);
    console.log(res);
  };

  useEffect(() => {
    let unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      return () => {
        unsub(); // cleanup
      };
    });
  }, []);

  const logout = async () => {
    await auth.signOut();
  };
  
  return (
    <>
      {user == null ? (
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={create}>Click Me</button>
        </div>
      ) : (
        <div>
          <div>{user.email}</div>
          <button onClick={logout}>Signout</button>
        </div>
      )}
    </>
  );
}
