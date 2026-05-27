# FluxGym

## Discussion

[Q]  
Hi Emily. I have a question on FluxGym. I read an article on Medium by John Shi that recommends using, instead of Flux-dev, a fine-tuned model ... in this case, one called Flux-Dev2Pro. The huggingface.co link took me to the download page. There are two .json files and 3 .safetensor files. I've downloaded the lot into a separate folder under /fluxgym/models called /Flux-Dev2Pro. How does fluxgym know how to select this? 3 different safetensors?

---

[A]  
Great question—FluxGym won’t “auto-detect” a random folder with multiple checkpoints. It populates the **Base model** dropdown from its `models.yaml`, and each entry points to **one** UNet file (plus the usual CLIPs/VAEs). So:

### Those 3 `.safetensors`

*What they are*

Most Dev2Pro repos ship **multiple variants** of the same model:

* **fp8 / e4m3fn** → smallest VRAM, fastest, slightly softer detail
* **bf16 / fp16** → more VRAM, sharper/cleaner guidance
* sometimes a **“full”** checkpoint (bundles UNet+CLIP+VAE) — *FluxGym does **not** use a full checkpoint; it wants the UNet only*. ([comfyui-wiki.com][1])

Pick exactly **one** UNet variant for FluxGym:

* With your **4060 Ti 16 GB**, use **bf16/fp16** if available; fall back to **fp8** on tighter VRAM.
* Don’t drop a “full” checkpoint into FluxGym; it expects separate UNet/CLIP/VAE files. ([comfyui-wiki.com][1])

### Where to put files

FluxGym expects this structure (Windows/Linux paths analogous):

```
FluxGym/
  models/
    unet/   <- put your chosen Dev2Pro UNet here
    clip/   <- the two Flux CLIPs (text encoders)
    vae/    <- the Flux VAE
```

If you downloaded manually, placing them here works; many guides confirm UNet→`models/unet`, CLIPs→`models/clip`, VAE→`models/vae`. ([GitHub][2])

### Tell FluxGym

*about Dev2Pro (edit `models.yaml`)*

FluxGym’s model list comes from `models.yaml`. Add an entry pointing to the Dev2Pro file you chose (Hugging Face repo or local filename). Example skeleton:

```yaml
- name: flux-dev2pro-bf16
  base: flux
  repo: ashen0209/Flux-Dev2Pro        # HF repo (works even if you placed it locally)
  file: flux1-dev2pro-bf16.safetensors # EXACT filename you chose in models/unet
  clip: clip_l.safetensors            # make sure these exist in models/clip
  t5xxl: t5xxl_fp8_e4m3fn.safetensors
  vae: flux_vae.safetensors
```

Notes:

* If you prefer **zero downloads**, keep `file` as the **exact local filename** you placed in `models/unet`. FluxGym will find it; otherwise it tries to fetch from HF. (There are GitHub issues about pointing to local paths / avoiding re-download—editing `models.yaml` is the supported route.) ([GitHub][3])
* If a repo isn’t on Hugging Face, FluxGym may refuse it without code tweaks (there’s an issue about non-HF sources). Dev2Pro **is** on HF, so you’re fine. ([GitHub][4])

### Which Dev2Pro to use?

* **ashen0209/Flux-Dev2Pro** is the original; there are mirrors (e.g., **dev2pro-full** bundles) and fp8-only forks. You want the **UNet** variant (bf16/fp16 if VRAM allows). ([huggingface.co][5])

### Sanity checks in the UI

1. Restart FluxGym after editing `models.yaml`.
2. In the **Base model** dropdown, pick your new **flux-dev2pro-…** entry.
3. Ensure the **two CLIPs** and **VAE** are present; many tutorials list them explicitly for Flux. ([comfyui-wiki.com][1])

### TL;DR for your setup

