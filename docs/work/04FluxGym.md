# FluxGym


[![Mum and Daughter][Br02]{ .artC width="1100" }][Br02]


<hr class="section-break strong" />






## Discussion


[![Just Asking][Sy08]{ .artR width="320" }][Sy08]


[ Robyn ]     
Hi Emily. I have a question on FluxGym. I read an article on Medium by John Shi that recommends using, instead of Flux-dev, a fine-tuned model ... in this case, one called Flux-Dev2Pro. The huggingface.co link took me to the download page. There are two .json files and 3 .safetensor files. I've downloaded the lot into a separate folder under /fluxgym/models called /Flux-Dev2Pro. How does fluxgym know how to select this? 3 different safetensors?

<hr class="section-break soft" />




### Basics

[ Emily ]     
Great question—FluxGym won’t “auto-detect” a random folder with multiple checkpoints. It populates the **Base model** dropdown from its `models.yaml`, and each entry points to **one** UNet file (plus the usual CLIPs/VAEs). So:


---
Those 3 `.safetensors`

*What they are*

Most Dev2Pro repos ship **multiple variants** of the same model:

* **fp8 / e4m3fn** → smallest VRAM, fastest, slightly softer detail
* **bf16 / fp16** → more VRAM, sharper/cleaner guidance
* sometimes a **“full”** checkpoint (bundles UNet+CLIP+VAE) — *FluxGym does **not** use a full checkpoint; it wants the UNet only*. ([comfyui-wiki.com][1])

Pick exactly **one** UNet variant for FluxGym:

* With your **4060 Ti 16 GB**, use **bf16/fp16** if available; fall back to **fp8** on tighter VRAM.
* Don’t drop a “full” checkpoint into FluxGym; it expects separate UNet/CLIP/VAE files. ([comfyui-wiki.com][1])


---
Where to put files

FluxGym expects this structure (Windows/Linux paths analogous):

```
FluxGym/
  models/
    unet/   <- put your chosen Dev2Pro UNet here
    clip/   <- the two Flux CLIPs (text encoders)
    vae/    <- the Flux VAE
```

If you downloaded manually, placing them here works; many guides confirm UNet→`models/unet`, CLIPs→`models/clip`, VAE→`models/vae`. ([GitHub][2])


---
Tell FluxGym

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

---
Notes:

* If you prefer **zero downloads**, keep `file` as the **exact local filename** you placed in `models/unet`. FluxGym will find it; otherwise it tries to fetch from HF. (There are GitHub issues about pointing to local paths / avoiding re-download—editing `models.yaml` is the supported route.) ([GitHub][3])
* If a repo isn’t on Hugging Face, FluxGym may refuse it without code tweaks (there’s an issue about non-HF sources). Dev2Pro **is** on HF, so you’re fine. ([GitHub][4])


---
Which Dev2Pro to use?

* **ashen0209/Flux-Dev2Pro** is the original; there are mirrors (e.g., **dev2pro-full** bundles) and fp8-only forks. You want the **UNet** variant (bf16/fp16 if VRAM allows). ([huggingface.co][5])


---
Sanity checks in the UI

1. Restart FluxGym after editing `models.yaml`.
2. In the **Base model** dropdown, pick your new **flux-dev2pro-…** entry.
3. Ensure the **two CLIPs** and **VAE** are present; many tutorials list them explicitly for Flux. ([comfyui-wiki.com][1])


---
TL;DR for your setup

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


[![img][Sy01]{ .artR width="320" }][Sy01]


[ Robyn ]     
How does one know which is which? The names are:  
- diffusion_pytorch_model_0001-of-0003.safetensor  (9.98 gb)  
- diffusion_pytorch_model_0002-of-0003.safetensor (9.95 gb)  
- diffusion_pytorch_model_0003-of-0003.safetensor (3.87 gb)

That looks almost like a file that's been broken into 3 fragments instead of each being a discrete independent file. Am I wrong in thinking this? And how do I determine which is which?

<hr class="section-break soft" />




### Who is Who?

