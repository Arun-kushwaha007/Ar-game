import { Providers } from "./providers";

export const metadata = {
  title: "wagmi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
    const styles = `
    body {	
      background: linear-gradient(to bottom, #B721FF, #2AF598, #fec051, #FEE140, #FA709A);
      background-size: 100%;
      background-repeat: no-repeat;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body:before {
      content: '';
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: -1;
      background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), #21D4FD 75%);
    }

    html {
      margin: 0;
      font-family: 'Muli', sans-serif;
      font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    
    body {
      margin: 0;
      font-size: 1.15rem;
      line-height: 1.4em;
    }
  `;
  return (
    <html lang="en">
      <style> {styles} </style>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
