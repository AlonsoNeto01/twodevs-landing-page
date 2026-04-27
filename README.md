# < 2 > TwoDevs Solutions — Landing Page

Bem-vindo ao repositório oficial da landing page corporativa da **TwoDevs Solutions**. Esta página foi desenvolvida com foco em alta performance, design moderno (cyber-corporate dark mode) e responsividade para todas as telas, visando atrair e engajar clientes na área de Engenharia de Software, Sistemas SaaS e Cibersegurança.

---

## ✨ Tecnologias Utilizadas

A página foi construída sem a necessidade de frameworks pesados, garantindo carregamento ultrarrápido e manutenção simplificada:

*   **HTML5 Semântico:** Estruturação clara, acessível e otimizada para SEO.
*   **CSS3 Vanilla:** Utilização massiva de CSS Variables para o Design System, Flexbox, CSS Grid, Glassmorphism e Animações customizadas.
*   **JavaScript Vanilla:** Scripts leves e diretos para interatividade, Intersection Observers e manipulação de DOM.

---

## 🎨 Funcionalidades e Design

*   **Dark Mode Premium:** Tema escuro dominante (`#0a0a0f`) focado em reduzir fadiga visual, transmitindo modernidade e seriedade.
*   **Accent Color (Verde Neon):** Destaque estratégico usando o verde `#4ADE80` para guiar a atenção do usuário aos *Call-to-Actions* (CTAs).
*   **Background Animado:** Efeito imersivo criado puramente com CSS e JS (Grade pulsante, bolhas flutuantes borradas e partículas dinâmicas em `fixed position`).
*   **Efeito Glassmorphism:** Cards e fundos com desfoque (*backdrop-filter*) e bordas translúcidas.
*   **Totalmente Responsivo:** Menu *hamburger* interativo para mobile e layout fluído que se ajusta a qualquer dispositivo.
*   **Integração com WhatsApp:** Botão com API nativa do WhatsApp Web/Mobile para comunicação direta.

---

## 📂 Estrutura de Arquivos

Para facilitar a manutenção, os estilos do projeto foram modularizados:

```text
📦 TwoDevs_Solutions
├── 📂 assets/              # Logos, ícones e ilustrações da landing page
├── 📂 css/                 # Estilos modularizados
│   ├── animations.css      # Animações de Scroll Reveal (surgimento ao rolar)
│   ├── base.css            # Variáveis globais, reset, cores base e botões
│   ├── contact.css         # Grid e formulário da seção de contato
│   ├── footer.css          # Estilo do rodapé
│   ├── header.css          # Barra de navegação e menu mobile
│   ├── hero.css            # Seção principal inicial e background global
│   ├── portfolio.css       # Estilo das cases de sucesso do portfólio
│   ├── responsive.css      # Media Queries para adaptação mobile/tablet
│   └── services.css        # Cards flutuantes da seção de serviços
├── index.html              # Estrutura e marcação da página (Single Page)
├── script.js               # Lógica de interface (Menu, Particles, Scroll)
└── README.md               # Este arquivo de documentação
```

---

## 🚀 Como Executar e Testar Localmente

Por ser um projeto em HTML estático puro, rodar o site localmente é extremamente simples:

1.  Clone este repositório:
    ```bash
    git clone https://github.com/AlonsoNeto01/twodevs-landing-page.git
    ```
2.  Abra o diretório no seu editor de código preferido (como VSCode).
3.  Utilize uma extensão como o **Live Server** no VSCode ou qualquer servidor local para abrir o `index.html`.
    ```bash
    # Exemplo usando Node/npx:
    npx serve .
    ```
4.  Pronto! O site já estará rodando e reagindo a qualquer alteração feita no código em tempo real.

---

## 🔧 Personalizações Frequentes

*   **Mudar as Cores:** Para alterar as cores base ou o tom do neon, basta abrir o `css/base.css` e editar a variável `--accent` no bloco `:root`.
*   **Número de Telefone:** Para atualizar o número de direcionamento do WhatsApp, edite o `href` do botão `.whatsapp-btn` na tag correspondente no `index.html`.
*   **Contato / E-mail Backend:** Atualmente o formulário emula o envio no frontend através do arquivo `script.js`. Para capturar dados reais, modifique o listener do `#contactForm` ou adicione uma propriedade `action` conectada à sua API de backend.

---

© 2026 TwoDevs Solutions. Todos os direitos reservados. Oriximiná — PA.
