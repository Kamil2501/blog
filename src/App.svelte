<script>
  import { strapi, theme } from "./lib/store";
  import { setContext } from "svelte";
  import { Router, Route } from 'svelte-routing'
	import Home from "./pages/Home.svelte";
	import Post from "./pages/Post.svelte";
	import Header from "./components/Header.svelte";
  import { setDefaultTheme } from "./lib/useTheme";

  setDefaultTheme()
  setContext('strapi', strapi);

  document.body.classList.add($theme)
</script>

<Router>
  <div id="container">
    <Header {theme} />
    <main class="content">
      <Route path="/" component={Home} />
      <Route path="/post/:id" let:params>
        <Post id={params.id} />
      </Route>
    </main>
  </div>
</Router>