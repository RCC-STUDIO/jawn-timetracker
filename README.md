## CAM (Canadian Automotive Manufacturer) - Car Dealership Website Project (English/Anglais)
---------------------------------------------------------------------------------------------------------------------------------------------------
    
    Project Description:
    -----------------------------------------------------------------------------------------------------------------------------------------------
    This is a Car Dealership Website that is built using React, Next.js, and Tailwind CSS. This project is a work in progress and is not yet complete. 
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
    - Tailwind CSS
    - NextAuth.js

    Database Used:
    - MongoDB

    -----------------------------------------------------------------------------------------------------------------------------------------------

    Project Notes and Additional Information:
    -----------------------------------------------------------------------------------------------------------------------------------------------
    
    First-Time Install to run a build project 
    (Only used to install necessary Pre-req the project for the first time):
    -------------------------------------------------------------------------------
    1. Install react/node with `npm install`
    2. Install next-auth with `npm install next-auth`
    3. Install react-navigation/native npm install @react-navigation/native
    3A. Install prsim with `npm install prisma`
    3B. Install npm install `@prisma/client`
    4. Install `npm add bcrypt`
    5. Install `npm add @next-auth/prisma-adapter`
    6. Make sure .env.local or .env file is setup with the correct database information and credentials for Google Auth or other Auth providers
       - Example .env.local file:
            - NEXTAUTH_URL=http://localhost:3000
            - NEXTAUTH_SECRET= <YOUR_SECRET>
            - CLIENT_ID= <YOUR_CLIENT_ID>
            - CLIENT_SECRET= <YOUR_CLIENT_SECRET>
            - DATABASE_URL= <YOUR_DATABASE_URL>
    7. Refer to the Prisma Config After Model Changes Setup section below to setup the Prisma to connect to Database

    Prisma Config After Model Changes Setup:
    -------------------------------------------------------------------------------
    0. `npx prisma init` //Only if Prisma File does not exist
    1. `npx prisma generate`
    2. `npx prisma db push`

    To run the project:
    -------------------------------------------------------------------------------
    1. Use `npm run dev` to start the development server
    2. Go to [http://localhost:3000](http://localhost:3000) to see the result

    ----------------------------------------------------------------------------------------------------------------------------------------------- 

    Additional Documentation:
    -----------------------------------------------------------------------------------------------------------------------------------------------
    
    React Documentation:
    -------------------------------------------------------------------------------------
    * Next.js Documentation: https://nextjs.org/docs
    * React Documentation: https://reactjs.org/docs/getting-started.html
    * NextAuth.js Documentation: https://next-auth.js.org/getting-started/introduction

    Programming Documentation:
    -------------------------------------------------------------------
    * HTML Documentation: https://www.w3schools.com/html/
    * CSS Documentation: https://www.w3schools.com/css/
    * JavaScript Documentation: https://www.w3schools.com/js/
    * TypeScript Documentation: https://www.typescriptlang.org/docs/
    * Tailwind CSS Documentation: https://tailwindcss.com/docs
    -----------------------------------------------------------------------------------------------------------------------------------------------

    Copyright and Licensing Information:
    -----------------------------------------------------------------------------------------------------------------------------------------------
    
    Software Copyright:
    ------------------------------------------------------------------------------------------
    © RCC_STUDIO 2018-2024
    © J.A.W.N Technologies 2023-2024
    © CAM (Canadian Automotive Manufacturer) 2023-2024
    This project is licensed under the MIT License - see the LICENSE.md file for details
    ------------------------------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------------------
    


