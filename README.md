[Link to Github-Pages ](https://alexlogvinmal.github.io/dbb-test-task/ "alexlogvinmal.github.io/dbb-test-task/")

## After you download repository please connect all dependencies

### `npm install`

## Then launch the React App

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## About

Create with **API Dropbox**

#### Working functions

**Top buttons**
- Upload
- Create -> Folder
- More -> Rewind this folder

**Files**
- Download
- Rename
- Delete


Application design is made using Material UI


## **Navigation**


**components**

- ButtonModul
--> ButtonModul.module.scss
--> ButtonModul.tsx //// component where the buttons 'Create', 'Upload', 'Organise', 'More' are collected

- helpers
-- generateIcon.tsx //// export FolderIcon and FileIcon 

- Icons
-- Icons.tsx //// export svg icons

- Main
-- Main.module.scss
-- Main.tsx //// the main module where all application components are collected

- ShowContent
-- ShowContent.module.scss
-- ShowContent.tsx //// the component displays each file as a table element, there is also a functionality

**const**
-- api.ts //// ACCESS TOKEN

**redux**
-- hook.ts //// useAppDispatch, useAppSelector
-- store.ts //// create store

- createFolder
-- action.ts
-- reducer.ts //// folder creation functionality

- fetchFiles
-- action.ts
-- reducer.ts //// download files from request

- pathUrl
-- action.ts
-- reducer.ts //// creating link for every folder 

- setPath
-- action.ts
-- reducer.ts //// update path state

- updateFiles
-- action.ts
-- reducer.ts //// update state

- uploadFile
-- action.ts
-- reducer.ts ////  upload files functionality

-- App.tsx

-- declare.d.ts //// declare .module.scss

-- index.tsx

-- style.scss
