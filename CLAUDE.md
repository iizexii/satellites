# CLAUDE.md — SEO Landing Page Generator

> Инструкция для Claude Cowork. Положить в корень проекта.

## ⚠️ CRITICAL: File Protection

**НИКОГДА не удаляй и не перезаписывай существующие файлы без явного разрешения!**

- Перед записью проверь, существует ли файл/папка
- Если существует — **СПРОСИ** перед перезаписью
- Готовые проекты в папке проекта — НЕ ТРОГАТЬ
- При обновлении — создавай бэкап или новую версию

### Папка `_templates` — READ ONLY

```
_templates/
├── logos/          # Логотипы брендов (leon, twin, slott)
├── .htaccess       # Эталонный htaccess
├── robots.txt      # Эталонный robots
├── sitemap.xml     # Эталонный sitemap
└── og-placeholder.svg
```

**Правила:**
- **НЕ РЕДАКТИРОВАТЬ** файлы в `_templates`
- **НЕ УДАЛЯТЬ** ничего из `_templates`
- Использовать как **референс/пример** при генерации
- Копировать нужные файлы в проект и адаптировать под задачу

## ⚠️ CRITICAL: Token Optimization

- Do not add comments unless critical
- Do not explain decisions until user asks
- Do not output unused code

## ⚠️ CRITICAL: Think Before Code

**ПЕРЕД генерацией — ОБЯЗАТЕЛЬНО продумай и проверь:**

1. **Analyze** — прочитай ТЗ, docx, пойми структуру
2. **Plan** — составь план: какие файлы, какие маркеры, какие секции
3. **Check Criticals** — сверься со ВСЕМИ правилами ниже:
   - URL structure (folders, not files)
   - Snippets `[domain]`, `[date]` остаются
   - Markers `[[...]]` заменяются контентом
   - Mobile-first CSS
   - BEM naming
   - No inline JS (кроме year)
   - External links → `/click/`
4. **Generate** — только после проверки пиши код
5. **Validate** — прогони QA checklist

**Результат должен быть 100% рабочий с первого раза.**

## ⚠️ CRITICAL: No Previews

**НЕ ОТПРАВЛЯЙ пользователю:**
- Скриншоты
- Превью страниц
- Визуальные артефакты
- Промежуточные версии

**Только:**
- Готовые файлы
- Краткий отчёт что сделано
- Вопросы если что-то неясно

## Purpose

Generate static SEO-optimized landing pages from a spec (ТЗ) and text markers JSON. Maintain strict compliance with URL structure, markup standards, and performance requirements.

## When to Use

- User provides a spec with project name, domain, pages structure
- User provides JSON with text markers like `[[H1]]`, `[[META_TITLE]]`
- User asks to create, edit, or fix an SEO landing site
- User mentions "сайт", "лендинг", "SEO страница", or references this workflow

## Operation Modes

### 1. Generate Mode (создание с нуля)
Триггеры: «создай», «сгенерируй», «сделай сайт»

→ Полный workflow: парсинг → дизайн → генерация → QA

### 2. Edit Mode (исправление существующего)
Триггеры: «исправь», «поправь», «не работает», «баг», «что не так»

→ Workflow:
1. **Прочитай** существующие файлы
2. **Найди** проблему (сверься с criticals)
3. **Исправь** точечно — НЕ переписывай всё
4. **Проверь** что не сломал остальное

**Правила Edit Mode:**
- Минимальные изменения — только то, что сломано
- Сохраняй стиль кода автора
- Не рефактори без запроса
- Если непонятно что исправить — **СПРОСИ**

### 3. Review Mode (аудит)
Триггеры: «проверь», «что не так», «аудит», «найди ошибки»

→ Workflow:
1. Прочитай все файлы
2. Сверь с QA checklist и criticals
3. Выдай **список проблем** с указанием файла и строки
4. **НЕ ИСПРАВЛЯЙ** пока не попросят

## Related Skills

Локальные скиллы в `~/.claude/skills/` — используй по необходимости:

| Skill | Когда использовать |
|-------|-------------------|
| `frontend-design` | Красивые HTML/CSS шаблоны, UI компоненты |
| `web-design-guidelines` | Принципы дизайна, типографика, цвета |
| `theme-factory` | Генерация тем/шаблонов |
| `web-artifacts-builder` | Сборка веб-артефактов |
| `copywriting` | Тексты, если нужна генерация контента |
| `brand-guidelines` | Брендинг, фирменный стиль |

**Workflow:** Design skill → генерирует красивый шаблон → эта инструкция обеспечивает SEO-compliance.

