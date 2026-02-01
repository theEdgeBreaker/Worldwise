import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("Sanjana@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login , logout , isAuthenticated} = useAuth();
  const navigate = useNavigate();
  
  useEffect(function(){
    if(isAuthenticated) navigate("/app" ,{replace:true});
  },[isAuthenticated])

  function handleSubmit(e){
    e.preventDefault();
    login(email , password);
    navigate("/app");
  }

  // if(!isAuthenticated) return <Message message="Invalid user credential"/>
  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.placeBtn}>
          <div>
          <Button type="primary" style={{width:"100%" , margin:"0 auto" , fontSize:"2rem" }}>Login</Button>
          </div>
        </div>
      </form>
    </main>
  );
}
