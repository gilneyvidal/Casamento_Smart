import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/db';

export default function PaginaDoCasal() {
  const router = useRouter();
  const { slug } = router.query; // Pega o nome do link, ex: 'casamento-mario-e-aline'
  
  const [casal, setCasal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Só busca no banco quando o slug aparecer na URL
    if (slug) {
      buscarDadosDoCasal();
    }
  }, [slug]);

  async function buscarDadosDoCasal() {
    setLoading(true);
    
    // Pergunta pro banco: "Tem algum casal com esse slug?"
    const { data, error } = await supabase
      .from('casais')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error("Erro ao buscar casal:", error.message);
    } else {
      setCasal(data);
    }
    setLoading(false);
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando os sonhos do casal...</p>;

  if (!casal) return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Ops! Casamento não encontrado. 💔</h1>
      <p>Verifique se o link está correto.</p>
    </div>
  );

  return (
    <div style={{ 
      fontFamily: 'serif', 
      color: '#444', 
      textAlign: 'center', 
      padding: '50px',
      backgroundColor: '#fdfbfb',
      minHeight: '100vh'
    }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#d4a373' }}>{casal.nome_noivos}</h1>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>Estão prestes a dizer o sim!</p>
      </header>

      <main style={{ border: '2px solid #e9edc9', padding: '30px', borderRadius: '15px', display: 'inline-block' }}>
        <h2>Salve a Data</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {new Date(casal.data_casamento).toLocaleDateString('pt-BR')}
        </p>
        
        <div style={{ marginTop: '30px', color: '#999' }}>
           <p>Em breve: Nossa história, fotos e lista de presentes.</p>
        </div>
      </main>

      <footer style={{ marginTop: '50px', fontSize: '0.8rem' }}>
        <p>Site orgulhosamente criado com <strong>Casamento Smart</strong></p>
        <p>Vidal Design Solutions</p>
      </footer>
    </div>
  );
}
