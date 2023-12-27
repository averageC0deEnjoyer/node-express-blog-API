# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

two flavors :
fetch everything at App.js, then pass blog data as props (but in the backend i limit the data so that when im in homepage, the blog descriiption field is not fetched and only be fetched when i access blog Detail). then i have to refactor the backend so no matter what, i give all the fields including the description even though im in home page and not needed the descrition data yet.

OR

like what i did right now, only pass the data that i need (in homepage doesnt need description), but the drawback is i have to fetch again when i access BlogDetail component.
