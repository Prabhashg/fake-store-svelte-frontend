<script>
    import { push } from "svelte-spa-router"
    import { is_user_logged_in, page_number, records_per_page } from "../store"
    import { onMount } from "svelte";
    import Modal from "./Modal.svelte";

    let isModalOpen = false

    const handleHomeClick = () => {
        page_number.set(1)
        records_per_page.set(10)
        push('/')
    }

    const handleLoginClick = () => {
        push('/login')
    }

    const handleSignupClick = () => {
        push('/signup')
    }

    const handleAddProductClick = () => {
        isModalOpen = true
        
    }

    const closeAddModal = () => {
        isModalOpen = false
    }

    const handleLogoutClick = async () => {
        page_number.set(1)
        records_per_page.set(10)

        try {
            let url = "http://localhost:8080/api/v1/users/logout"
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            }).then(res => res.json())  

            if(response.status === 401){
                console.log(response.message)
                console.log("Clearing cookie from frontend")
                document.cookie = "SID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None"
                console.log("Cookie cleared")
            }

            
        } catch (error) {
            document.cookie = "SID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None"
            console.error(error)

        }

        is_user_logged_in.set(false)
        push("/")
    }

    const initiateHeader = async () => {
        if (document.cookie === "") is_user_logged_in.set(false)
        else is_user_logged_in.set(true)
    }

    onMount(initiateHeader)
</script>

<main>
    <div class="container">
        <div id="left-box">
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h1 on:click={handleHomeClick}>Fake Store</h1>
        </div>
        {#if !$is_user_logged_in}
            <div id="right-box">
                <button on:click={handleLoginClick}>Login</button>
                <button on:click={handleSignupClick}>Sign Up</button>
            </div>
        {:else}
            <div id="right-box">
                <button on:click={handleAddProductClick}>New Product</button>
                <button on:click={handleLogoutClick}>Logout</button>
            </div>
        {/if}
        
    </div>
    {#if isModalOpen}
        <Modal 
            product={null}
            onClose={closeAddModal}
            add_or_edit_string="Add"
            isIdDisabled={false}
        />
    {/if}

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
    }
</style>