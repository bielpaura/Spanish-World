# Spanish World em Next.js

Esta pasta agora tem uma versão Next.js do site usando App Router.

## Arquivos principais

- `app/layout.jsx`: layout raiz, metadados e fontes.
- `app/page.jsx`: página principal renderizada pelo Next.
- `app/globals.css`: estilos globais migrados de `style.css`.
- `public/spanish-world.js`: lógica client-side migrada de `script.js`.
- `public/assets/`: assets servidos pelo Next.

## Rodar localmente

```bash
npm install
npm run dev
```

Depois abra:

```text
http://localhost:3000
```

## Observação

A migração preserva as funções atuais do site para manter tudo funcionando. A próxima etapa natural é dividir `public/spanish-world.js` em componentes React menores.
