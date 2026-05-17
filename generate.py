base = 'frontend/src/app/projects'

projects = [
    ('semantic-search', 'Semantic Search Platform', 'Semantic Search', 'Vector search platform with Qdrant, Sentence Transformers, and semantic ranking.'),
    ('webhook-inspector', 'Webhook Inspector', 'Webhook', 'Real-time webhook event feed with HMAC verification and replay engine.'),
    ('task-automation', 'Task Automation API', 'Task Automation', 'Background job processing API with async task queue and webhook triggers.'),
    ('url-shortener', 'URL Shortener', 'URL Shortener', 'Custom slug URL shortener with click analytics and Redis caching.'),
    ('portfolio', 'fuadhaque.com', 'fuadhaque', 'Full-Stack AI Engineer portfolio — FastAPI, Next.js, TypeScript, deployed on Vercel.'),
]

for slug, display, match, desc in projects:
    layout = f'''import type {{ Metadata }} from "next"

export const metadata: Metadata = {{
  title: "{display}",
  openGraph: {{
    title: "{display} — Fuad Haque",
    description: "{desc}",
    url: "https://fuadhaque.com/projects/{slug}",
    images: [{{ url: "https://fuadhaque.com/og/{slug}.png", width: 1200, height: 630, alt: "{display}" }}],
  }},
}}

export default function Layout({{ children }}: {{ children: React.ReactNode }}) {{
  return <>{{children}}</>
}}
'''
    page = f'''import {{ ProjectDetail }} from "@/components/projects/ProjectDetail"

export default function Page() {{
  return <ProjectDetail matchTitle="{match}" />
}}
'''
    open(f'{base}/{slug}/layout.tsx', 'w').write(layout)
    open(f'{base}/{slug}/page.tsx', 'w').write(page)
    print(f'✓ {slug}')

print('All done.')