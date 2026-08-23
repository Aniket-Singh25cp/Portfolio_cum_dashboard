# Aniket Kumar Singh — Portfolio

A static, dependency-free portfolio (plain HTML/CSS/JS). No build step required.

## Run locally
Any static server works, for example:
```bash
npx serve .
```
Then open the printed localhost URL.

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. Framework preset: **Other**. Build command: none. Output directory: `.` (root).
4. Deploy. That's it — no environment variables or build steps needed.

Every future push to your main branch redeploys automatically.

## Adding projects
See `projects/README.md` — you only ever need to edit `js/projects-data.js`.

## Project structure
```
index.html              homepage (hero, about, skills, projects, contact)
project.html             individual project detail page (/projects/:id)
css/style.css             all styles
js/projects-data.js       ← edit this to add/update projects
js/projects-render.js     renders project cards + detail page from the data
js/main.js                nav, scroll reveal, terminal animation, etc.
projects/images/          put project thumbnails here
vercel.json                routes /projects/:id to project.html
```
