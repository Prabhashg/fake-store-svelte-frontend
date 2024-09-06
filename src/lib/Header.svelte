<script>
    import { push } from "svelte-spa-router"
    import { is_user_logged_in, page_number, records_per_page } from "../store"
    import { onMount } from "svelte";

    const handleHome = () => {
        push('/')
    }

    const handleLogin = () => {
        push('/login')
    }

    const handleSignup = () => {
        push('/signup')
    }

    const handleLogout = async () => {
        page_number.set(1)
        records_per_page.set(10)

        let url = "http://localhost:8080/api/v1/users/logout"
        await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include"
        }).then(res => res.json())

        is_user_logged_in.set(false)
        push("/")
    }

    const initiateHeader = async () => {
        if (document.cookie === "" || document.cookie.SID === "") is_user_logged_in.set(false)
        else is_user_logged_in.set(true)
    }

    onMount(initiateHeader)
</script>

<main>
    <div class="container">
        <div id="left-box">
            <h1 on:click={handleHome}>Fake Store</h1>
        </div>
        {#if !$is_user_logged_in}
            <div id="right-box">
                <button on:click={handleLogin}>Login</button>
                <button on:click={handleSignup}>Sign Up</button>
            </div>
        {:else}
            <div id="right-box">
                <button on:click={handleLogout}>Logout</button>
            </div>
        {/if}
        
    </div>

</main>

<style>
    .container{
        display: flex;
        justify-content: space-between;

    }

    #left-box{
        color: white;
        cursor: pointer;
    }

    #right-box{
        display: flex;
        gap: 20px;
        justify-content: space-around;
        align-items: center;
        
    }

    button{
        width: 80px;
        height: 40px;
        border-radius: 5px;
        background-color: rgba(70, 180, 100, 0.8);
        color: white;
        font-weight: 600;
        cursor: pointer;
    }

    button:hover{
        background-color: rgba(37, 97, 53, 0.9);
    }

    button:active{
        background-color: rgb(26, 65, 36);
        width: 76px;
        height: 38px;
    }
</style>