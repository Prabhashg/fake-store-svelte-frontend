<script>
    import Header from "../lib/Header.svelte";
    import { error_msg } from "../store.js"
    
</script>

<main>
    <div class="container">
        <Header />
        <p>{$error_msg}</p>
    </div>
</main>

<style>
    p{
        color: white;
        font-weight: 700;
        font-size: large;
    }

    .container{
        width: 90%;
        margin: auto;
    }
</style>