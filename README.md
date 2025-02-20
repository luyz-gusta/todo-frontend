# 📝 Gerenciador de tarefas - ToDo
Este é o backend de uma plataforma web de gerenciamento de tarefas, acompanhado por uma suíte de testes que verifica o correto funcionamento da API. Os testes simulam interações com os endpoints, garantindo que todas as operações sejam executadas como esperado e assegurando a estabilidade do sistema.

## 💻 Tecnologias utilizadas

- React.js
- Vite
- Axios
- Tailwind
- Typescript

---

## 🏠 Como rodar o projeto localmente

### Requisitos mínimos:
- Node.js (versão 14 ou superior)
- Gerenciador de pacotes (pnpm, npm, ou yarn)


### Execução:

1. **Clone o repositório:**
   
   ```bash
   git clone https://github.com/luyz-gusta/todo-frontend
   ```
   
2. **Navegue até o diretório do projeto:**
   
   ```bash
   cd todo-frontend
   ```
   
3. **Instale as dependências:**
 
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

## 🔗 Funcionalidades
- Lista de tarefas.
- Criar tarefa.
- Editar tarefa.
- Excluir tarefa.
- Trocar o tema de toda a aplicação.

## 🛠️ Decisões Técnicas

* **React com Vite:**  
  Escolhi o **React** pela sua flexibilidade e capacidade de criar interfaces dinâmicas e reativas. A opção pelo **Vite** como bundler se deu pela sua performance superior, que proporciona um ciclo de desenvolvimento mais rápido e atualizações quase instantâneas.

* **TypeScript:**  
  A adoção do **TypeScript** visa garantir tipagem estática, o que melhora a previsibilidade e facilita a manutenção do código ao longo do desenvolvimento, proporcionando maior segurança e auxiliando na detecção precoce de erros.

* **Axios:**  
  O **Axios** foi escolhido para realizar as requisições HTTP devido à sua simplicidade e suporte nativo a **Promises**. Ele facilita o gerenciamento de requisições assíncronas, tratamento de erros e oferece recursos como interceptadores, otimizando a comunicação com a API backend.

* **Tailwind CSS:**  
  A utilização **Tailwind CSS** como framework de estilização devido à sua abordagem utilitária, que facilita a criação de interfaces responsivas e customizáveis sem a necessidade de escrever CSS extra. Ele permite uma maior flexibilidade na personalização do layout e acelera o desenvolvimento ao reduzir a necessidade de classes CSS complexas.

## 🚀 Possíveis melhorias futuras

* **Autenticação de usuários:**  
  Implementar um sistema de autenticação para garantir que apenas usuários autenticados possam criar, editar ou excluir tarefas, promovendo maior segurança e controle sobre os dados.

* **Melhorias na UI:**  
  Adicionar mais interatividade e feedback visual à interface, como animações de transição e indicadores de carregamento, visando uma experiência do usuário mais fluida e agradável.

* **Validação de Formulário:**  
  Aperfeiçoar a validação dos campos de entrada utilizando zod ou algo similar para assegurar que os dados submetidos sejam sempre corretos, além de fornecer feedback em tempo real ao usuário durante o preenchimento.

* **Testes Automatizados:**  
  Implementar uma suíte de testes automatizados para garantir a estabilidade da aplicação durante alterações futuras e reduzir a possibilidade de introduzir erros.


## 🌐 Deploy

O projeto está online e disponível. Você pode acessá-lo:

[Deploy-ToDo 🚩]()
