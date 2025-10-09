# TimeLab Admin Page

## TODO

- [ ] Make the name of the person available on the single image view 

## Features

- Image upload: Calls the backend API to detect which face we uploaded and store it in the database
- Image Gallery: View the images that we have in the database and have an option to delete them

## Structure

```
├─ src/
│ ├─ app/                   # routing, admin page, login page
│ ├─ components/            # UI components (dropzone, GalleryImages)
│ ├─ hooks/                 # auth/useAuth, useImages (React Query)
│ ├─ lib/                   # api client, validators, constants
│ └─ types/                 # TS types for API
├─ public/                  # static assets
├─ tests/                   # unit/e2e tests (optional)
├─ .env.local.example       # sample env
├─ package.json
└─ README.md
```

### Certain Files Explained
There are some certain files that are key to the apps, such as `hooks/use-supabase-upload.tsx`, `auth/login/page.tsx`, `components/admin/ImageUpload.tsx.

- `hooks/use-supabase-upload.tsx`: This file contains a custom React hook that handles image uploads to Supabase and triggers the machine learning pipeline. 
- auth/login/page.tsx: This file contains the login page component, which handles user authentication and redirects to the admin page upon successful login.
- components/admin/ImageUpload.tsx: This file contains the image upload component, which provides a drag-and-drop interface for uploading images.

## Quickstart

### Prerequisite

- Node.js `>=18`
- pnpm / npm / yarn
- Backend running and reachable at < Backend URL >


### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=<YOUR SUPABASE HOST>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR SUPABASE ANON KEY>
NEXT_PUBLIC_SUPABASE_BUCKET=<YOUR SUPABASE IMAGE BUCKET NAME>
API_BASE_URL=<YOUR API BASE URL>
```


### Installation

1. Clone the repo
    ```
    git clone <repo-url>
    cd timelab_fe
    ```

2. Install the dependencies
    ```
      npm install
    ```

3.  Run the development server
    ```
      npm run dev
    ```


## Middleware
### How it works (flow)

1. **Match protected routes** via `config.matcher`, excluding `/auth/*` and static assets.
2. **Read cookies**: short-lived `accessToken` and longer-lived `refreshToken`.
3. **Validate access token** by calling `POST ${API_BASE_URL}/api/auth/validate/` with `Authorization: Bearer <accessToken>`.
4. If invalid/expired, **refresh** by calling `POST ${API_BASE_URL}/api/token/refresh/` with JSON `{ "refresh": "<refreshToken>" }`.
5. **On refresh failure** → redirect to `/auth/login`.
6. **On refresh success** → set a new `accessToken` (httpOnly cookie) and allow the request (`NextResponse.next()`).

---

## Backend contract (expected)

- **Validate**: `POST /api/auth/validate/`  
  - `200 OK` → token valid  
  - `401/403` → token invalid/expired
- **Refresh**: `POST /api/token/refresh/`  
  - `200 OK` with body `{ "access": "<JWT>" }` → refresh succeeded  
  - `401` → refresh invalid/expired

> Compatible with Django REST Framework + SimpleJWT (or any backend exposing equivalent endpoints).

---

## Configuration & env

- **`API_BASE_URL`**: must be defined for the Edge runtime (build/deploy env), e.g.  
  `API_BASE_URL=https://api.example.com`  
  *Do not* prefix with `NEXT_PUBLIC_` (this runs server-side).
- **Cookies expected**:  
  - `accessToken` – short-lived JWT  
  - `refreshToken` – long-lived refresh token
- **Matcher (protected paths)**:
  `/((?!auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)`

### Security best practices

- Set access token cookie with:
- `httpOnly: true`
- `secure: true` (production/HTTPS)
- `sameSite: "lax"` (or `"strict"` if flow allows)
- `maxAge` ≈ access token TTL
- If your backend only accepts `Authorization` headers (not cookies), send API requests **server-side** (Next.js Route Handlers / server actions) where you can read the httpOnly cookie and attach the header. Client JS cannot read httpOnly cookies.

---

## Performance notes

- This implementation **calls the backend to validate** on navigation. To reduce calls, you can parse the JWT on the edge and check `exp` locally, only refreshing when near/after expiry, and fall back to server validation on uncertainty.

---

## Troubleshooting

- **Always redirected to login**  
Check `API_BASE_URL` value, CORS, cookie domain/path, and that `refreshToken` exists and is valid.
- **Token refresh succeeds but API still returns 401**  
The backend may not read cookies—proxy calls server-side and attach `Authorization: Bearer <accessToken>`.
- **Middleware not triggered**  
Path isn’t matched by `config.matcher` or the file isn’t named/placed correctly (`middleware.ts` at repo root).