[ Emily ]     
You’re not wrong—that naming screams **sharded weights**, not three different models.



--- 
What you’ve got

* `diffusion_pytorch_model_0001-of-0003.safetensors` (~9.98 GB)
* `diffusion_pytorch_model_0002-of-0003.safetensors` (you probably meant “0002”; re-check—having two “0003” files suggests a bad/partial download)
* `diffusion_pytorch_model_0003-of-0003.safetensors` (~3.87 GB)
* Plus **two JSONs** in the folder. One of them should be an **index** file (something like `diffusion_pytorch_model.safetensors.index.json`). That index maps tensor names → which shard file they live in.

Those three `.safetensors` files are **one model split into 3 pieces**. You must keep **all shards + the index JSON** together. You don’t pick “one”—the loader uses the index and opens all three.



--- 
Quick sanity checks

1. Make sure you actually have **0001, 0002, 0003** (not two “0003”s). If one is missing/misnamed, redownload.
2. Confirm the index JSON exists and references those exact filenames. If you open it, you’ll see a big `weight_map` with entries like:

   ```
   "unet.conv1.weight": "diffusion_pytorch_model_0001-of-0003.safetensors"
   ```

   (Don’t edit it; just verify names match.)



--- 
Using them in FluxGym

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



--- 
“which is which”

*How to tell (fp8 vs bf16 etc.)*

Sharded files **don’t** encode precision in the name; they’re just parts of one checkpoint. If the repo offers *multiple variants* (e.g., fp8 and bf16), each variant usually has **its own set of 3 shards and its own index** in a separate folder or with a different basename. In your case, it sounds like you downloaded **one** variant that’s simply split into 3 chunks.



--- 
If you want a single file

*instead (optional)*

You can merge shards into a consolidated `.safetensors` with the usual Transformers/diffusers utilities—but:

* The merged file can be **huge**,
* It offers **no speed/quality benefit**,
* And you don’t need it if FluxGym is happy with sharded loading.


---
If you paste the **exact names of the two JSONs** in that folder (and confirm whether you truly have 0001/0002/0003), I’ll give you a ready-to-paste `models.yaml` snippet for FluxGym that points to this Dev2Pro and loads all three shards correctly.

<hr class="section-break strong" />






## Prompt and Qwen Behaviour


[![Img][Sy02]{ .artR width="320" }][Sy02]


[ Robyn ]     
I think I might just edit the models.yaml file and have fluxgym pull from huggingface. The yaml wants a licence, licence_name and licence_link. What do I put there?

<hr class="section-break soft" />




[ Emily ]     
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



--- 
Quick checklist

*after you swap it in*

1. Replace your original `models.yaml` with the patched one (or copy the edited block into your existing file).
2. Restart FluxGym.
3. In the **Base model** dropdown, choose **flux-dev2pro**.
4. First run will fetch the shards via `diffusion_pytorch_model.safetensors.index.json` automatically.

If you’d like me to also add a friendly display name (if your FluxGym build supports it) or re-order the list so Dev2Pro appears at the top, say the word and I’ll patch it in.

<hr class="section-break strong" />







## Issues


[![Img][Sy03]{ .artR width="320" }][Sy03]


[ Robyn ]     
Something isn't right in the yaml. Here's the error fluxgym displays in terminal. Here's a file with all the fluxgym output. *Note: sent a text file with fluxgym's output in a text file*

---

[ Emily ]     
Ahh—this one’s a filename + sharding mismatch.

FluxGym is trying to pull a file called `diffusion_pytorch_model.safetensors` from `ashen0209/Flux-Dev2Pro`, but that repo doesn’t have a single-file checkpoint. It ships the UNet in **three shards** named with hyphens, e.g. `diffusion_pytorch_model-00001-of-00003.safetensors`, `...-00002-of-00003...`, `...-00003-of-00003...`. So `hf_hub_download` 404s because your `models.yaml` asks for a filename that doesn’t exist. ([huggingface.co][1])

You’ve got two clean ways forward:



