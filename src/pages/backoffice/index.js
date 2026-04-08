import { useEffect, useState } from 'react';
import { supabase } from '../../lib/db';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [casal, setCasal] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    // 1. Verifica se tem alguem logado
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Nao ta logado? Manda pro login!
      router.push('/login');
      return;
    }

    // 2. Se ta logado, busca os dados do casal dele
    const { data, error } = await supabase
      .from('casais')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error("Erro ao buscar dados do dashboard:", error.message);
    } else {
      setCasal(data);
    }
    setLoading(false);
  }

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Protegendo sua sessão...</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Painel de Controle Smart 💍</h1>
          <p style={{ color: '#666' }}>Bem-vindos, {casal?.nome_noivos || 'Casal'}</p>
        </div>
        <button onClick={logout} style={{ padding: '10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>Sair com segurança</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {/* Card 1: Status */}
        <div style={styles.card}>
          <h3>Data do Casório</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {new Date(casal?.data_casamento).toLocaleDateString('pt-BR')}
          </p>
          <span style={{ color: 'green' }}>● Sistema Ativo</span>
        </div>

        {/* Card 2: Link Publico */}
        <div style={styles.card}>
          <h3>Seu Link Público</h3>
          <p style={{ fontSize: '0.9rem', color: '#0070f3' }}>casamentosmart.com/{casal?.slug}</p>
          <button style={styles.miniBtn}>Copiar Link</button>
        </div>

        {/* Card 3: Segurança */}
        <div style={{ ...styles.card, backgroundColor: '#e8f5e9' }}>
          <h3>Segurança 🛡️</h3>
          <p style={{ fontSize: '0.8rem' }}>Sua conta está protegida por criptografia. O 2FA pode ser ativado nas configurações.</p>
        </div>
      </div>

      {/* Espaço para ADS (Monetização Vidal Design) */}
      <div style={{ marginTop: '50px', padding: '20px', border: '2px dashed #ccc', textAlign: 'center', borderRadius: '10px' }}>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>ESPAÇO PARA PARCEIRO OURO (EX: Buffet Mário e Aline)</p>
      </div>
    </div>
  );
}

const styles = {
  card: { padding: '20px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  miniBtn: { marginTop: '10px', padding: '5px 10px', fontSize: '0.7rem', cursor: 'pointer' }
};
