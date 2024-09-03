<script>
    import { is_user_logged_in, table_data, error_msg, page_number, records_per_page, fetchProducts } from "../store"
    import { onMount } from "svelte";

    $: dependencyVar = $page_number + " " + $records_per_page
    $: dependencyVar, $fetchProducts();

    const deleteProduct = async (productId) => {
        const confirm_delete = confirm("Do you really want to delete?")

        if (confirm_delete) {
            const url = `http://localhost:8080/api/v1/products/${productId}`

            try {
                const response = await fetch(url, {
                    method: "DELETE",
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    credentials: "include"
        
                }).then(res => res.json())

                if(response.ok){
                    $fetchProducts()
                    alert("Product deleted successfully")
                } else {
                    alert("Something went wrong")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    onMount($fetchProducts)
</script>

<main>
    {#if $is_user_logged_in}
        <table>
            <thead>
                <tr id="heading">
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody id="products">
                {#each $table_data as product}
                    <tr>
                        <td>{product.id}</td>
                        <td style="color: rgba(198,245,248,255);">{product.title}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td>{product.rating_rate} <br /> ({product.rating_count})</td>
                        <td>
                            <img
                                src={product.img_url}
                                alt=""
                                style="width: 60px; height: 60px;"
                            />
                            <button on:click={() => {
                                deleteProduct(product.id)
                            }}>Delete</button>
                            
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td></td>
                        <td style="color: rgba(198,245,248,255);"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <img
                                src="#"
                                alt="Error in fetching"
                                style="width:60px; height:60px;"
                            />
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <p style="color: white; width: 90%; margin: 10px auto">{$error_msg}</p>
    {:else}
        <p style="color: white; font-weight: 700; text-align: center; height: 40vh">Please login to continue</p>
    {/if}
</main>



<style>
    main{
        display: flex;
        flex-direction: column;

    }

    table {
        border: 1px solid rgba(50, 50, 50, 255);
        border-radius: 20px 20px 0 0;
    }

    td,
    th {
        border-top: 1px solid rgba(50, 50, 50, 255);
        text-align: center;
    }

    td{
        color: rgb(233, 233, 233)
    }

    th {
        background-color: rgba(38, 38, 38, 255);
        /* border-top: none; */
        color: rgba(161, 161, 161, 255);
        height: 10vh;
    }

    th:first-child {
        border-radius: 20px 0px 0px 0px;
    }

    th:last-child {
        border-radius: 0px 20px 0px 0px;
    }

    button{
        position: relative;
        left: 190px;
        bottom: 23px;
        background-color: #d11a2a;
        height: 28px;
        border-radius: 4px;
        color: white;
        font-weight: 600;
        box-shadow: 2px 2px 4px rgb(50, 50, 50);
        cursor: pointer;
    }

    img{
        position: relative;
        top: 6px;
        left: 30px;
    }
</style>