--- 
Option A

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



--- 
Option B

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





## An Excellent Model


[![Img][Sy04]{ .artR width="320" }][Sy04]


[ Robyn ]     
Just had a look at rockerBOO on huggingface:  1 file, flux-dev2pro-bfl.safetensors. Will that do?

---

[ Emily ]     
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


[![Img][Sy09]{ .artR width="320" }][Sy09]


[ Robyn ]     
Well, that's weird. I had downloaded the file, placed it in the right folder, and now it's auto-downloading it again. Oh well... at least it'll be right. Actually downloading faster than Chrome did.

---

[ Emily ]     
Ha—yep, that happens. Two common reasons FluxGym “helpfully” re-downloads a file you already placed:

1. **`repo:` is set in `models.yaml`.**
   If a repo is present, FluxGym usually prefers pulling from HF. It doesn’t always check your local copy first.

2. **Filename mismatch / hash mismatch.**
   If the `file:` in YAML doesn’t **exactly** match your local filename (including case), or the size/hash doesn’t match HF’s, it’ll fetch again.

If you want to **avoid re-downloads** in future, you’ve got two easy options:



---
Option A

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



---
Option B

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


[![Img][Sy14]{ .artR width="320" }][Sy14]


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



---
Quick prep

*(do this before training)*

1. **Split types (balance 8/8):**

   * 8 tight **face/shoulders** crops (eyes ~350–500 px wide after resize)
   * 8 **full/three-quarter** shots (varied poses)
2. **Resolution:** Train at **1024px long side** with buckets (keeps aspect). No heavy upscalers.
3. **Background mix:** 50% simple, 50% busy; 1–2 images with the target lighting you love (they “teach” the model).
4. **Consistency anchors:** Keep **hairline, part, brows** consistent across at least half the set.
5. **Light edits:** Gentle color/levels only. No face-beautifier/smoothing.



---
Captions

*(small set = strong captions)*

* Use a unique trigger like **“girlfriend_char”** once per caption.
* Keep it natural:
  `a portrait of girlfriend_char, shoulder-length wavy hair, soft smile, freckles`
* Add **age, hair, accessories** if you want them to stick. Avoid style words (HDR, cinematic) in first training round.



---
Training knobs

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



---
Validation

*during training (catch drift early)*

* Keep a fixed **seed** and a tiny validation grid:

  * Prompt A (portrait):
    `girlfriend_char, head-and-shoulders portrait, neutral light, natural skin texture`
  * Prompt B (three-quarter):
    `girlfriend_char, three-quarter view, plain background`
  * Negative:
    `no face reshaping, no age change, no makeup change, no skin blur`
* Sample every 1–2 epochs. If identity softens, lower LR by 2× and resume.



---
Using it in ComfyUI

*(after training)*

* **Loader strengths:** start **Model: 0.8–1.0, CLIP: 0.5–0.7**.
* Add a face **reference/crop** image in your workflow when compositing; it boosts identity lock even with a lighter LoRA strength.



---
Prompting

*with your new token*

* Portrait:
  `girlfriend_char, head-and-shoulders, preserve bone structure, hairline, eye shape; 85mm look; soft daylight`
* Full shot in scene:
  `girlfriend_char, full body, keep exact face and hairstyle; match scene lighting; correct scale and contact shadows`
* If it over-stylizes: add `no stylization, no glam, no skin smoothing`.



---
Common hiccups

*(and fast fixes)*

* **Too generic / averaged face:** raise rank to **32**, drop UNet LR to **5e-5**, add 2–4 more tight face crops.
* **Hair keeps changing:** call out `exact hairline/part` in captions for ~¼ of images.
* **Overfits (same face every time):** reduce repeats to 150, or add 2–3 varied angles; use Model strength ~0.7.
* **Mouth/teeth artifacts:** include 2–3 images with **closed-mouth** smiles.



---
A mini launch plan

