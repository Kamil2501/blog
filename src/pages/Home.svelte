<script>
    import { Link } from 'svelte-routing'
    import { getContext, onMount } from 'svelte'

    const strapi = getContext('strapi');

    let posts = [];

    onMount(async () => {
        try {
            const strapiPosts = await $strapi.findMany('posts')
            posts = [...strapiPosts].reverse()
        } catch (e) {
            console.log(e)
        }
    })
</script>

{#each posts as post (post.id)}
    {@const {url, alt} = $strapi.getImage(post, 'main_image')}
    {@const date = new Date(post.attributes.createdAt)}
    {@const formatedDate = new Intl.DateTimeFormat(['pl', 'id']).format(date)}
    <article class="post">
        <img src={url} {alt}>
        <section class="post-content">
            <h2>{post.attributes.title}</h2>
            <p class="created-at">{formatedDate}</p>
            <Link to={`/post/${post.id}`}>Czytaj więcej</Link>
        </section>
    </article>
    {:else}
        <p class="loading">...loading</p>
{/each}

<style>
    .post {
        width: 80%;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        box-shadow: 0.5rem 0.5rem 1.5rem 0px #42445a;
    }

    :global(.dark .post) {
        box-shadow: 0.5rem 0.5rem 1.5rem 0px #000000;
    }

    img {
        aspect-ratio: 2.5/1;
    }

    .post-content {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 1.5rem;
    }

    .created-at {
        color: #888;
    }

    @media (min-width: 500px) {
        .post {
            width: 60%;
        }
    }
</style>