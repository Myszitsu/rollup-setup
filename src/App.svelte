<script>
    export let name
    export let name2
</script>

<style lang="scss">
    :global(body) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
        font-size: 24px;
    }

    .name {
        color: red;

        &-two {
            color: cyan
        }
    }
</style>

    <h1>Hello <span class="name">{name}</span>!</h1>
    <h2>Hello <span class="name-two">{name2}!</span></h2>
