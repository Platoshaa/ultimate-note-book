import Background from "../assets/paintings/Paris1.jpg";
import AuthBtn from "../components/AuthBtn";
const Login = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,

        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          backdropFilter: "brightness(60%)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <h2>Пожалуйста войдите в аккаунг Google</h2>
        <p>Мы работаем только так</p>
        <AuthBtn></AuthBtn>
      </div>
    </div>
  );
};

export default Login;
