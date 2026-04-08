// Função para verificar se a senha segue todas as regras de segurança
export const validarSenhaForte = (senha) => {
  const minLength = 10;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temMinuscula = /[a-z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return (
    senha.length >= minLength &&
    temMaiuscula &&
    temMinuscula &&
    temNumero &&
    temEspecial
  );
};

// Explicação educativa para o usuário
export const dicaSeguranca = {
  titulo: "Por que uma senha forte?",
  texto: "Para proteger seus dados e de seus convidados, exigimos uma 'Senha Nível Pentest'.",
  regras: [
    "Mínimo de 10 caracteres",
    "Pelo menos uma letra MAIÚSCULA",
    "Pelo menos um número",
    "Pelo menos um caractere especial (!@#$)",
  ],
  duasEtapas: "Dica: Em breve você poderá ativar a Verificação de 2 Etapas (2FA), onde um código é enviado ao seu celular para garantir que só você entre, mesmo que alguém descubra sua senha."
};