## Input Format

### Spec (ТЗ)

```
project: folder-name
domain: example.com (or [domain] placeholder)
pages: /, /about/, /contacts/
meta_robots: index,follow
templates_count: 1
design: [reference URL or description]
```

### Content (docx file)

Тексты приходят как `.docx` файл. Структура документа:

```
title: Meta Title страницы
description: Meta Description страницы

# H1 заголовок

Intro текст...

## H2 подзаголовок

Контент секции...

- список
- пунктов

| Таблица | Данные |
|---------|--------|
| Ячейка  | Ячейка |

## Вопрос --- Ответ

FAQ секция...
```

**Парсинг docx:**

```bash
pandoc input.docx -o content.md
```

**Маппинг контента → маркеры:**

| Элемент в docx | Маркер |
|----------------|--------|
| `title:` (первая строка) | `[[META_TITLE]]` |
| `description:` (вторая строка) | `[[META_DESC]]` |
| `# Заголовок` (H1) | `[[H1]]` |
| Первый абзац после H1 | `[[INTRO]]` |
| `## Секция` | `[[SECTION_TITLE_N]]` |
| Контент секции | `[[SECTION_CONTENT_N]]` |
| FAQ блок | `[[FAQ]]` |

### Text Markers (JSON) — optional

Если передаётся отдельно:

```json
{
  "[[H1]]": "Заголовок страницы",
  "[[INTRO]]": "Вводный текст",
  "[[META_TITLE]]": "Title для страницы",
  "[[META_DESC]]": "Description для страницы"
}
```

### Snippets (System Placeholders)

These placeholders stay in templates and are replaced during deployment:

| Snippet | Description | Example |
|---------|-------------|---------|
| `[domain]` | Domain name without protocol | `example.com` |
| `[date]` | ISO datetime | `2025-01-15T12:00:00+01:00` |

**DO NOT replace these** — leave as-is in generated files:

```html
<link rel="canonical" href="https://[domain]/">
<lastmod>[date]</lastmod>
```

## Project Structure

```
project-name/
├── index.html
├── about/
│   └── index.html
├── contacts/
│   └── index.html
├── click/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
├── robots.txt
├── sitemap.xml
└── .htaccess
```

## Critical Rules

### URL Structure

| Page | Path | File |
|------|------|------|
| Home | `/` | `index.html` |
| About | `/about/` | `about/index.html` |
| Contacts | `/contacts/` | `contacts/index.html` |

**FORBIDDEN:** `about.html`, `contacts.html` in root

### HTML Requirements

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index, follow">
  <title>[[META_TITLE]]</title>
  <meta name="description" content="[[META_DESC]]">
  <link rel="canonical" href="https://[domain]/">
  
  <!-- OG Tags - STATIC, not JS-generated -->
  <meta property="og:title" content="[[META_TITLE]]">
  <meta property="og:description" content="[[META_DESC]]">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://[domain]/">
  <meta property="og:image" content="https://[domain]/assets/img/og.svg">
  <meta property="og:locale" content="ru_RU">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[[META_TITLE]]">
  <meta name="twitter:description" content="[[META_DESC]]">
  
  <!-- Schema - STATIC in head -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "[[META_TITLE]]",
    "description": "[[META_DESC]]",
    "url": "https://[domain]/"
  }
  </script>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Styles -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <!-- Content with [[MARKERS]] -->
  
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```

### CSS Rules

1. **Mobile-first only:**
```css
/* Base styles for mobile */
.block { }

/* Desktop overrides */
@media (min-width: 768px) { }
```

2. **BEM methodology:**
```css
.header { }
.header__logo { }
.header__nav { }
.header--fixed { }
```

3. **CSS variables:**
```css
:root {
  --color-primary: #000;
  --color-secondary: #fff;
  --font-main: 'Inter', sans-serif;
}
```

4. **Font display:**
```css
font-display: swap;
```

**FORBIDDEN:** CSS frameworks, global tag styling (except reset)

### JS Rules

1. Single file: `assets/js/main.js`
2. Connected with `defer`
3. No external libraries
4. No inline JS (except year script)

**Required year script (inline allowed):**
```html
<span id="year"></span>
<script>document.getElementById('year').textContent=new Date().getFullYear()</script>
```

### Required Components

#### Burger Menu
- Toggle open/close on click
- Close on outside click
- Close on ESC key

#### Accordion (FAQ)
```css
/* USE: max-height animation */
.accordion__content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion__item--active .accordion__content {
  max-height: 500px;
}
```

**FORBIDDEN:** `display: none` for toggleable elements

### External Links

All external links must:
1. Point to `/click/` redirect page
2. Have `rel="nofollow"`

```html
<a href="/click/" rel="nofollow">External Site</a>
```

### Images

```html
<img src="assets/img/photo.jpg" alt="Description" loading="lazy" width="400" height="300">
```

## Generated Files

### robots.txt

```
User-agent: *
Allow: /
Disallow: /click/

