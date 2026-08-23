import { mkdirSync, writeFileSync } from 'node:fs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined');
}

if (!supabasePublishableKey) {
  throw new Error('SUPABASE_PUBLISHABLE_KEY is not defined');
}

mkdirSync('src/environments', {
  recursive: true,
});

const content = `export const environment = {
  production: true,
  supabaseUrl: ${JSON.stringify(supabaseUrl)},
  supabasePublishableKey: ${JSON.stringify(supabasePublishableKey)},
};
`;

writeFileSync(
  'src/environments/environment.ts',
  content,
);

console.log('Angular environment generated successfully.');