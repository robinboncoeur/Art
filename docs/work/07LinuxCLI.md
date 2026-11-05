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







<!-- Images References -->

--8<-- "includes/image-references.md"

🌷


<!--

✈️ 🕊️ 🌫️ 🌿 🌷 🪜 ☕ 🧠 💻 ꧁ 🪷 🌷 🌸 🌺 🦩 ꧂ 🧺 🔐 💼 💻 💎 🩱 🥻✂ 🩸 💧 ❦  …

😄 🧵 💛 👭 💞 🖤 🍓 🌶 🚪 🔑 🛋 🫧 🌩 🌧 🧵 🪡 👗 👚 👜 👠 🩰 💄 💋 🎻 📒  🚺  — —

/-->

<hr class="section-break strong" />

<!-- vale off -->
