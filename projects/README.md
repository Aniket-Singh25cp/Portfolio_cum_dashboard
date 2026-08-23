# Adding projects

You only need to touch **one file**: `js/projects-data.js`.

## 1. Add an image (optional but recommended)
Drop a screenshot or thumbnail into `projects/images/`, e.g.:

```
projects/images/chess-ai.png
```

Landscape images (16:10) look best. If you skip this, the card shows a placeholder pattern instead of a broken image.

## 2. Add the project entry
Open `js/projects-data.js` and add an object to the `PROJECTS` array:

```js
{
  id: "chess-ai",
  title: "Chess Engine in C++",
  description: "A minimax chess engine with alpha-beta pruning.",
  details: "Longer write-up goes here. Explain the problem, your approach, " +
    "and anything you learned.\n\nUse a blank line between paragraphs.",
  tags: ["C++", "Algorithms"],
  image: "projects/images/chess-ai.png",
  github: "https://github.com/Aniket-Singh25cp/chess-ai",
  live: ""
}
```

- `id` becomes the URL: this example is reachable at `/projects/chess-ai`.
- Leave `github` or `live` as `""` to hide that button on the detail page.
- The project automatically appears on the homepage grid — no other file needs editing.

## 3. Deploy
Commit and push to GitHub. If your repo is connected to Vercel, it redeploys automatically.
