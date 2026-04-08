import React, { useState } from 'react';
import { supabase } from '../lib/db';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Acesso negado: E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      // Login com sucesso! Vai para o Painel Privado
      router.push('/backoffice');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Acesso Seguro 🔐</h1>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Painel de Gestão Vidal Design Solutions</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="email" 
          placeholder="Seu e-mail cadastrado" 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        <input 
          type="password" 
          placeholder="Sua senha forte" 
          onChange={e => setSenha(e.target.value)} 
          required 
          style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        
        <button type="submit" disabled={loading} style={{ 
          padding: '15px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontWeight: 'bold' 
        }}>
          {loading ? 'Verificando...' : 'Entrar no Painel'}
        </button>
      </form>

      {erro && <p style={{ color: 'red', marginTop: '15px', fontSize: '0.9rem' }}>{erro}</p>}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
        <p style={{ fontSize: '0.8rem', color: '#555' }}>
          <strong>Dica de Segurança:</strong> Nunca compartilhe sua senha. O sistema utiliza criptografia de ponta a ponta para proteger os dados de <strong>Mário e Aline</strong>.
        </p>
      </div>
    </div>
  );
}
