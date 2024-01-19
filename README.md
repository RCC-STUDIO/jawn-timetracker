## TecTOC (TOC Software Center) 
### Version
```markdown
    Build: Version: Alpha 0.0.1
    Release: N/A
    Release Date: N/A
```
## Copywrite Information

### Copywrite & License Information

© J.A.W.N Group Corporation 2023-2024

Apache License 2.0 (2004)
Refer to the LICENSE file for more information.

### Contributors
J.A.W.N Group Corporation::
- Ryan Clarkson (RCC STUDIO)
- Matthew Simms
- Gabriel Leclerc
- Benjamin Roskey
- Cyril Dizon


## Project Information/Documentation 
### Project Description
```markdown
Project Goals:
    - 
    
Possible Future Goals:
    -

Languages Used:
    - TypeScript 
    - JavaScript
    - HTML
    - CSS
    - JSON

Frameworks Used:
    - React
    - Next.js
    - Next-Auth

Database Used:
    - MongoDB
```
### Installation/Setup Instructions (REQUIRED)
0. Make sure you have the LATEST STABLE VERSION (v20.10.0) of Node.js installed on your machine:[Node.js_Download](https://nodejs.org/en)

1. Install Next.js, Node.js, and React Project Dependencies 
```bash
npm install
```
2. Install next-auth
```bash
npm install next-auth
```
3. Install Cookies Package
```bash
npm install --save-dev @types/cookie
```
4. Install Bcrypt
```bash
npm add bcrypt
```
5. Install CSV 
```bash
npm install csv
```
6. Install Prisma
```bash
npm install prisma
```
7. Install Prisma Client
```bash
npm install @prisma/client
```
8. Install Prisma Adapter
```bash
npm install @next-auth/prisma-adapter
```
9. Setup/Configure Prisma (Use First Command Only if the prisma file hasn't been created)
```bash
 npx prisma init
 ```
 ```bash
 npx prisma generate
```
```
npx prisma db push
```

11. Make Sure you create a .env.local file in the root directory and add the following code
```markdown

NEXTAUTH_URL=http://localhost:3000 
NEXTAUTH_SECRET=<copy NextAuth Secret here>

DATABASE_URL=<copy Database URL Here>

```

### Project Spin Up

1. Run the following command to start the project
```bash
npm run dev
```
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Requirements

Packages:
- Node.js (v20.10.0) or Later
- Next.js (v14.0.0) or Later
- next-auth
- bcrypt
- prisma

### Documentation Links

Node.js, Next.js, Next-Auth Documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [NextAuth.js TypeScript](https://next-auth.js.org/getting-started/typescript)

Programming Documentation:

- [HTML Documentation](https://www.w3schools.com/html/)
- [CSS Documentation](https://www.w3schools.com/css/)
- [JavaScript Documentation](https://www.w3schools.com/js/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Code Conventions
General:
- method naming and variable naming use camelCase
- arrow functions

Front-End
- For common styling spread across multiple tags, create string variables that
  allow you to store it. use camelCase for naming conventions

Back-End
-
