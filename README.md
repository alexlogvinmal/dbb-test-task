[Link to Github-Pages ](https://alexlogvinmal.github.io/dbb-test-task/ "alexlogvinmal.github.io/dbb-test-task/")

## After you download repository please connect all dependencies

### `npm install`

## Then launch the React App

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### **Navigation**


**components**

- ButtonModul
-- ButtonModul.module.scss
-- ButtonModul.tsx //// component where the buttons 'Create', 'Upload', 'Organise', 'More' are collected

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
-- reducer.ts

- fetchFiles
-- action.ts
-- reducer.ts

- pathUrl
-- action.ts
-- reducer.ts

- setPath
-- action.ts
-- reducer.ts

- updateFiles
-- action.ts
-- reducer.ts

- uploadFile
-- action.ts
-- reducer.ts

-- App.tsx

-- declare.d.ts

-- index.tsx

-- style.scss
