import { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import useUserRole from "../hooks/useUserRole";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitulo, setEditTitulo] = useState("");
  const role = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === null || role === "leitor") return;
    const unsubscribe = onSnapshot(collection(db, "livros"), (snapshot) => {
      setLivros(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [role]);

  const handleAdd = async () => {
    if (!titulo) return;
    await addDoc(collection(db, "livros"), { titulo });
    setTitulo("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "livros", id));
  };

  const handleEdit = (id, tituloAtual) => {
    setEditId(id);
    setEditTitulo(tituloAtual);
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "livros", editId), { titulo: editTitulo });
    setEditId(null);
    setEditTitulo("");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (role === null) return <div className="flex items-center justify-center min-h-screen bg-gray-100">Carregando...</div>;
  if (role === "leitor") return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">Você não tem permissão para acessar esta página.</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white flex flex-col justify-between py-8 px-6 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-6">Livros</h2>
          <ul className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
            {livros.map(livro => (
              <li key={livro.id} className="flex items-center justify-between bg-blue-700/30 rounded-lg px-3 py-2">
                {editId === livro.id ? (
                  <>
                    <input
                      className="border px-2 py-1 rounded text-gray-900 bg-white"
                      value={editTitulo}
                      onChange={e => setEditTitulo(e.target.value)}
                    />
                    <button onClick={handleUpdate} className="ml-2 text-green-300">Salvar</button>
                    <button onClick={() => setEditId(null)} className="ml-2 text-gray-200">Cancelar</button>
                  </>
                ) : (
                  <>
                    <span className="truncate">{livro.titulo}</span>
                    <div>
                      <button onClick={() => handleEdit(livro.id, livro.titulo)} className="ml-2" title="Editar">✏️</button>
                      <button onClick={() => handleDelete(livro.id)} className="ml-2" title="Remover">🗑️</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleLogout} className="mt-8 bg-accent text-primary font-bold px-4 py-2 rounded-xl hover:bg-cyan-300 transition">Sair</button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg mt-8">
          <h2 className="text-3xl font-bold mb-8 text-primary text-center">Adicionar Livro</h2>
          <div className="flex mb-4">
            <input
              className="border rounded-l-xl px-4 py-2 flex-1 text-gray-900"
              placeholder="Título do livro"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
            <button onClick={handleAdd} className="bg-primary text-white px-6 py-2 rounded-r-xl hover:bg-blue-700 transition">Adicionar</button>
          </div>
        </div>
      </main>
    </div>
  );
}