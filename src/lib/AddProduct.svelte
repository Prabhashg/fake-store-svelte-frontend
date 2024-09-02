<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let id;
    let title;
    let description;
    let rating_rate;
    let rating_count;
    let price;
    let img_url;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = "http://localhost:8080/api/v1/products/register"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({
                id,
                title,
                description,
                rating_rate,
                rating_count,  
                price,
                img_url
            }),

            credentials: "include"
        }).then(res => res.json())

        if (response.ok) {
            alert(response.message)
        } else {
            alert("Try again")
        }

        document.getElementsByTagName('form')[0].reset()
        dispatch("addProductSubmit")
    }
</script>

<form>
    <div class="container">
        <div class="row">
            <input type="text" name="id" placeholder="ID" bind:value={id}>
            <input type="text" name="title" placeholder="Title" bind:value={title}>
            <input type="text" name="description" placeholder="Description" bind:value={description}>
        </div>
        <div class="row">   
            <select name="rating_rate" bind:value={rating_rate}>
                <option value="none" selected>Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input type="text" name="rating_count" placeholder="rating count" bind:value={rating_count}>
            <input type="text" name="price" placeholder="Price" bind:value={price}>
        </div>
        <div class="row">
            <input type="text" name="img_url" placeholder="Image" bind:value={img_url}>
        </div>
        <div class="row">
            <button on:click={ handleSubmit }>Add Product</button>
        </div>
       
    </div>
</form>

        

<style>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .row{
        display: flex;
        width: 100%;
    }

    .row input, .row select, .row button {
            flex: 1;
            text-align: center;
    }

    button{
        margin-top: 15px;
        height: 30px;
        border-radius: 15px;
        background-color: rgba(70, 180, 100, 0.8);
        color: white;
        font-weight: 600;
    }

    button:hover{
        cursor: pointer;
        background-color: rgba(37, 97, 53, 0.9);
    }

    button:active{
        background-color: rgb(26, 65, 36);
    }
</style>