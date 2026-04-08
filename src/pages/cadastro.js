import React, { useState } from 'react';
import { supabase } from '../lib/db';
import { validarSenhaForte, dicaSeguranca } from '../lib/auth';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeCasal, setNomeCasal] = useState('');
  const [slug, setSlug] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');

    // 1. Validação da Senha antes de enviar
    if (!validarSenhaForte(senha)) {
      setErro("Sua senha não atinge os requisitos de segurança exigidos.");
      return;
    }

    setLoading(true);

    // 2. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (authError) {
      setErro(authError.message);
      setLoading(false);
      return;
    }

    // 3. Vincular os dados do casal ao usuário criado
    const { error: dbError } = await supabase
      .from('casais')
      .insert([
        { 
          user_id: authData.user.id,
          nome_noivos: nomeCasal,
          slug: slug.toLowerCase().replace(/\s+/g, '-'),
          data_casamento: data
        }
      ]);

    if (dbError) {
      setErro("Usuário criado, mas erro ao salvar dados do casal: " + dbError.message);
    } else {
      alert("Cadastro realizado com sucesso! Verifique seu e-mail para confirmar.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '50px auto', display: 'flex', gap: '40px', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Lado Esquerdo: Formulário */}
      <div style={{ flex: 1 }}>
        <h1>Criar Conta Smart 🔐</h1>
        <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Nome do Casal (ex: Mário e Aline)" onChange={e => setNomeCasal(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="URL desejada (ex: mario-e-aline)" onChange={e => setSlug(e.target.value)} required style={styles.input} />
          <input type="date" onChange={e => setData(e.target.value)} required style={styles.input} />
          <hr />
          <input type="email" placeholder="Seu melhor e-mail" onChange={e => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Senha Forte" onChange={e => setSenha(e.target.value)} required style={styles.input} />
          
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Processando...' : 'Finalizar Cadastro Seguro'}
          </button>
        </form>
        {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}
      </div>

      {/* Lado Direito: Educativo (Pentest Style) */}
      <div style={styles.cardInfo}>
        <h3>{dicaSeguranca.titulo}</h3>
        <p>{dicaSeguranca.texto}</p>
        <ul style={{ fontSize: '0.9rem' }}>
          {dicaSeguranca.regras.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <div style={styles.badge2fa}>
          <strong>🛡️ {dicaSeguranca.duasEtapas}</strong>
        </div>
      </div>
    </div>
  );
}

const styles = {
  input: { padding: '12px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '15px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  cardInfo: { flex: 0.8, backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #0070f3' },
  badge2fa: { marginTop: '20px', padding: '10px', backgroundColor: '#e1f5fe', borderRadius: '5px', fontSize: '0.8rem', color: '#01579b' }
};
