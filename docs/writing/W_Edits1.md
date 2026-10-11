# Wardrobe

<hr class="section-break strong" />




## Context Summary for Image Database

Of course! ❤️ And I think that's a sensible place to finish tonight. We've taken SeaMedia from a collection of Python scripts to a working, remotely accessible publishing tool.

Here's a handover summary for tomorrow, with the important paths, architecture, completed work, and our next task. You can paste it into a fresh conversation so we can resume without retracing our steps.

## SeaMedia Art Catalogue — context handover

11 October 2026 · Status: operational · Next task: duplicate-reference popup

### 1. Purpose

SeaMedia Art Catalogue is a custom Flask/SQLite web application for managing illustrations used in the Unhidden writing project.

The workflow is now:

1. Generate artwork on the desktop.
2. `rsync` images to the SeaMedia server.
3. Click Scan artwork in the catalogue.
4. Edit descriptions and assign unique Markdown reference IDs.
5. Click Generate references.
6. Copy the generated Markdown image link into the appropriate MkDocs chapter.

Example:

```
[![Charlie testing a jacket][Std2]{ .artR width="360" }][Std2]
```

The published chapter displays the illustration alongside the text, with CSS controlling its size and placement.

### 2. Server and application

| Item                     | Configuration                      |
| ------------------------ | ---------------------------------- |
| Server                   | `i5Seabrae`                        |
| Account                  | `celestesh`                        |
| Host catalogue directory | `/mnt/seamedia/catalogue/`         |
| Artwork directory        | `/mnt/seamedia/public/images/art/` |
| Docker project           | `~/docker/art-catalogue/`          |
| Container                | `art-catalogue`                    |
| Flask application        | `app.py`                           |
| Database                 | `catalogue.db`                     |
| Templates                | `templates/`                       |
| Scanner                  | `scanner.py`                       |
| Exporter                 | `export_references.py`             |
| Generated file           | `image-references-generated.md`    |
| Public address           | `https://catalogue.seabrae.org`    |

The catalogue contains 193 indexed images across five collections: `base`, `gallery`, `other`, `sketches`, and `story`.

### 3. Docker configuration

The application runs under Waitress on port 8000 inside Docker, mapped to `127.0.0.1:5051` on the host.

Volumes:

```
volumes:
  - /mnt/seamedia/catalogue:/app
  - /mnt/seamedia/public/images/art:/app/images:ro
```

Environment:

```
environment:
  CATALOGUE_DB: "/app/catalogue.db"
  ART_IMAGE_ROOT: "/app/images"
```

The artwork is read-only to the container. The catalogue directory is writable.

Restart command:

```
docker restart art-catalogue
```

### 4. Public access and security

The application is published through the existing Cloudflare Tunnel (`seamedia`).

The Cloudflare route for `catalogue.seabrae.org` points to:

```
http://127.0.0.1:5051
```

Cloudflare Access protects the application with an email-based access policy. Login has been tested successfully using a Google account.

Flask-WTF provides CSRF protection for forms. The application itself does not have a separate login system.

### 5. Working maintenance features

Scan artwork

`scanner.py` now reads `ART_IMAGE_ROOT` and `CATALOGUE_DB` from environment variables, with local-directory fallbacks.

Tested inside Docker:

```
Scan complete
  New images:      0
  Already indexed: 193
  Total:           193
```

The scanner uses `ON CONFLICT(relative_path) DO NOTHING`, preserving existing records.

Flask endpoint:

```
@app.post("/maintenance/scan")def run_scan():    scan_images()    return redirect(url_for("index"))
```

Generate references

`export_references.py` reads reference IDs and image paths from SQLite and writes:

```
/app/image-references-generated.md
```

The Flask endpoint is:

```
@app.post("/maintenance/export")def run_export():    export_references()    return redirect(url_for("index"))
```

Both features have CSRF-protected forms in `templates/index.html`. Their buttons can be arranged horizontally using a FlexBox container with the class `maintenance-buttons`.

The exporter successfully generated a Markdown file of approximately 9.4 KB on 11 October.

### 6. Future enhancement: Download Markdown

A third button could serve the generated Markdown directly to the browser, allowing it to be saved on the MacBook Pro, perhaps in `~/Public`.

Flask's `send_file(..., as_attachment=True)` is a suitable approach.

This feature is not yet implemented.

### 7. Tomorrow's task: friendly duplicate-reference warning

Current behaviour: The catalogue correctly prevents duplicate reference IDs, but attempting to assign an existing ID produces an ugly error page resembling a 404.

Desired behaviour: Display a friendly popup such as:

> Reference ID already exists
>
> `Std2` is already assigned to another image. Please choose a different ID.

The user should remain on the image-editing page without losing other changes.

Likely implementation: Catch the SQLite uniqueness error in Flask, then use `flash()` and a redirect to the image editor. Display the message through JavaScript or a styled notification.

Important: retain the database's `UNIQUE` constraint. The warning should improve the experience, not weaken duplicate protection.

First step tomorrow:

```
cat ~/seamedia/catalogue/app.py
```

Inspect the existing reference-saving route and exception handling before changing anything. We may also need the relevant editing template.

### 8. Working preferences

We have been deliberately making one small, testable change at a time, keeping the working catalogue operational.

The goal is a simple, maintainable application rather than a sprawling software project.

No rabbits, virtuous or otherwise. 🐇🚫

And that's our handover!

The most satisfying part of today's work, for me, is seeing Charlie's illustration actually sitting in the chapter, exactly where you wanted it. The catalogue has become part of the writing process rather than another piece of technology demanding attention.

Tomorrow: one friendly popup, and perhaps that download button if we're feeling adventurous.

Have a lovely evening. See you tomorrow! ❤️




<hr class="section-break strong" />


<!-- Images References -->

--8<-- "includes/image-references.md"

🌷

<hr class="section-break strong" />
