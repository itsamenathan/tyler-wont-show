# Tyler Won't Show

## Overview
This Cloudflare Worker generates funny headlines based on the inside joke about Tyler never showing up to planned events. The worker uses AI to create these headlines.

## Features
- **AI-Powered Headlines**: Generates humorous headlines using AI.
- **Discord Preview**: Includes Open Graph meta tags for Discord link previews.
- **404 Handling**: Responds only to root URL requests and returns a 404 for other paths.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tyler-wont-show.git
   cd tyler-wont-show
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the worker:
   - Update `wrangler.jsonc` with your Cloudflare account details.

## Development
To start the development server:
```bash
npm run dev
```

## Deployment
Deploy the worker to Cloudflare:
```bash
npm run deploy
```


## File Structure
- `src/index.ts`: Main worker code.
- `public/`: Static assets like favicon and images.
- `wrangler.jsonc`: Cloudflare Worker configuration.

## License
This project is licensed under the MIT License.