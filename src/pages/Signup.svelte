<script>
    import Header from "../lib/Header.svelte";
    import { push } from "svelte-spa-router";
    import { error_msg } from "../store";

    let name;
    let email;
    let password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = "http://localhost:8080/api/v1/users/signup";

        if(!name || 
            !email ||
            !password
        ) {
            alert("All fields required")
        } else {
            const response = await fetch(url, {
                    method : "POST", 
                    headers : {
                        "Content-Type" : "application/json"
                    }, 
                    body : JSON.stringify({
                        name,
                        email,
                        password
                    }),
                    credentials: "include"
                }).then(res => res.json())
                    .catch(err => {
                        console.log(err)
                    })
            try {
                alert(response.message)
            } catch (error) {
                error_msg.set("CONNECTION_REFUSED")
                push("/error")
            }
            

        }

        document.getElementsByTagName('form')[0].reset();
    }
</script>

<main>
    <div class="outer">
        <Header />
        <form>
            <div class="container">
                <input type="text" name="name" placeholder="Name" bind:value={name}>
                <input type="email" name="email" placeholder="Email" bind:value={email}>
                <input type="text" name="password" placeholder="Password" bind:value={password}>
                <button on:click={handleSubmit}>Sign Up</button>
            </div>
        </form>
    </div>
    
</main>

<style>
    .outer{
        width: 80%;
        margin: auto;
    }

    .container{
        display: flex;
        flex-direction: column;
    
        justify-content: space-around;
        width: 18%;
        height: 40vh;
        margin-left: 41%;
        margin-top: 10vh;
        padding: 25px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: rgb(10, 10, 10);
        box-shadow: 5px 5px 15px rgb(100, 100, 100);

    }

    input{
        height: 30px;
        border-radius: 8px;
        text-align: center;
    }

    button{
        cursor: pointer;
        background-color: rgb(180, 180, 180);
        /* color: white; */
        font-weight: 600;
        height: 35px;
        border-radius: 8px;
    }
</style>