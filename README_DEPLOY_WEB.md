# Deploying Taleem Se Taraqqi Web Prototype

This guide provides the exact commands to publish the **Taleem Se Taraqqi** Flutter Web prototype for free using **Netlify** or **Firebase Hosting**.

---

## 1. Prerequisites & Build Output

The web build is generated into `mobile/build/web`:

```powershell
# From the project root
cd mobile
flutter build web --release
```

The resulting directory contains:
- `index.html`
- `main.dart.js` / WebAssembly artifacts
- `assets/` (including SIL OFL Noto fonts and local assets)
- `manifest.json`

---

## 2. Option A: Publish for Free on Netlify (Fastest - 1 Minute)

### Method 1: Netlify CLI
```powershell
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Navigate to build output
cd mobile/build/web

# Deploy draft preview
netlify deploy

# When prompted:
# 1. Create & configure a new site
# 2. Publish directory: . (current folder)

# Deploy to production with custom URL:
netlify deploy --prod --dir=.
```

### Method 2: Netlify Web Drag-and-Drop (Zero Tooling)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the `mobile/build/web` folder directly into the browser window.
3. Your prototype is live instantly with an HTTPS link (e.g., `https://taleem-se-taraqqi.netlify.app`).

---

## 3. Option B: Publish for Free on Firebase Hosting

### Step 1: Install Firebase CLI
```powershell
npm install -g firebase-tools
firebase login
```

### Step 2: Initialize Firebase in `mobile/`
```powershell
cd mobile
firebase init hosting
```
- Select: **Use an existing project** (or create a new one).
- What do you want to use as your public directory? `build/web`
- Configure as a single-page app? **Yes**
- Set up automatic builds and deploys with GitHub? **No**
- Overwrite `build/web/index.html`? **No**

### Step 3: Deploy
```powershell
firebase deploy --only hosting
```
Output URL will look like: `https://<your-project-id>.web.app`.

---

## 4. Option C: Run Locally for Demonstrations

To preview locally on any port with no cloud dependencies:

```powershell
# Using Python built-in HTTP server:
cd mobile/build/web
python -m http.server 8080

# Or using Flutter local development server:
cd mobile
flutter run -d chrome --web-port=8080
```
Open `http://localhost:8080` in Chrome, Edge, or mobile browser on the same Wi-Fi network.
