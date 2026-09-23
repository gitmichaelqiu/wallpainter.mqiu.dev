# WallPainter website

The landing page for [WallPainter](https://github.com/gitmichaelqiu/WallPainter), published at [wallpainter.mqiu.dev](https://wallpainter.mqiu.dev).

This is a static site. `index.html` is the entry point; the shared design system and interaction scripts live in `styles/` and `scripts/`. The page has English and Simplified Chinese content and uses the WallPainter settings screenshots in `resources/images/`.

The `CNAME` file configures the custom domain for GitHub Pages. Preview locally with any static file server from the repository root, for example:

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080>.
