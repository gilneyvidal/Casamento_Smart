import { createClient } from '@supabase/supabase-js';

// Aqui o codigo apenas "chama" os nomes que estao no arquivo .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verifica se as chaves existem antes de conectar
if (!supabaseUrl || !supabaseKey) {
  console.error("ERRO: Chaves do Supabase nao encontradas no arquivo .env");
}

// Cria o cliente de conexao
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Conexao com o banco de dados configurada!");
