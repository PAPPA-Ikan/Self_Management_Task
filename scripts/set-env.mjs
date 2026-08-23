import { writeFileSync, mkdirSync } from 'node:fs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined');
}

if (!supabasePublishableKey) {
  throw new Error(
    'SUPABASE_PUBLISHABLE_KEY is not defined'
  );
}

mkdirSync('src/environment', {
  recursive: true,
});

const content = `export const environment = {
  production: true,
  supabaseUrl: ${JSON.stringify(supabaseUrl)},
  supabasePublishableKey: ${JSON.stringify(supabasePublishableKey)},
};
`;

writeFileSync(
  'src/environment/environment.production.ts',
  content,
);

console.log(
  'Production environment file generated successfully.',
);