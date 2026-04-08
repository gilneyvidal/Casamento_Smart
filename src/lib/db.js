import { createClient } from '@supabase/supabase-js';

// Pega as chaves que voce colocou no arquivo .env
const supabaseUrl = process.env.NEXT_https://cotbgkybknxujcffsmxy.supabase.co;
const supabaseKey = process.env.NEXT_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdGJna3lia254dWpjZmZzbXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDY1MTUsImV4cCI6MjA5MTIyMjUxNX0.OJge9KLKxnDYAwZtB1QqYruQ1G9nS-btSGacXjfXuS0;

// Cria o mensageiro que vai levar e trazer dados do banco
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Conexao com o banco de dados preparada!");
