import cl from "./Login.module.scss";
import Background from "../../assets/paintings/Paris1.jpg";
const Login = () => {
  return (
    <div className={cl.wr} style={{ backgroundImage: `url(${Background})` }}>
      <h2>Пожалуйста войдите в аккаунг Google</h2>
      <p>Мы работаем только так</p>
    </div>
  );
};

export default Login;