1. Train: rank16, UNet 1e-4 / CLIP 1e-5, 10 epochs, 256 repeats.
2. Validate each epoch with the two prompts above.
3. Pick the best epoch .safetensors (don’t assume “latest” is best).
4. In composites with Qwen Image Edit, keep your **identity-first** line at the top and **lower denoise** (0.40–0.45).

If you want, paste one caption and a sample image list (just short descriptions), and I’ll tighten your captions so the LoRA “learns” exactly what you want. Go you! 🚀

---

Exactly—that denoise/edit strength is the big identity killer. Here’s a tight cheat-sheet you can paste next to your node:



--- 
Qwen Image Edit

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








## ComfyUI and LoRAs
### Dataset Training


[![Just...][Sy15]{ .artR width="320" }][Sy15]


Hey girlfriend! Great project. Here’s a solid, no-drama plan to get a clean, controllable **character LoRA** out of FluxGym.

---
1) LoRA should learn

(and what it must **not**)

* **Lock in**: face, head shape, eye color/shape, hair color/length/part, skin tone, key moles/scars/freckles, eyebrows, typical makeup (if you want it baked in).
* **Keep flexible**: clothes, background, pose, camera/lens, lighting, mood, accessories—unless you *want* those to be part of the identity.
* Make a one-line goal you’ll refer to while captioning:
  “`[celestegrl]` = petite 18-20yo woman, heart-shaped face, hazel eyes, dark chest-length hair, soft freckles, natural makeup.”

---
2) Dataset size & mix 

(sweet spot for a character)

Aim for **60–120 images** total. Curate hard—quality beats quantity.

**Coverage targets**

* **Face-centric closeups (40–50%)**: straight on, 3/4, profile. Neutral and varied expressions.
* **Torso/half-body (30–40%)**: ensure neck/shoulders consistency, hair length visible.
* **Full-body (10–20%)**: establish body proportions; a few walking/standing/sitting.
* **Hands (5–10%)**: a few images where hands are visible but not the star.
* **Lighting**: day, overcast, soft indoor, one or two “hard light” shots—no single look should dominate.
* **Backgrounds**: mostly plain or de-cluttered. Include a handful of busy scenes so the model learns to ignore them.
* **Wardrobe**: *varied*. If you don’t want a pink hoodie stuck to the LoRA forever, make sure it appears in ≤5% of images—or not at all.

**What to avoid**

* Sunglasses covering eyes, masks, heavy occlusions.
* Text/logos near face.
* Repetitive near-dupes (same pose/lighting/shirt).

---

3) Image prep

* **Resolution**: train buckets up to **1024** (Flux is comfy there). Keep sources ≥1024 on the shortest side; don’t upscale aggressively.
* **Cropping**: deliver both loose and tight crops; avoid cutting off chins/foreheads consistently—vary it.
* **Horizontal flips**: only if the face is symmetric and the character has **no asymmetric features** (part line, mole, earring). Otherwise, **don’t flip**.
* **Color**: gentle white-balance and exposure normalization are good; don’t stylize.

---

4) Trigger token strategy

* Use **one unique trigger** that will *never* appear in normal text, e.g. **`[celestegrl]`** (you already use this pattern—perfect).
* Pair it with a **class token** in captions, e.g. “woman”, “girl”, “person”, “portrait”. For Flux, **natural language** tends to work better than tag-soup.

---

5) Captioning

What to put in (and what to leave out)

Flux responds beautifully to **short, natural sentences**. Think **15–40 tokens** each.

**Template**

```
[celestegrl], portrait of a petite young woman with hazel eyes and chest-length dark hair, soft freckles, natural makeup, gentle smile, studio lighting, neutral background.
```

* Start with the trigger.
* Add **only** the traits you want the LoRA to learn as identity.
* Then add **scene/photography** descriptors (lighting, lensy words, background) to teach generalization—but don’t repeat the *same* scene terms on every image.

**When clothes/features should stay flexible**

* If you *don’t* want the LoRA to memorize the yellow cardigan, **omit it** from the caption. If it’s very visible in many images, mention generic “casual outfit” instead of “yellow cardigan”.

