import './globals.css';

export const metadata = {
  title: 'Spanish World — Aprenda Espanhol',
  description: 'Plataforma interativa com aulas profissionais de espanhol.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          as="image"
          href="https://commons.wikimedia.org/wiki/Special:FilePath/Alhambra%20from%20Generalife%20%282017%29.jpg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
