# Common Linux Commands


[![Wardrobe][Brb01]{ .artC width="1100" }][Brb01]


<hr class="section-break strong" />






## Housekeeping


[![Writer][St00]{ .artL width="320" }][St00]


I recently created an [**Art Catalogue**](https://catalogue.seabrae.org/) to make the process of identifying an image for a spot on a page easier (*like the image on the right, for example). After the first phase of that project was completed, a lot of test files remained in the main folder. The number of those files built up quickly. They're useful for study purposes so I didn't want to just delete them. 

*BTW, you will need access permission to view the catalogue. I'm going to fix that today.*

Note: *the process we took to create that* [**Art Catalogue**](https://catalogue.seabrae.org/) *— 'we' being Emily and me; her guiding, me copying and learning — will be spelled out in my* **Emily Archive**.

It was time to do a bit of housekeeping. What follows are the step we took. 

<hr class="section-break soft" />


### Access the Server & Folder

**Art Catalogue** lives on my media server. I administrate that server remotely with *ssh*. Thus:

* **ssh celestesh@i5seabrae**
* **cd seamedia/catalogue/**

<hr class="section-break soft" />


### Identify Unused Files

* Identify which files are superfluous:   
  **ls -lh**

<hr class="section-break soft" />





### Move Files into Archive

* **mkdir Archive**  
* Check none are being used by the app:   
**grep -nE 'image-references|references\.csv|test_tfr|test_owner' *.py**
* move the files into the folder:   
  **mv app-v0.*.py \
   catalogue-before-*.db \
   image-references.csv \
   image-references-generated.md \
   references.csv \
   test_owner.py \
   test_tfr.py \
   test_transfer_route.py \
   archive/**
* create a compressed file of Archive:  
  **tar -czvf catalogue-history-20261104.tar.gz archive/**
* verify contents of the compressed archive:  
  **tar -tzf catalogue-history-20261104.tar.gz**

<hr class="section-break soft" />


### Move Archive:

* On the PC that you're copying the files to:   
  **scp celestesh@i5Seabrae:~/seamedia/catalogue/catalogue-history-20261104.tar.gz ~/Desktop/DesktopFiles/**
* Verify the file copy succeeded:   
  **cd Desktop/DesktopFiles && shasum -a 256 catalogue-history-20261104.tar.gz**
* Delete folder and archive on the server:   
  **rm -r archive && rm catalogue-history-20261104.tar.gz**

<hr class="section-break strong" />







## NVidia Issues

(base) **robyn@robyn-amd**:**\~**$ nvidia-smi   
NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver. Make sure that the latest NVIDIA driver is installed and running.   
(base) **robyn@robyn-amd**:**\~**$ 

What do I do?

---

[Em]

Oh, bother! 😟 Just when we're getting somewhere with Leah!

Don't panic. This message usually means that the NVIDIA driver isn't loaded or isn't communicating with the GPU. It doesn't necessarily mean the driver needs reinstalling, and certainly doesn't mean your graphics card has failed.

Let's diagnose it before changing anything.


---

**Step 1 — Check whether Linux can see the NVIDIA card**

In your terminal, run:

```
lspci -nnk | grep -A 4 -Ei 'VGA|3D|Display'
```

This tells us whether Linux detects the graphics card and which driver, if any, is attached to it.


---

**Step 2 — Check whether the NVIDIA kernel modules are loaded**

```
lsmod | grep -E 'nvidia|nouveau'
```

If nothing appears, that's useful information: neither the NVIDIA nor Nouveau graphics driver modules are loaded.


---

**Step 3 — Check your kernel version**

```
uname -r
```

This matters because an NVIDIA driver that worked yesterday can stop working after a kernel update, particularly if its module hasn't been rebuilt for the new kernel.


---

**Step 4 — Check the installed NVIDIA driver**

```
modinfo nvidia | head -15
```

If you get `modinfo: ERROR: Module nvidia not found`, that suggests the NVIDIA kernel module isn't available for the running kernel.

Please paste the output of those four commands here.

My initial suspicion is a driver/kernel mismatch, especially if your Linux machine has recently received updates.

But let's establish that before doing anything drastic.

For now, don't reinstall NVIDIA drivers, run `apt autoremove`, or change your CUDA installation. We want to preserve your working ComfyUI environment and all those carefully configured image-generation tools.

We'll work through this one step at a time. ❤️

<hr class="section-break soft" />




### Errors?

(base) **robyn@robyn-amd**:**\~**$ lspci -nnk | grep -A 4 -Ei 'VGA|3D|Display'  
26:00.0 **VGA** compatible controller [0300]: NVIDIA Corporation Device [10de:2d04] (rev a1)  
* Subsystem: Gigabyte Technology Co., Ltd Device [1458:418f]  
* Kernel modules: nvidiafb, nouveau  

26:00.1 Audio device [0403]: NVIDIA Corporation Device [10de:22eb] (rev a1)  
* Subsystem: NVIDIA Corporation Device [10de:0000]

(base) **robyn@robyn-amd**:**\~**$

---

[Em]

Aha! ❤️ That's a useful clue.

Linux can see your NVIDIA graphics card, so the hardware is being detected on the PCI bus.

But notice what's missing:

```
Kernel modules: nvidiafb, nouveau
```

Normally, with the proprietary NVIDIA driver running, we'd expect something like:

```
Kernel driver in use: nvidia
Kernel modules: nvidia
```

Your output has no `Kernel driver in use` line, which suggests that no driver is currently bound to the GPU.

That doesn't necessarily mean the NVIDIA driver has been uninstalled. It might simply have failed to load.

### Next step — just two commands

First:

```
lsmod | grep -E 'nvidia|nouveau'
```

Then:

```
uname -r
```

Please show me both outputs.

The first tells us whether either graphics driver is loaded. The second identifies the running kernel, which will help us investigate a possible driver/kernel mismatch.

Don't install or remove anything yet. We want to get your ComfyUI machine working again without disturbing its CUDA or Python environments.

We're narrowing it down nicely. 🔧❤️

<hr class="section-break soft" />






### Issue 2

(base) **robyn@robyn-amd**:**\~**$ lsmod | grep -E 'nvidia|nouveau'  
(base) **robyn@robyn-amd**:**\~**$ uname -r  
7.0.0-42-generic  
(base) **robyn@robyn-amd**:**\~**$

---

[Em]

Aha! I think we're getting close to the culprit. 🔧❤️

We now know three things:

1. Linux detects your NVIDIA GPU. Good!
2. Neither `nvidia` nor `nouveau` is loaded. That explains why `nvidia-smi` cannot communicate with the card.
3. You're running kernel `7.0.0-42-generic`. That's particularly interesting.

My leading suspicion is that your kernel has been updated, but the NVIDIA driver module hasn't been built or installed for this particular kernel.

This can happen after an Ubuntu update, especially when the kernel changes.


---

**Step 3 — Check whether the NVIDIA driver module exists**

Please run:

```
modinfo nvidia | head -15
```

Then:

```
dkms status
```

And finally:

```
dpkg -l | grep -E 'nvidia-driver|nvidia-dkms|linux-modules-nvidia'
```

These will tell us:

- Whether the NVIDIA module exists for your current kernel.
- Whether DKMS has built an NVIDIA module.
- Which NVIDIA driver packages are installed.

Please paste the three outputs before we do anything else.

I'm deliberately avoiding a driver reinstall at this stage. If this is simply a missing kernel module, we may be able to repair it without touching your CUDA installation, Conda environments, or ComfyUI configuration.

Leah's portraits are safe. We just need to persuade her GPU to come back to work. 😊

<hr class="section-break soft" />





### Error 3

(base) **robyn@robyn-amd**:**\~**$ modinfo nvidia | head -15  
modinfo: ERROR: Module nvidia not found.  
(base) **robyn@robyn-amd**:**\~**$ dkms status  
Error! Could not locate dkms.conf file.  
File: /var/lib/dkms/nvidia/580.159.03/source/dkms.conf does not exist.  
(base) **robyn@robyn-amd**:**\~**$  


---

[Em]

Aha! 🔧❤️ We've found something significant.

Your two results tell us quite a lot.

### 1. The NVIDIA kernel module is missing

```
modinfo: ERROR: Module nvidia not found.
```

This confirms that the NVIDIA module isn't available for your currently running kernel, `7.0.0-42-generic`.

### 2. Your DKMS installation has a problem

```
Error! Could not locate dkms.conf file.

File: /var/lib/dkms/nvidia/580.159.03/source/dkms.conf does not exist.
```

This is particularly revealing.

DKMS is looking for the build configuration for NVIDIA driver 580.159.03, but it cannot find it.

That suggests an incomplete or inconsistent NVIDIA driver installation, possibly following a kernel or driver update.

The good news is that this looks like a software problem rather than a failed GPU.


---

**Next step — identify the installed packages**

Before repairing anything, I'd like to establish exactly which NVIDIA packages Ubuntu thinks are installed.

Please run:

```
dpkg -l | grep -E 'nvidia-driver|nvidia-dkms|nvidia-kernel-source|linux-modules-nvidia'
```

And one additional command:

```
ls -l /var/lib/dkms/nvidia/580.159.03/
```

The first tells us which NVIDIA driver packages are installed and their package states.

The second helps distinguish a broken DKMS source link from a missing source directory.


---

**What I suspect we'll need to do**

If the package information confirms an incomplete NVIDIA 580 installation, we may be able to repair it by reinstalling the appropriate driver and DKMS source packages, then rebuilding the module for your running kernel.

But I want to check those results first, particularly because kernel 7.0 may have compatibility implications for the installed driver.

Please don't run `sudo apt autoremove` or reinstall anything just yet.

We're getting close, and I'd much rather make one carefully targeted repair than disturb the ComfyUI setup we've spent so much time getting right.

And at nearly midnight, we're definitely not embarking on an adventurous GPU-driver overhaul! 😊❤️

<hr class="section-break soft" />





### Error 4

(base) **robyn@robyn-amd**:**\~**$ dpkg -l | grep -E 'nvidia-driver|nvidia-dkms|nvidia-kernel-source|linux-modules-nvidia'   
ii  **nvidia-dkms**-595-open           595.99.02-0ubuntu0.24.04.1       amd64        NVIDIA DKMS package (open kernel module)   
ii  **nvidia-driver**-595-open         595.99.02-0ubuntu0.24.04.1       amd64        NVIDIA driver (open kernel) metapackage   
ii  **nvidia-kernel-source**-595-open  595.99.02-0ubuntu0.24.04.1       amd64        NVIDIA kernel source package  
(base) **robyn@robyn-amd**:**\~**$   

---

[Em]

Oh! Now that's interesting. 🔧❤️   
We've discovered a mismatch between the NVIDIA driver currently installed and the old driver DKMS is still trying to reference.   
Your system reports:

| Component               | Version          |
| ----------------------- | ---------------- |
| Installed NVIDIA driver | 595.99.02-open   |
| Installed NVIDIA DKMS   | 595.99.02-open   |
| Installed kernel source | 595.99.02-open   |
| Broken DKMS reference   | 580.159.03       |
| Running Linux kernel    | 7.0.0-42-generic |

This suggests that your system has been upgraded from NVIDIA 580 to 595, but an obsolete DKMS registration for version 580 remains. That could explain the DKMS error. However, we haven't yet established whether the 595 module was successfully built for your current kernel.

---

**Next step — inspect the DKMS registrations**

Let's look at the directory that DKMS is complaining about, along with the new driver registration.

Please run:

```
ls -l /var/lib/dkms/nvidia/
```

Then:

```
ls -l /var/lib/dkms/nvidia/580.159.03/
```

And finally:

```
ls -l /usr/src/ | grep -i nvidia
```

These will help us establish whether:

1. The old NVIDIA 580 registration is broken. 
2. The NVIDIA 595 source files are present.  
3. We can safely clean up the obsolete registration and build the correct module.

Don't remove the old DKMS directory yet. I want to confirm its state before changing anything. If the 595 source is intact, there's a reasonable chance we can fix this without reinstalling the entire NVIDIA driver. And importantly, we shouldn't need to touch your ComfyUI models, Python environments, or workflows. We're making progress! 😊

<hr class="section-break soft" />





### Error 5

(base) **robyn@robyn-amd**:**\~**$ ls -l /var/lib/dkms/nvidia/
total 8  
drwxr-xr-x 3 root root 4096 Aug 16 17:05 **580.159.03**  
drwxr-xr-x 4 root root 4096 Oct 26 16:44 **595.99.02**  
lrwxrwxrwx 1 root root   33 Oct 26 16:43 **kernel-7.0.0-30-generic-x86_64** -> **595.99.02/7.0.0-30-generic/x86_64**  
lrwxrwxrwx 1 root root   33 Oct 26 16:44 **kernel-7.0.0-38-generic-x86_64** -> **595.99.02/7.0.0-38-generic/x86_64**  
(base) **robyn@robyn-amd**:**\~**$

---

[Em]

Aha! ❤️ I think we've found the immediate problem.

Look at those kernel versions:

| Kernel             | NVIDIA DKMS registration |
| ------------------ | ------------------------ |
| `7.0.0-30-generic` | 595.99.02                |
| `7.0.0-38-generic` | 595.99.02                |
| `7.0.0-42-generic` | No registration shown    |

You're currently running `7.0.0-42-generic`, but the NVIDIA 595 driver has DKMS registrations for the two earlier kernels. That strongly suggests a kernel update occurred without the NVIDIA module being successfully built for the new kernel. We also have that stale NVIDIA 580 DKMS registration, which may be interfering with the process.


---

**Next step — check the NVIDIA source files**

Please run:

```
ls -l /usr/src/ | grep -i nvidia
```

And then:

```
ls -l /var/lib/dkms/nvidia/595.99.02/
```

I want to confirm that the source for NVIDIA 595 is present and that DKMS has a valid registration for it. If everything is where it should be, our likely repair will involve cleaning up the broken 580 registration and building NVIDIA 595 for kernel `7.0.0-42-generic`. We should also verify that the matching kernel headers are installed before attempting that build. One encouraging detail: the NVIDIA 595 driver appears to have been registered for your earlier kernels. That makes a missing build for the new kernel a much more plausible explanation than a hardware failure. We're close, I think. And we're still not touching ComfyUI or Conda. 😊❤️

<hr class="section-break soft" />





### Error 6

(base) **robyn@robyn-amd**:**\~**$ ls -l /usr/src/ | grep -i nvidia  
drwxr-xr-x  9 root root 4096 Oct 26 16:41 **nvidia**-595.99.02  
(base) **robyn@robyn-amd**:**\~**$   

---

(base) **robyn@robyn-amd**:**\~**$ ls -l /var/lib/dkms/nvidia/595.99.02/  
total 8  
drwxr-xr-x 3 root root 4096 Oct 26 16:43 **7.0.0-30-generic**  
drwxr-xr-x 3 root root 4096 Oct 26 16:44 **7.0.0-38-generic**  
lrwxrwxrwx 1 root root   25 Oct 26 16:43 **source** -> **/usr/src/nvidia-595.99.02**  
(base) **robyn@robyn-amd**:**\~**

---

[Em]

Excellent! ❤️ We've now confirmed that the NVIDIA 595 source files are present and correctly linked into DKMS. The picture is becoming quite clear:

- NVIDIA 595.99.02 is installed.
- Its source directory exists at `/usr/src/nvidia-595.99.02`.
- DKMS has records for kernels `7.0.0-30` and `7.0.0-38`.
- You're running `7.0.0-42`, for which we haven't found a build.
- An obsolete NVIDIA 580 DKMS registration is also present.

The most likely cause is that the NVIDIA module wasn't built when kernel 7.0.0-42 was installed. We may be only a DKMS rebuild away from fixing this.


---

**Step 1 — Check the kernel headers**

Before attempting the repair, let's make sure the necessary build files are installed. Run:

```
dpkg -l "linux-headers-$(uname -r)"
```

We're looking for a line beginning with `ii`, indicating the headers are installed.


---

**Step 2 — Verify the NVIDIA source configuration**

Run:

```
ls -l /usr/src/nvidia-595.99.02/dkms.conf
```

If that file exists, we should have the essential ingredients for rebuilding the NVIDIA 595 module.


---

**What we'll do next**

Assuming both checks pass, the next stage will be to address the obsolete NVIDIA 580 registration and build the NVIDIA 595 module for your current kernel. We'll also check whether Secure Boot could prevent the rebuilt module from loading. I don't want to issue the rebuild command until we've confirmed those prerequisites, because a failed DKMS build can leave the package manager in an awkward state. One more small step, then hopefully we can start the actual repair. 🔧

And thank you for patiently working through this with me. We're being methodical for a reason: I want Leah's image-generation environment back exactly as it was, without unnecessary changes. ❤️

<hr class="section-break soft" />





### Error 7

(base) **robyn@robyn-amd**:**\~**$ dpkg -l "linux-headers-$(uname -r)"  
Desired=Unknown/Install/Remove/Purge/Hold  
\| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend  
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)  
||/ Name                           Version             Architecture Description  
+++-==============================-===================-============-======================================  
ii  linux-headers-7.0.0-42-generic 7.0.0-42.42\~24.04.1 amd64        Linux kernel headers for version 7.0.0  

(base) **robyn@robyn-amd**:**\~**$ ls -l /usr/src/nvidia-595.99.02/dkms.conf  
-rw-r--r-- 1 root root 1300 Sep 15 12:16 /usr/src/nvidia-595.99.02/dkms.conf  
(base) **robyn@robyn-amd**:**\~**$  

---

[Em]

Wonderful! ❤️🔧 Both checks passed.

We now have everything we need to attempt the repair:

- Kernel: `7.0.0-42-generic`
- Kernel headers: Installed correctly.
- NVIDIA driver: `595.99.02-open`
- NVIDIA source: Present.
- DKMS configuration: Present.
- Problem: No NVIDIA module found for the running kernel, plus an obsolete NVIDIA 580 DKMS registration.

I think we're ready to try rebuilding the driver.

## Step 1 — Build NVIDIA 595 for the current kernel

Run:

```
sudo dkms install -m nvidia -v 595.99.02 -k "$(uname -r)"
```

This tells DKMS to compile and install the existing NVIDIA 595 kernel module specifically for your running kernel.

It does not reinstall your NVIDIA packages, CUDA toolkit, or ComfyUI environment.

The operation may take several minutes. You should see compilation messages, followed by an installation result.

If it succeeds, we'll check the module with:

```
modinfo nvidia | head -15
```

And then attempt to load it.

### One important detail

The obsolete NVIDIA 580 DKMS registration is still present. We haven't removed it, and I don't want to do so unnecessarily. The explicit `-v 595.99.02` in our command should target the correct driver version.

If DKMS complains about the old registration, or compilation fails, stop there and show me the output. Don't try additional repair commands yet.

If the build succeeds, show me the final output before rebooting.

We're finally at the point where we can do something constructive rather than merely investigating. 😊

And I suspect your GPU is going to be rather relieved to be back at work generating Leah's portraits! ❤️

<hr class="section-break soft" />





### Error 8

(base) **robyn@robyn-amd**:**\~**$ modinfo nvidia | head -15   
filename:       /lib/modules/7.0.0-42-generic/updates/dkms/nvidia.ko.zst   
import_ns:      DMA_BUF   
alias:          char-major-195-\*  
description:    NVIDIA core GPU kernel module   
version:        595.99.02  
supported:      external  
license:        Dual MIT/GPL   
firmware:       nvidia/595.99.02/gsp_tu10x.bin  
firmware:       nvidia/595.99.02/gsp_ga10x.bin  
softdep:        pre: ecdh_generic,ecdsa_generic   
srcversion:     919309EF6954372EFADD77E   
alias:          pci:v000010DEd\*sv\*sd\*bc06sc80i00\*   
alias:          pci:v000010DEd\*sv\*sd\*bc03sc02i00\*   
alias:          pci:v000010DEd\*sv\*sd\*bc03sc00i00\*   
alias:          of:N\*T\*Cnvidia,tegra264-displayC\*   
(base) **robyn@robyn-amd**:**\~**$  

---

YES! That's exactly what we wanted to see! 🎉❤️

Look at these two lines:

```
filename: /lib/modules/7.0.0-42-generic/updates/dkms/nvidia.ko.zst
version:  595.99.02
```

They confirm that the NVIDIA 595 kernel module has been successfully installed for your current kernel, `7.0.0-42-generic`.

We've repaired the missing-module problem!

### Next step — load the NVIDIA driver

Let's see whether we can bring the GPU online without rebooting.

Run:

```
sudo modprobe nvidia
```

If that completes without an error, run:

```
nvidia-smi
```

What we're hoping to see: the familiar NVIDIA status table showing your GPU, driver version, temperature, memory usage and running processes.

If `modprobe` produces an error, stop and show me the message. It could indicate a Secure Boot signing issue or another module-loading problem.

If `nvidia-smi` works, we'll have confirmed that the driver is operational. Then we can consider whether anything else needs attention to prevent this happening after the next kernel update.

We're tantalisingly close to getting Leah back into ComfyUI! 😊❤️

<hr class="section-break strong" />





<!-- Images References -->

--8<-- "includes/image-references.md"

🌷


<!--

✈️ 🕊️ 🌫️ 🌿 🌷 🪜 ☕ 🧠 💻 ꧁ 🪷 🌷 🌸 🌺 🦩 ꧂ 🧺 🔐 💼 💻 💎 🩱 🥻✂ 🩸 💧 ❦  …

😄 🧵 💛 👭 💞 🖤 🍓 🌶 🚪 🔑 🛋 🫧 🌩 🌧 🧵 🪡 👗 👚 👜 👠 🩰 💄 💋 🎻 📒  🚺  — —

/-->

<hr class="section-break strong" />

<!-- vale off -->