Sitemap: https://[domain]/sitemap.xml

Host: [domain]
```

### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[domain]/</loc>
    <lastmod>[date]</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[domain]/about/</loc>
    <lastmod>[date]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://[domain]/contacts/</loc>
    <lastmod>[date]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Note:** `[domain]` and `[date]` are snippets — leave them as-is.

### .htaccess

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

## QA Checklist

Before delivering, verify:

- [ ] No `[[MARKERS]]` remain (all replaced with content)
- [ ] `[domain]` and `[date]` snippets preserved (NOT replaced)
- [ ] All external links → `/click/` with `rel="nofollow"`
- [ ] `<meta name="viewport">` present
- [ ] `<meta name="robots" content="index, follow">` present
- [ ] `<html lang="ru">` present
- [ ] `<link rel="canonical">` present in main AND in AMP
- [ ] `<link rel="amphtml">` present in main → points to AMP
- [ ] AMP canonical → points back to main (not to itself)
- [ ] Year script present and working
- [ ] No `display: none` for toggles (use `max-height`)
- [ ] `@media (min-width: ...)` used (mobile-first)
- [ ] No broken internal links
- [ ] OG tags static (not JS-generated)
- [ ] Schema.org markup in `<head>` (same data in main and AMP)

## Forbidden Actions

1. **DO NOT** delete or overwrite existing files without asking
2. **DO NOT** remove existing project folders
3. **DO NOT** change provided text content
4. **DO NOT** add content not in markers
5. **DO NOT** use jQuery, Bootstrap, or any library
6. **DO NOT** create SPA logic
7. **DO NOT** generate meta tags via JavaScript
8. **DO NOT** use `about.html` (use `about/index.html`)
9. **DO NOT** create new markers not in JSON

## Output

Generate all files to project directory.

## GitHub Deployment

### Аккаунт
- GitHub username: `iizexii`
- Публичный рабочий репо: `github.com/iizexii/satellites`
- Приватный архив: `github.com/iizexii/satellites_ready`

### Правила работы с репозиториями

1. **Во время работы** — пушить в `satellites`, сохраняя структуру папок как на ПК (`leon/ru/2/`, `leon/ru/2-amp/` и т.д.)
2. **Когда проект готов** — удалить из публичного `satellites` на GitHub, перенести в `satellites_ready`
3. **На ПК файлы не удалять никогда** — ПК является источником правды

### Структура папок в репозитории

```
satellites/
└── leon/
    └── ru/
        ├── 2/        ← основной шаблон
        └── 2-amp/    ← AMP версия
```

### Push workflow

```bash
# Из корня satellites (сохраняет структуру папок)
git add leon/ru/2/
git commit -m "feat: leon/ru/2 — описание"
git push origin main
```

**Правила пушей:**
- Всегда спрашивай commit message если не указан
- Перед force push — **ОБЯЗАТЕЛЬНО СПРОСИ**
- Проверь `.gitignore` (node_modules, .DS_Store, etc.)
- Git init делать из корня `satellites/`, не из папки шаблона

**Стандартный .gitignore:**
```
.DS_Store
Thumbs.db
*.log
node_modules/
.env
```

## AMP Structure

Для каждого шаблона AMP версия живёт в отдельной папке рядом:

```
leon/ru/
├── 2/        ← основной сайт (полный функционал)
└── 2-amp/    ← AMP (только контент, без JS-карусели и анимаций)
```

**AMP правила:**
- `<html ⚡ lang="ru">` — обязательно
- `<meta charset>` — первый тег в `<head>`
- Весь CSS — inline в `<style amp-custom>` (лимит 75KB)
- Изображения — `<amp-img>` с явными width/height
- FAQ — `<amp-accordion>` (подключать через script в head)
- Нет кастомного JS, нет внешних стилей
- `<link rel="canonical">` → указывает на основную страницу (`[domain]/`)
- `[domain]` и `[date]` — сниппеты, оставлять как есть

## Core Concept — Как устроено производство

Это **фабрика шаблонов**. Каждое новое ТЗ порождает новую пронумерованную папку. Существующие папки — готовые продукты, к ним не прикасаться.

### Структура проекта

```
satelli