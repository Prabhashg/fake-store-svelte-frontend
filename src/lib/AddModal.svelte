<script>
    import { fetchProducts, is_user_logged_in } from "../store"
    import { push } from "svelte-spa-router";

    export let onClose

    let id
    let title
    let description
    let price
    let rating_rate
    let rating_count
    let img_url

    const save = async () => {
        try {

            if (!id                 ||
                !title              ||
                !description        ||
                !rating_rate        ||
                !rating_count       ||
                !price              ||
                !img_url ) 
            {
                return alert("All Fields Required")
            }

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
                fetchProducts();
                alert("Product Added Successfully")
            } else {
                if (response.status === 400) {
                    alert(`Product with id: ${id} already exists`)
                } else {
                    document.cookie = "SID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None"
                    is_user_logged_in.set(false)
                    push("/")
                }
            }
        } catch (error) {
            console.error("Error while adding product:", error)
            alert("An error occurred while adding the product.")
        }
        close()
    }

    const close = () => {
        onClose()
    }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" on:click|self={close}>
    <div class="modal-content">
        <h2>Add New Product</h2>
        <form>
            <div class="form-container">
                <div class="form-row">
                    <div class="form-col" id="id-input">
                        <div class="item" >
                            <label for="id">Id:</label>
                        </div>
                        <div>
                            <input type="text" name="id" id="id" bind:value={id} >
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="item">
                            <label for="titel">Title:</label>
                        </div>
                        <div class="item">
                            <input type="text" bind:value={title} />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <div class="item">
                            <label for="description">Desc:</label>
                        </div>
                        <div class="item">
                            <textarea bind:value={description} ></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <div class="item">
                            <label for="rating_rate">Rating:</label>
                        </div>
                        <div class="item">
                            <input type="number" min="1" max="5" bind:value={rating_rate} />
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="item">
                            <label for="rating_count">Count:</label>
                        </div>
                        <div class="item">
                            <input type="number" bind:value={rating_count} />
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="item">
                            <label for="price">Price:</label>
                        </div>
                        <div class="item">
                            <input type="number" bind:value={price}>
                        </div>
                    </div>
                    
                </div>
                <div class="form-row">
                    <div class="form-col" id="url-input">
                        <div class="item">
                            <label for="img_url">Image URL:</label>
                        </div>
                        <div class="item">
                            <input type="text" bind:value={img_url} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" on:click|preventDefault={save}>Save</button>
                <button type="button" on:click={close}>Cancel</button>
            </div>
        </form>
    </div>
</div>


<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
    }

    .form-row {
        display: flex;
        gap: 8px;
        justify-content: space-between;
    }

    .form-col {
        display: flex;
        gap: 5px;
        justify-content: stretch;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.9;
    }

    .form-container input {
        width: 108px;
    }

    textarea {
        width: 454px;
        height: 75px;
    }

    #id-input input {
        width: 30px;
    }

    #url-input input {
        width: 406px;
    }

</style>