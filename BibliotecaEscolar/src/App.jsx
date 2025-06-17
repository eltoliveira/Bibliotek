import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-secondary font-sans flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-soft p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary mb-4">Biblioteca Escolar</h1>
        <p className="text-dark mb-6">
          Bem-vindo ao sistema de biblioteca! Pesquise, cadastre e gerencie livros de forma simples e moderna.
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded-xl shadow-soft hover:bg-accent transition">
          Começar
        </button>
      </div>
    </div>
  );
}
