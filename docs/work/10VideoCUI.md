# Video in ComfyUI

## An Initial Prompt

A nearly still portrait. She remains facing forward and listens quietly to someone just off camera. Natural breathing only, with extremely subtle facial micro-expression. Her gaze remains steady. No head turn, no looking upward, no exaggerated blinking, no camera movement, no change in hairstyle, clothing, lighting, or facial identity.


[ Emily ]

Perfect, Robyn — we’re properly re-anchored. 😊

The working target is now very clear:

**ComfyUI + Hunyuan I2V on the RTX 4060 Ti 16 GB**, using a strong still portrait as the source and asking for only restrained, emotionally meaningful motion. Identity stability matters far more than spectacle.

My starting recommendation remains:

- use the **FP8-scaled Hunyuan I2V model**
- begin with short clips and modest frame counts
- avoid adding RIFE or super-resolution until the base motion is behaving
- treat motion control as the main experiment, not resolution
- use prompts describing a nearly static performance rather than a list of facial movements

Something like this is closer to the right prompting philosophy:

> A nearly still portrait. She remains facing forward and listens quietly to someone just off camera. Natural breathing only, with extremely subtle facial micro-expression. Her gaze remains steady. No head turn, no looking upward, no exaggerated blinking, no camera movement, no change in hairstyle, clothing, lighting, or facial identity.

The important part is that we should not immediately build the full grand pipeline. First we prove three things:

1. Hunyuan runs reliably within 16 GB.
2. It preserves Celeste’s face.
3. It obeys “almost no movement” better than FramePack did.

Only then do we add interpolation, upscaling, longer duration, or more elaborate motion.

I also agree with keeping FramePack installed. Its export problem is likely repairable, and it may still prove useful for certain images or motion styles even if Hunyuan becomes the main tool.

So our next practical task is simply: **identify the exact Hunyuan I2V workflow and model files suitable for your current ComfyUI installation and 16 GB card**, then get one minimal portrait test running. That is where we begin. 🎬


<hr class="section-break strong" />

<!-- Images References -->

--8<-- "includes/image-references.md"

🌷

<hr class="section-break strong" />
