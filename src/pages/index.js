import React, { useState } from 'react';
import { supabase } from '../lib/db'; // Importa a conexão que fizemos no passo 6

export default function Home() {
  // Estados para guardar o que os noivos digitam
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Função para salvar os noivos no banco de dados
  const criarSite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    // 1. Salva no Supabase na tabela 'casais'
    const { data: novoCasal, error } = await supabase
      .from('casais')
      .insert([
        { 
          nome_noivos: nome, 
          data_casamento: data, 
          slug: slug.toLowerCase().replace(/\s+/g, '-') // Transforma "Gilney e Larissa" em "gilney-e-larissa"
        }
      ]);

    if (error) {
      setMensagem('Erro: ' + error.message);
    } else {
      setMensagem('Parabéns! Seu site Casamento Smart foi criado com sucesso!');
      // Aqui poderíamos redirecionar para o painel, mas vamos manter simples por enquanto
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Casamento Smart 💍</h1>
      <p>Vidal Design Solutions - Comece sua jornada aqui.</p>

      <form onSubmit={criarSite} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Nome do Casal:
          <input 
            type="text" 
            placeholder="Ex: Gilney e Larissa" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </label>

        <label>
          Data do Casamento:
          <input 
            type="date" 
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </label>

        <label>
          Link do site (slug):
          <input 
            type="text" 
            placeholder="Ex: casamentosmart.com/noivos/gilney-e-larissa" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </label>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '15px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Criando...' : 'Criar meu site de casamento'}
        </button>
      </form>

      {mensagem && (
        <p style={{ marginTop: '20px', padding: '10px', backgroundColor: '#eaffea', color: '#1a7f1a', borderRadius: '5px' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}
