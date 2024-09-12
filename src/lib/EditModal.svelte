<script>
    import { fetchProducts, is_user_logged_in } from "../store"
    import { push } from "svelte-spa-router";

    export let onClose
    export let product


    let id = product.product_id || ''
    let title = product.title || ''
    let description = product.description || ''
    let price = product.price || ''
    let rating_rate = product.rating_rate || ''
    let rating_count = product.rating_count || ''
    let image_url = product.image_url || ''

    const save = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/products/${product.product_id}`,{
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    title,
                    description,
                    rating_rate,
                    rating_count,
                    price,
                    img_url: image_url
                }),
                credentials: "include"
            }).then(res => res.json()).catch(err => console.log("Error occured while updating: ", err))

            if(!response.ok){
                if(response.status === 401){
                    is_user_logged_in.set(false)
                    push('/')
                } else {
                    alert("Something went wrong")
                }
            } else {
                await fetchProducts()
                alert("Product updated successfully")
            }
        } catch (error) {
            console.error("Update error:", error)
            alert("An error occurred while updating the product.")
        }
        close()
    }

    const close = () => {
        onClose();
    }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" on:click|self={close}>
    <div class="modal-content">
        <h2>Edit Product</h2>
        <form>
            <div class="form-container">
                <div class="form-row">
                    <div class="form-col" id="id-input">
                        <div class="item" >
                            <label for="id">Id:</label>
                        </div>
                        <div>
                            <input type="text" name="id" id="id" value={id} disabled>
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
                            <input type="number" step="0.1" bind:value={rating_rate} />
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
                            <input type="text" bind:value={image_url} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" on:click={save}>Save</button>
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