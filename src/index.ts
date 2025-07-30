async function getHeadline(env: Env): Promise<string> {
  let headline = "Tyler's No-Show Epidemic Spreads";

  if (env.ENV === "prod") {
    const aiResponse = await env.AI.run(env.AI_MODEL, {
      prompt: `My friends and I have an inside joke about how Tyler will never show to a planned event.
       Tyler never releases the files he says he will, no matter how many times we ask.
			 I want you to write a funny news headline about this.
			 Provide only one headline, in plain text format without additional text.
			 `,
    });
    let rawHeadline = aiResponse.response;
    // Remove leading/trailing quotes if present and ensure it's a string
    headline = typeof rawHeadline === 'string' ? rawHeadline.replace(/^"|"$/g, '') : String(rawHeadline);
  }

  return headline;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {

    const url = new URL(request.url);
    if (url.pathname !== '/') {
      return new Response('Not Found', { status: 404 });
    }

    const headline = await getHeadline(env);
    const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tyler Won't Show</title>
  <!-- Discord (Open Graph) preview tags -->
  <meta property="og:title" content="Tyler Won't Show" />
  <meta property="og:description" content="${headline}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tyler.wont.show" />
  <meta property="og:image" content="https://tyler.wont.show/wont-show.png" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: #101014;
      background-image: linear-gradient(120deg, #101014 0%, #23263a 100%);
      background-color: #101014;
      color: #e0e7ef;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .glass {
      background: rgba(39, 39, 42, 0.85);
      border-radius: 24px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      padding: 3rem 2.5rem 2.5rem 2.5rem;
      max-width: 520px;
      width: 95vw;
      text-align: center;
      animation: fadeIn 1.2s cubic-bezier(.39,.575,.56,1) both;
    }
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .logo {
      width: 64px;
      height: 64px;
      margin-bottom: 1.2rem;
      border-radius: 50%;
      box-shadow: 0 2px 12px #38bdf8aa;
      background: #fff;
      object-fit: cover;
    }
    h1 {
      font-size: 2.4rem;
      margin-bottom: 0.7rem;
      color: #fbbf24;
      font-weight: 700;
      letter-spacing: -1px;
    }
    .headline {
      font-size: 1.6rem;
      font-weight: 700;
      margin: 1.7rem 0 1.2rem 0;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      border-radius: 12px;
      padding: 1.2rem 1rem;
      box-shadow: 0 2px 8px #38bdf822;
      transition: background 0.3s;
    }
    .headline:hover {
      background: rgba(56, 189, 248, 0.18);
    }
    .footer {
      margin-top: 2.2rem;
      font-size: 1.05rem;
      color: #a1a1aa;
      opacity: 0.85;
    }
    @media (max-width: 600px) {
      .glass { padding: 2rem 0.7rem; }
      h1 { font-size: 1.5rem; }
      .headline { font-size: 1.1rem; padding: 0.8rem 0.5rem; }
    }
  </style>
</head>
<body>
  <div class="glass">
    <h1>Tyler Won't Show</h1>
    <div class="headline">${headline}</div>
  </div>
</body>
</html>`;

    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
    });
  },
} satisfies ExportedHandler<Env>;
