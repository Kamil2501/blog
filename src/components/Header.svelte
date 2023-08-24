<script>
    import Icon from '@iconify/svelte';
	import { link } from "svelte-routing";
    export let theme;
    let icon = $theme === 'dark' ? 'material-symbols:light-mode': 'material-symbols:dark-mode'

    function toggleTheme() {
        if($theme === 'dark') {
            theme.set('light')
            document.body.classList.add($theme)
            document.body.classList.remove('dark')
            icon = 'material-symbols:dark-mode'
            localStorage.setItem('theme', 'light')
        } else {
            theme.set('dark')
            document.body.classList.add($theme)
            document.body.classList.remove('light')
            icon = 'material-symbols:light-mode'
            localStorage.setItem('theme', 'dark')
        }
    }
</script>

<header>
    <h1><a href="/" use:link tabindex="0">Blog</a></h1>
    <button on:click={toggleTheme}><Icon {icon} /></button>
</header>

<style>
    header {
        padding: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    a {
        text-decoration: none;
    }

    button {
        border: 0;
        background-color: inherit;
        font-size: 2rem;
        cursor: pointer;
    }
</style>