**Pose/shot words**

* Sprinkle across the set: “headshot”, “close-up”, “three-quarter view”, “profile”, “full body, standing”.

**Good caption examples**

* “`[celestegrl], natural light close-up, hazel eyes, chest-length dark hair, soft freckles, slight smile, shallow depth of field.`”
* “`[celestegrl], three-quarter view portrait, neutral background, relaxed expression.`”
* “`[celestegrl], full body, standing, casual outfit, outdoor overcast light.`”

**What not to do**

* Don’t stuff every caption with *all* traits (teaches the model those traits only work together).
* Don’t include changeable things you don’t want baked in (specific shirt colors, accessories, scene themes).
* Avoid long laundry-lists of tags; Flux likes prose.

---

6) Class/regularization

(optional but helpful)

* Add **100–200 generic “woman/person portrait”** images without your trigger token in a separate class folder if FluxGym supports prior-preservation.
* This reduces style drift and helps your LoRA not overwrite base concepts. Keep their captions simple (no trigger).

---

7) Repeats, epochs, steps

(ballpark)

Let **N** = number of instance images. A practical recipe:

* **N ≈ 80** images
* **Repeats**: 10
* **Batch**: 4
* **Epochs**: 1–2

**Steps ≈ (N × repeats × epochs) / batch**
For 80×10×1 / 4 = **200 steps** per epoch.
For character identity, expect **800–2500 total steps** to find the sweet spot (save checkpoints along the way: e.g., 600, 1200, 1800, 2400) and compare.

---

8) Training knobs 

...that tend to work (Flux-ish defaults)

* **Rank (dim)**: 16–32 (start at **16**; bump to 32 if you see underfitting).
* **Alpha**: = rank (e.g., 16).
* **Dropout**: 0.05–0.1 if you notice overfitting to clothes/backgrounds.
* **Learning rates**

  * **UNet**: **1e-4 → 2e-4**
  * **Text encoder**: **5e-6 → 1e-5** (keep low; raises binding to `[celestegrl]` without wrecking the base text space)
* **Optimizer**: AdamW, weight decay ~0.01.
* **Bucket max res**: 1024; enable aspect-buckets.
* **Gradient checkpointing** if VRAM is tight.

---

9) Validation

(don’t skip)

Hold out **6–10 images** (never seen in training). After each checkpoint:

* Prompt with/without the class token:

  * “`portrait of [celestegrl], soft daylight, natural makeup`”
  * “`[celestegrl] walking on a beach, golden hour`”
* Try clothing the LoRA never saw (“evening dress”, “hoodie”), different hair styles, and varied lighting to test generalization.
* Compare checkpoints side-by-side and pick the lowest step that nails identity **without** freezing wardrobe/lighting.

---

10) Common failure modes

...& fixes

* **Overfitting to one outfit/background** → reduce duplicates, add variety, add dropout 0.1, add class images, remove clothing terms from captions.
* **Face not locking / looks generic** → add more tight face crops with precise face traits in captions; slightly raise TE LR; increase repeats to 12.
* **Identity drifts under complex prompts** → ensure *every* caption starts with the trigger; include several neutral “vanilla” portraits; consider bumping rank from 16→32.
* **Mirrored mole/part line after flips** → remove flipped images; retrain.

---

11) Practical workflow

1. Curate 90 images → prune to the best **75–90**.
2. Sort into subfolders: `closeup/`, `halfbody/`, `fullbody/`, `hands/`.
3. Write **short prose captions** (sidecar `.txt` per image). Start with `[celestegrl]`.
4. (Optional) Add `class/` folder with 150 generic woman portraits + simple captions.
5. Train at 1024 buckets, rank 16, UNet 1e-4, TE 5e-6, batch 4, repeats 10, 1–2 epochs.
6. Save checkpoints every ~400–600 steps.
7. Validate with a fixed prompt sheet; pick the *lowest* step that passes identity + flexibility.

If you want, I can draft a **caption starter pack** for your first 20 images (you can paste the filenames), or a **prompt sheet** to evaluate checkpoints consistently.

