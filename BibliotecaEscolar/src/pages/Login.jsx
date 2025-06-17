import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Cria usuário no Firestore se não existir
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role: "leitor",
        });
      }
      navigate("/"); // Redireciona para Home imediatamente após login
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  useEffect(() => {
    // Se já estiver logado, redireciona
    if (auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <button onClick={handleGoogleLogin}>Entrar com Google</button>
    </div>
  );
}