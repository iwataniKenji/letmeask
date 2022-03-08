<section align="center">
    <img src="./src/assets/images/logo.svg" />
</section>

---

<h2 align="center">Summary</h2>

<p align="center">
    <a href="#about">📙 About</a>
    <a href="#preview">🖼️ Preview</a>
    <a href="#start">📖 How to Start</a>
    <a href="#features">💡 Features</a>
    <a href="#technologies">💻 Technologies</a>
</p>

<h4 align="center">
   ✔️ Letmeask project finished ✔️
</h4>

<H2 id="about">📙 About</H2>

<p>Letmeask is a project developed for content creators to create Q&A rooms in a more organized and democratic way, helping the host to find more relevant questions faster</p>
<p>Originally created on Next Level Week Together #6 and made by <a href="https://www.linkedin.com/in/kleverson-kenji-iwatani/">Kenji Iwatani</a></p>
<p>
    <h3><a href="https://letmeask-c10c3.web.app/">Check website &rarr;</a></h3>
</p>

---

<H2 id="preview">🖼️ Preview</H2>

<section align="center">
    <img alt="Letmeask website overview" src="preview.gif"/>
</section>

---

<H2 id="start">📖 How to Start</H2>

<h3>Starting this repository:</h3>

```bash
# Clone this repository
$ git clone https://github.com/iwataniKenji/letmeask.git

# Access the project directory
$ cd letmeask
```

<h3>Creating and setting the project on firebase:</h3>
<p>It's required a <a href="https://firebase.google.com/">Firebase account</a> and a project created to provide a Realtime Database</p>

```bash
# Set authentication option on your firebase project 
authentication → get started → google

# Set realtime database on your firebase project
realtime database → create database → locked mode

# Paste this code on your realtime database rules
{
  "rules": {
    "rooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)"  
          }
        }
      }
    }
  }
}

# Set your firebase config
project overview → web → insert firebaseConfig code on ".env.example" file
```

<h3>Running the application:</h3>

```bash
# Rename the config file 
$ ren ".env.example" ".env.local"

# Install dependencies
$ yarn

# Initialize and open local host
$ yarn start
```

---

<H2 id="features">💡 Features</H2>

- [x] Google authentication
- [x] Navigation between pages
- [x] Database usage
- [x] Creating, joining and closing rooms
- [x] "Copy room code to clipboard" button
- [x] Separated admin and user events
- [x] Question buttons (like, answered, highlight, remove)

---

<H2 id="technologies">💻 Technologies</H2>

- [x] <a href="https://www.typescriptlang.org/">Typescript</a>
- [x] <a href="https://reactjs.org/">React</a>
- [x] <a href="https://firebase.google.com/">Firebase</a>