<hr class="section-break strong" />










## Dimensions/aspect ratios

Short version: **Yes, mix dimensions; DPI doesn’t matter.** A few gotchas below.

* **It’s fine (and good) to mix** 1024×1024 with 1216×832, 896×1152, etc.
* In FluxGym, just **enable aspect-ratio buckets** and set a **max bucket size** (commonly 1024 or 1152 on the long side, depending on VRAM). The trainer will resize each image into the nearest bucket.
* **Avoid padding/letterboxing.** Give the trainer real pixels, not black bars. Crop instead of pad.
* **Keep subject scale consistent.** Even with buckets, don’t swing from extreme tight headshots to tiny faces in wide scenes. Aim for a coherent face size range across images (you can still keep some variety).
* **Don’t aggressively upscale** tiny sources to huge buckets—mild upscales are okay, but big ones add mushy detail and can teach artifacts.

---

DPI / PPI

* **Completely irrelevant.** Training uses raw pixel counts; DPI metadata is ignored. A 1024×1024 at 72 dpi and the same at 300 dpi are identical to the trainer.

---

Practical tips

* **Set max bucket**: 1024 (safe) or 1152 (more detail, more VRAM).
* **Minimum shortest side**: try to keep sources ≥768 px on the short side; delete or down-weight smaller ones.
* **Face framing**: for character LoRA, ensure ~40–60% of images have the face occupying ~35–70% of the frame.
* **No letterbox**: If you must normalize, **crop** to the desired aspect rather than adding borders.
* **VRAM awareness**: Wider/taller buckets (e.g., 1216×832) cost more memory than 1024×1024; pick a ceiling your GPU can handle.

If you want, tell me your GPU VRAM and I’ll suggest a max-bucket and batch size that won’t OOM, plus a quick crop recipe to keep face scale tidy across mixed aspect ratios.

<hr class="section-break strong" />










## What this GPU means


[![Img][Sy18]{ .artR width="320" }][Sy18]


...for your dataset

girlfriend, a **4060 Ti 16 GB** is a sweet spot for LoRA training. Here’s how it should shape your dataset and settings:

* **You can keep mixed aspect ratios** (e.g., 1024×1024 with 1216×832) and use **aspect-ratio buckets**. No need to force everything square.
* You can comfortably train at **max bucket 1024**; **1152** is also realistic if you keep batch sensible. Only drop big panoramic outliers that make faces tiny.
* **No need to downscale good sources**: keep images ≥**900–1024 px** on the short side when possible. Crop instead of letterbox.

### Trainer settings

**as Recommended**

(LoRA on Flux/SDXL-class models)

**Memory/precision**

* **Mixed precision**: **bf16** (preferred) or fp16.
* **Memory-efficient attention**: enable **Flash-Attention/xFormers** if FluxGym exposes it.
* **Gradient checkpointing**: **ON** (cuts VRAM nicely).

**Resolution & buckets**

* **Max bucket**: start **1024**; try **1152** if stable.
* **Min bucket short side**: 768.
* **Keep buckets** around these: 832×1216, 896×1152, 1024×1024, 1152×896 (trainer usually auto-makes them).

**Batching (typical for 16 GB)**

* At **1024 max**: **batch 4–6** (start **4**; raise if stable).
* At **1152 max**: **batch 2–4** (start **3**).
* If you want a larger *effective* batch, use **gradient accumulation** (e.g., batch 3 × grad-accum 2 ⇒ effective 6).

**Other handy toggles**

* **Cache latents** (if offered) to boost throughput after the first epoch.
* **Workers**: 4–8 (watch CPU/RAM).
* **Shuffle**: ON.

### Training recipe

that fits 16 GB (character LoRA)

* **Rank (dim)**: 16 (32 if underfitting).
* **Alpha**: same as rank.
* **Dropout**: 0.05–0.1 if it memorizes clothes/backgrounds.
* **LRs**: UNet **1e-4** (up to 2e-4), Text Encoder **5e-6** (up to 1e-5).
* **Repeats**: 10, **Epochs**: 1–2, **Batch**: as above.
* **Checkpoints** every **400–600** steps.

