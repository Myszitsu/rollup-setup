import App from "./App.svelte"

const app = new App({
    target: document.body,
    props: {
        name: 'world',
        name2: 'from h2'
    }
})

export default app