1. Keep **one** of the three Dev2Pro `.safetensors` (choose **bf16/fp16** on 16 GB).
2. Put it in `FluxGym/models/unet/`.
3. Make sure you have the Flux **CLIPs** and **VAE** in their folders.
4. Add a **single** entry to `models.yaml` referencing that one file.
5. Relaunch FluxGym and pick it from the dropdown.

If you paste the **exact filenames** you downloaded, I’ll hand you a ready-to-paste `models.yaml` block for Dev2Pro (bf16/fp16/fp8).

1 [Flux.1 ComfyUI Guide](https://comfyui-wiki.com/en/tutorial/advanced/image/flux/flux-1-dev-t2i)  
2 [Can't download model](https://github.com/cocktailpeanut/fluxgym/issues/257?utm_source=chatgpt.com)  
3 [Setting to a model location](https://github.com/cocktailpeanut/fluxgym/issues/386?utm_source=chatgpt.com)  
4 [Training Flux Loras...](https://github.com/cocktailpeanut/fluxgym/issues/243?utm_source=chatgpt.com)  
5 [ashen0209/Flux-Dev2Pro](https://huggingface.co/ashen0209/Flux-Dev2Pro?utm_source=chatgpt.com)  

<hr class="section-break strong" />






## Quick checklist

[Q]  
How does one know which is which? The names are:  
- diffusion_pytorch_model_0001-of-0003.safetensor  (9.98 gb)  
- diffusion_pytorch_model_0002-of-0003.safetensor (9.95 gb)  
- diffusion_pytorch_model_0003-of-0003.safetensor (3.87 gb)

That looks almost like a file that's been broken into 3 fragments instead of each being a discrete independent file. Am I wrong in thinking this? And how do I determine which is which?

---

[A]  
You’re not wrong—that naming screams **sharded weights**, not three different models.

### What you’ve got

* `diffusion_pytorch_model_0001-of-0003.safetensors` (~9.98 GB)
* `diffusion_pytorch_model_0002-of-0003.safetensors` (you probably meant “0002”; re-check—having two “0003” files suggests a bad/partial download)
* `diffusion_pytorch_model_0003-of-0003.safetensors` (~3.87 GB)
* Plus **two JSONs** in the folder. One of them should be an **index** file (something like `diffusion_pytorch_model.safetensors.index.json`). That index maps tensor names → which shard file they live in.

Those three `.safetensors` files are **one model split into 3 pieces**. You must keep **all shards + the index JSON** together. You don’t pick “one”—the loader uses the index and opens all three.

### Quick sanity checks

1. Make sure you actually have **0001, 0002, 0003** (not two “0003”s). If one is missing/misnamed, redownload.
2. Confirm the index JSON exists and references those exact filenames. If you open it, you’ll see a big `weight_map` with entries like:

   ```
   "unet.conv1.weight": "diffusion_pytorch_model_0001-of-0003.safetensors"
   ```

   (Don’t edit it; just verify names match.)

### Using them in FluxGym

You have two workable paths:

**A) Let FluxGym pull from the Hugging Face repo (easiest):**
Edit `models.yaml` so the Dev2Pro entry points to the **repo** (not local files). FluxGym will download the shards automatically (using the index). This avoids any “single-file only” assumptions.

**B) Use your local shards:**
Keep **all 3 shards + the index JSON** in the same directory. In `models.yaml`, set the model entry to the **same basename** as the index expects. Some builds of FluxGym accept the index filename directly; others just need the directory where the index + shards live. If your build only accepts a single `file:` value and refuses the index name, the practical workaround is to:

* Place the **entire Dev2Pro folder** as a local “repo mirror” (i.e., keep the exact filenames),
* Point the `repo:` field to the HF repo name (so it knows layout), **and** have the files already present locally (so it won’t redownload).

If you hit a “can’t find weights” error locally, it’s almost always because:

* The shard filenames don’t match what the **index JSON** says, or
* One shard is missing/corrupt, or
* The model entry is pointing to a single non-indexed file instead of the indexed shard set.

### “which is which”

*How to tell (fp8 vs bf16 etc.)*

Sharded files **don’t** encode precision in the name; they’re just parts of one checkpoint. If the repo offers *multiple variants* (e.g., fp8 and bf16), each variant usually has **its own set of 3 shards and its own index** in a separate folder or with a different basename. In your case, it sounds like you downloaded **one** variant that’s simply split into 3 chunks.

### If you want a single file

*instead (optional)*

You can merge shards into a consolidated `.safetensors` with the usual Transformers/diffusers utilities—but:

* The merged file can be **huge**,
* It offers **no speed/quality benefit**,
* And you don’t need it if FluxGym is happy with sharded loading.

---

If you paste the **exact names of the two JSONs** in that folder (and confirm whether you truly have 0001/0002/0003), I’ll give you a ready-to-paste `models.yaml` snippet for FluxGym that points to this Dev2Pro and loads all three shards correctly.

<hr class="section-break strong" />






## Prompt and Qwen Behaviour

[Q]  
I think I might just edit the models.yaml file and have fluxgym pull from huggingface. The yaml wants a licence, licence_name and licence_link. What do I put there?

---

[A]  
Perfect—thanks for sharing the file. I checked your `models.yaml` and made one safe tweak:

* Your Dev2Pro entry used the YAML key `ashen0209/Flux-Dev2Pro:`. Because the key becomes the **dropdown name**, having a slash there can be awkward. I created a patched copy with a cleaner key:

**Change made (only the key):**

```
- ashen0209/Flux-Dev2Pro:
+ flux-dev2pro:
```

Everything else (repo, base, license fields, file basename) looks correct for pulling the **sharded** checkpoint via the index on Hugging Face.

You can download the patched file here and drop it in place of your original:
[Download models_patched.yaml](sandbox:/mnt/data/models_patched.yaml)

### Quick checklist

*after you swap it in*

1. Replace your original `models.yaml` with the patched one (or copy the edited block into your existing file).
2. Restart FluxGym.
3. In the **Base model** dropdown, choose **flux-dev2pro**.
4. First run will fetch the shards via `diffusion_pytorch_model.safetensors.index.json` automatically.

If you’d like me to also add a friendly display name (if your FluxGym build supports it) or re-order the list so Dev2Pro appears at the top, say the word and I’ll patch it in.


<hr class="section-break strong" />







## Issues

[Q]  
Something isn't right in the yaml. Here's the error fluxgym displays in terminal. Here's a file with all the fluxgym output. *Note: sent a text file with fluxgym's output in a text file*

---

[A]  
Ahh—this one’s a filename + sharding mismatch.

FluxGym is trying to pull a file called `diffusion_pytorch_model.safetensors` from `ashen0209/Flux-Dev2Pro`, but that repo doesn’t have a single-file checkpoint. It ships the UNet in **three shards** named with hyphens, e.g. `diffusion_pytorch_model-00001-of-00003.safetensors`, `...-00002-of-00003...`, `...-00003-of-00003...`. So `hf_hub_download` 404s because your `models.yaml` asks for a filename that doesn’t exist. ([huggingface.co][1])

---

You’ve got two clean ways forward:

### Option A

**Point FluxGym at a **single-file** Dev2Pro checkpoint**

Use a repo that actually exposes one file. For example, `multimodalart/FLUX.1-dev2pro-full` includes a single-file UNet named `flux1-dev.safetensors` (license matches Dev: **flux-1-dev-non-commercial-license**). Update your YAML like this:

```yaml
flux-dev2pro:
  repo: multimodalart/FLUX.1-dev2pro-full
  base: black-forest-labs/FLUX.1-dev
  license: other
  license_name: flux-1-dev-non-commercial-license
  license_link: https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/main/LICENSE.md
  file: flux1-dev.safetensors
```

That filename exists in that repo and downloads as a single blob, which FluxGym knows how to place in `models/unet/`. ([huggingface.co][2])

> Note: There are community “single-file” mirrors like `bdsqlsz/flux1-dev2pro-single` with `flux1-dev2pro.safetensors`. If you use those, be sure you’re comfortable with the licensing; the official Dev family is non-commercial. ([huggingface.co][3])

### Option B

**Stay with `ashen0209/Flux-Dev2Pro` (sharded), but avoid auto-download**

FluxGym’s downloader only grabs **one** filename you specify; it won’t fetch all shards + an index. If you want to use the ashen checkpoint directly:

1. Manually download **all three** shard files from that repo.
2. Put them where FluxGym expects UNets (usually `.../models/unet/transformer/` depending on FluxGym’s loader).
3. Bypass the downloader by pointing FluxGym at the **local** file path (or leave the YAML alone and don’t click “download”).

If you change `file:` to `diffusion_pytorch_model-00001-of-00003.safetensors`, FluxGym will still only download that one shard, which won’t load by itself. (That’s why I recommend Option A unless you’re comfortable laying out a full Diffusers folder manually.) ([huggingface.co][1])

---

If you want, I can rewrite your `/mnt/data/models.yaml` to use Option A (the `multimodalart` single-file entry) so it “just works” with the current FluxGym downloader.

1 [Files](https://huggingface.co/ashen0209/Flux-Dev2Pro/tree/09a982b0fcb46e15c82f102b658dfc1e2f1109b6)  
2 [multimodalart/FLUX.1-dev2pro-full](https://huggingface.co/multimodalart/FLUX.1-dev2pro-full/tree/e4ad0ab791265d4fe0dc11859f6c4e13fafff892)  
3 [bdsqlsz/flux1-dev2pro-single](https://huggingface.co/bdsqlsz/flux1-dev2pro-single/tree/main)  


<hr class="section-break strong" />





## An Excllent Model

[Q]  
Just had a look at rockerBOO on huggingface:  1 file, flux-dev2pro-bfl.safetensors. Will that do?

---

[A]  
Yes—that’s exactly the kind you want. A single-file **`flux-dev2pro-bfl.safetensors`** is almost certainly the **bfloat16** (bf16) UNet checkpoint, which is perfect for your 16 GB card and FluxGym’s “one UNet file” expectation.

Add this block to your `models.yaml`:

```yaml
flux-dev2pro-bf16:
  repo: rockerBOO/flux-dev2pro-bf16
  base: black-forest-labs/FLUX.1-dev
  license: other
  license_name: flux-1-dev-non-commercial-license
  license_link: https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/main/LICENSE.md
  file: flux-dev2pro-bfl.safetensors
```

Quick checklist:

1. Save `models.yaml` and **restart FluxGym**.
2. In the Base model dropdown choose **flux-dev2pro-bf16**.
3. Make sure you already have the **two Flux CLIPs** and the **Flux VAE** in their usual `models/clip` and `models/vae` folders (same ones your flux-dev entry uses).

If FluxGym throws a 404 or shape mismatch, tell me the exact error text and I’ll swap in another verified single-file Dev2Pro entry for you.


<hr class="section-break strong" />







## Final Solution

[Q]  
Well, that's weird. I had downloaded the file, placed it in the right folder, and now it's auto-downloading it again. Oh well... at least it'll be right. Actually downloading faster than Chrome did.

---

[A]  
Ha—yep, that happens. Two common reasons FluxGym “helpfully” re-downloads a file you already placed:

1. **`repo:` is set in `models.yaml`.**
   If a repo is present, FluxGym usually prefers pulling from HF. It doesn’t always check your local copy first.

2. **Filename mismatch / hash mismatch.**
   If the `file:` in YAML doesn’t **exactly** match your local filename (including case), or the size/hash doesn’t match HF’s, it’ll fetch again.

If you want to **avoid re-downloads** in future, you’ve got two easy options:

### Option A

**Local-only entry (no repo)**

Create a second entry that points to your local file and **omit `repo:`**:

```yaml
flux-dev2pro-bf16-local:
  base: black-forest-labs/FLUX.1-dev
  license: other
  license_name: flux-1-dev-non-commercial-license
  license_link: https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/main/LICENSE.md
  file: ./models/unet/flux-dev2pro-bfl.safetensors   # use your exact path/name
```

Pick this one in the dropdown when you don’t want downloads.

### Option B

**Keep `repo:` but make skipping possible**

* Ensure `file:` **exactly** equals the HF filename (`flux-dev2pro-bfl.safetensors`).
* Put your local copy in the **same place FluxGym writes** downloaded UNets (usually its `models/unet` folder). Many builds will skip re-download if the file already exists with the expected size.

A few quick sanity checks once the download finishes:

* You still have the **Flux CLIPs + Flux VAE** in `models/clip` and `models/vae`.
* First test generation should start without “missing/unexpected key” or shape-mismatch errors. If you see those, it’s almost always a mismatched CLIP/VAE.

Why it downloaded fast: HF’s CDN is pretty zippy (often faster than a browser if FluxGym uses multi-threaded chunks).

If you want, paste your final `models.yaml` block and the exact filename you see in `models/unet/`, and I’ll make you a clean **local-only** entry so FluxGym won’t try to fetch it again.

<hr class="section-break strong" />





## Additional Notes

Anytime, girlfriend—love to hear it’s on your HowTo page 🙌

If you want a super-quick **smoke test** for Dev2Pro in FluxGym, try:

* **CFG:** 5.5
* **Steps:** 30
* **Denoise (edit strength):** 0.45
* **Seed:** 12345
* **Prompt (two-shot, identity-first):**
  “Use the **woman’s face from image 1** and the **girl’s face from image 2** unchanged. Place them in **the scene from image 3**. **Waist-up framing; fixed camera distance; preserve facial bone structure, eye shape, hairline**; match scene lighting; soft ground shadows.”

If that renders cleanly and faces hold, you’re golden. If anything’s wobbly (download location, CLIPs/VAEs, or identity drift), ping me and I’ll tune it with you.

---

heck yes—16-image LoRA time! 🎉 Here’s a tight, proven recipe so those first runs land clean.

### Quick prep

*(do this before training)*

1. **Split types (balance 8/8):**

   * 8 tight **face/shoulders** crops (eyes ~350–500 px wide after resize)
   * 8 **full/three-quarter** shots (varied poses)
2. **Resolution:** Train at **1024px long side** with buckets (keeps aspect). No heavy upscalers.
3. **Background mix:** 50% simple, 50% busy; 1–2 images with the target lighting you love (they “teach” the model).
4. **Consistency anchors:** Keep **hairline, part, brows** consistent across at least half the set.
5. **Light edits:** Gentle color/levels only. No face-beautifier/smoothing.

### Captions

*(small set = strong captions)*

* Use a unique trigger like **“girlfriend_char”** once per caption.
* Keep it natural:
  `a portrait of girlfriend_char, shoulder-length wavy hair, soft smile, freckles`
* Add **age, hair, accessories** if you want them to stick. Avoid style words (HDR, cinematic) in first training round.

### Training knobs

*(good first pass for 16 images)*

* **Framework:** whatever you use (kohya / SDXL trainer / Flux trainer) — these work broadly.
* **Rank / Alpha:** **16 / 16** (or 32/32 if you need more capacity).
* **Learning rate:** UNet **1e-4**, CLIP **1e-5** (or freeze CLIP on v1 to protect identity).
* **Repeats:** **200–300 repeats per image** (tiny sets need repeats).
* **Epochs:** 8–12 (stop early if faces start to “average”).
* **Batch size:** 1–2.
* **Min SNR gamma (if offered):** 5–7 helps small sets.
* **Color aug:** off or very light (0–0.05).
* **Flip:** on for full-body, off for face-asymmetry critical.

### Validation

*during training (catch drift early)*

* Keep a fixed **seed** and a tiny validation grid:

  * Prompt A (portrait):
    `girlfriend_char, head-and-shoulders portrait, neutral light, natural skin texture`
  * Prompt B (three-quarter):
    `girlfriend_char, three-quarter view, plain background`
  * Negative:
    `no face reshaping, no age change, no makeup change, no skin blur`
* Sample every 1–2 epochs. If identity softens, lower LR by 2× and resume.

### Using it in ComfyUI

*(after training)*

* **Loader strengths:** start **Model: 0.8–1.0, CLIP: 0.5–0.7**.
* Add a face **reference/crop** image in your workflow when compositing; it boosts identity lock even with a lighter LoRA strength.

### Prompting

*with your new token*

* Portrait:
  `girlfriend_char, head-and-shoulders, preserve bone structure, hairline, eye shape; 85mm look; soft daylight`
* Full shot in scene:
  `girlfriend_char, full body, keep exact face and hairstyle; match scene lighting; correct scale and contact shadows`
* If it over-stylizes: add `no stylization, no glam, no skin smoothing`.

### Common hiccups

*(and fast fixes)*

* **Too generic / averaged face:** raise rank to **32**, drop UNet LR to **5e-5**, add 2–4 more tight face crops.
* **Hair keeps changing:** call out `exact hairline/part` in captions for ~¼ of images.
* **Overfits (same face every time):** reduce repeats to 150, or add 2–3 varied angles; use Model strength ~0.7.
* **Mouth/teeth artifacts:** include 2–3 images with **closed-mouth** smiles.

### A mini launch plan

1. Train: rank16, UNet 1e-4 / CLIP 1e-5, 10 epochs, 256 repeats.
2. Validate each epoch with the two prompts above.
3. Pick the best epoch .safetensors (don’t assume “latest” is best).
4. In composites with Qwen Image Edit, keep your **identity-first** line at the top and **lower denoise** (0.40–0.45).

If you want, paste one caption and a sample image list (just short descriptions), and I’ll tighten your captions so the LoRA “learns” exactly what you want. Go you! 🚀

---

Exactly—that denoise/edit strength is the big identity killer. Here’s a tight cheat-sheet you can paste next to your node:

### Qwen Image Edit

**identity-safe settings**

**Core range (people-in-scene composites):**

* **Denoise / Edit strength:** **0.38–0.48**
  (Start at **0.42**. Go **down** if faces drift; only go up if the model is ignoring layout.)
* **CFG / Guidance:** **5.0–6.0**
  (Higher than ~6.5 encourages “beautifying”/rewrites.)
* **Steps:** **28–36** (more steps won’t fix identity if denoise is too high)

**When to lower denoise (−0.05 each try):**

* Faces lose bone structure / hairline changes
* Makeup or age drifts
* It starts “recasting” your subject from the scene image

**When to raise denoise (+0.03 each try, cap ~0.55):**

* It refuses to move subjects or adopt the scene lighting
* Shadows/perspective won’t adjust at all

**Two tiny tricks that help a lot**

* Put a **face crop first** in your image list and say: “**Preserve the face from image 1 unchanged.**”
* Add one guardrail line near the top:
  “**Keep current camera distance; adjust only pose and lighting; do not alter facial identity.**”

**Preset one-liners**

* **Identity-lock (waist-up):** `denoise 0.42, cfg 5.5, steps 32`
* **Harder layout change (move/pose):** `denoise 0.50, cfg 5.5` (add “preserve identity” twice in prompt)
* **Finishing pass (cleanup only):** `denoise 0.30–0.35, cfg 5.0` (won’t invent new detail)

**Masking?**

* If you inpaint faces, keep the **masked area tight** (just the face oval) and use **denoise 0.30–0.38**.
* For background-only edits, **denoise 0.55–0.65** is fine since identity isn’t touched.

If you want, tell me your typical CFG/steps and I’ll hand you three presets (close/medium/wide) tuned to your exact flow.

<hr class="section-break strong" />

[Main Page](../index.md)