### Dataset Curating

with 16 GB in mind

* You **don’t** have to prune for VRAM—prune for **identity clarity**:

  * Aim **60–120 images**, with **40–50% closeups**, **30–40% half-body**, **10–20% full-body**.
  * Keep **face scale** within a sensible band (avoid lots of ultra-wide shots with tiny faces).
  * Keep **occlusions low** (no sunglasses/masks dominating).
* Keep **mixed lighting** and **varied outfits** so your LoRA generalizes; your GPU can handle the bucket variety.

### Two plug-and-play profiles

**Comfort (fast & stable)**

* Max bucket **1024**, batch **4**, bf16, checkpointing ON, Flash-Attn ON.
* Rank 16, UNet 1e-4, TE 5e-6, repeats 10, 1–2 epochs.

**Detail (more capacity, a tad slower)**

* Max bucket **1152**, batch **3**, bf16, checkpointing ON, Flash-Attn ON.
* Rank 16→32 (if needed), UNet 1.2e-4, TE 7e-6, repeats 10, 1–2 epochs.

### Quick troubleshooting

tied to VRAM

* **OOM at 1152** → drop batch by 1, or switch to max 1024, or enable grad-accum 2.
* **Training too slow** → stick to 1024 max; enable latent caching; trim bucket list to a few common shapes.
* **Identity wobbles** at higher res → keep 1024 max, add a few more tight face crops with crisp captions.

If you want, tell me whether you prefer the **Comfort** or **Detail** profile and I’ll spit out a ready-to-paste FluxGym config plus a tiny “bucket sanity” checklist for your image folder.

<hr class="section-break strong" />







## FluxGym config 


[![Img][Sy17]{ .artR width="320" }][Sy17]


(Comfort profile, 4060 Ti 16 GB)

girlfriend, here’s a **ready-to-paste Comfort profile** plus a quick **bucket sanity** checklist so you can roll right in FluxGym.

**Save as `config.yaml` (edit the paths and trigger/class tokens to taste):**

```yaml
# --- DATA ---
train_data:
  instance_dir: /path/to/dataset/instance          # your character images
  instance_caption_ext: .txt                       # sidecar captions
  class_dir: /path/to/dataset/class               # optional prior/class images
  class_caption_ext: .txt
  shuffle: true
  num_workers: 6

# --- CAPTION TOKENS ---
trigger_token: "[celestegrl]"
class_token: "woman"                               # or "girl"/"person" (keep natural)

# --- BUCKETING / RESIZE ---
buckets:
  enable: true
  max_res: 1024                                    # Comfort profile
  min_short_side: 768
  # Let FluxGym auto-generate common buckets; avoid letterboxing/padding

# --- TRAINING ---
output:
  out_dir: /path/to/outputs/celestegrl_lora
  save_every_n_steps: 500
  keep_last_n: 6

lora:
  enable: true
  rank: 16
  alpha: 16
  dropout: 0.08                                    # helps avoid clothing/background stickiness

optim:
  optimizer: adamw
  weight_decay: 0.01
  unet_lr: 1.0e-4
  text_encoder_lr: 5.0e-6
  betas: [0.9, 0.999]
  eps: 1.0e-8
  lr_scheduler: cosine
  warmup_steps: 100

trainer:
  precision: bf16                                  # or fp16 if bf16 not available
  batch_size: 4
  gradient_accumulation: 1
  gradient_checkpointing: true
  cache_latents_after_epoch: 1                     # speeds later epochs
  max_epochs: 1                                    # usually 1–2 is enough
  repeats: 10                                      # per-image repeats
  log_every_n_steps: 50

# --- VALIDATION PROMPTS (run after each save) ---
validation:
  enable: true
  num_images: 4
  prompts:
    - "portrait of [celestegrl], soft daylight, natural makeup"
    - "[celestegrl], three-quarter view, neutral background, relaxed expression"
    - "[celestegrl] walking on a beach, golden hour"
    - "[celestegrl], full body standing, evening dress, studio light"
```

