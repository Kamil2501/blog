<script>
    import { getContext } from "svelte";
    import { marked } from 'marked'
    export let id;

    const strapi = getContext('strapi')
</script>

{#await $strapi.findOne('posts', id)}
    <p class="loading">loading</p>
{:then post}
    {@const {url, alt} = $strapi.getImage(post, 'main_image')}
    {@const date = new Date(post?.attributes.createdAt)}
    {@const formatedDate = new Intl.DateTimeFormat(['pl', 'id']).format(date)}
    <article class="post-container">
        <img src={url} {alt} />
        <section class="post-info">
            <h2>{post.attributes.title}</h2>
            <p class="created-at">{formatedDate}</p>
            <div class="post-content">{@html marked(post.attributes.content)}</div>
        </section>
    </article>
{:catch error}
    <p class="error">{error.message}</p>
{/await}

<style>
    .post-container {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        justify-content: baseline;
    }
    
    .post-container > img {
        aspect-ratio: 2/1;
    }
    
    .created-at {
        color: #888;
    }
    
    .post-info {
        width: 80%;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        margin-top: 2rem;
    }

    .post-content {
        display: grid;
        row-gap: 1.5rem;
        margin-top: 1rem;
    }

    :global(ul) {
        margin-left: 2rem;
    }

    :global(li:has(ul)) {
        list-style: none;
    }

    @media (min-width: 500px) {
        .post-container > img {
            aspect-ratio: 2/0.5;
        }
    }
</style>