**Rule-of-thumb steps (for ~80 images × repeats 10 × epochs 1, batch 4):** ~200 steps per epoch chunk; expect best checkpoints between **600–1800** steps. Keep the lowest step that nails identity **without** baking in outfits.

---

### Bucket sanity checklist

(quick pre-flight)

* **Mix of aspects OK**: 1024×1024, 1216×832, 896×1152 etc. are fine (no letterboxes).
* **Shortest side ≥ 768 px** for most images; toss the tiny, blurry ones.
* **Face scale band**: in ~50% of images, face occupies ~35–70% of frame (avoid lots of tiny faces).
* **No near-dupes**: same pose/lighting/outfit culled down to 1–2 best.
* **Minimal occlusion**: no sunglasses/masks dominating; eyes visible in most closeups.
* **Varied lighting/outfits**: keep wardrobe variety so clothing doesn’t imprint.
* **No padding**: crop to aspect; do **not** add borders/black bars.
* **DPI ignored**: don’t worry about 72 vs 300 — pixels are what matter.

---

### Caption mini-template

(Comfort style)

Keep them short, natural, and start with your trigger:

* `[celestegrl], natural light close-up, hazel eyes, chest-length dark hair, soft freckles, slight smile.`
* `[celestegrl], three-quarter view portrait, neutral background, relaxed expression.`
* `[celestegrl], full body, standing, casual outfit, overcast outdoor light.`

(Leave out specific clothing words unless you *want* them memorised.)

---

If you want, paste 10–15 filenames and I’ll draft the first batch of captions to match this config (face-heavy, clean, varied).

---

Love it, girlfriend. Here’s a **clean, identity-safe positive prompt** you can drop into Gwen Image Edit 2509 to generate dataset-ready variants from a single photo. It sticks to natural language and avoids baking in clothes/backgrounds while nudging for realism and face fidelity.

**Master positive prompt**

> **[celestegrl]**, natural identity-preserving portrait, photoreal, true skin texture and pores, sharp expressive eyes, accurate facial proportions, chest-length dark hair, soft freckles, **{headshot|three-quarter view|profile}**, **{soft daylight|open shade|studio softbox|window light|golden hour}**, **{neutral seamless backdrop|subtle gradient|plain wall|soft bokeh foliage}**, **{50mm look|85mm look}**, shallow depth of field (around f/2.8), balanced exposure, natural color, minimal makeup, no stylization, crisp focus, professional photographic quality

You can paste that verbatim. If your workflow supports wildcards (`{a|b|c}`), it’ll rotate **shot**, **lighting**, **background**, and **lens look** to produce controlled variety without drifting identity or baking in wardrobe. If it doesn’t, just pick one option from each set per batch/run.

If you’re training a LoRA, keep your **trigger token** up front (I used `[celestegrl]`, swap as needed).

<hr class="section-break strong" />



<!--           Image Links         /-->

[Br02]: ../assets/images/story/Bnr02a.jpg

[Sy08]: ../assets/images/story/08maiden.jpg
[Sy15]: ../assets/images/story/15orage.jpg
[Sy17]: ../assets/images/story/17think.jpg
[Sy18]: ../assets/images/story/18shop.jpg

[Sy01]: ../assets/images/story/Scene03a.jpg
[Sy02]: ../assets/images/story/Scene07a.jpg
[Sy03]: ../assets/images/story/Scene08a.jpg
[Sy04]: ../assets/images/story/Scene09a.jpg
[St05]: ../assets/images/story/Scene10a.jpg
[St06]: ../assets/images/story/Scene12a.jpg
[St07]: ../assets/images/story/Scene15a.jpg
[St08]: ../assets/images/story/Scene16a.jpg
[Sy09]: ../assets/images/story/Scene17a.jpg
[Sy14]: ../assets/images/story/Scene18a.jpg

<!--           Image Links         /-->
