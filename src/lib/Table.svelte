<script>
    import { is_user_logged_in, table_data, error_msg, page_number, records_per_page, fetchProducts } from "../store"
    import Modal from "./Modal.svelte";

    let productToEdit = null
    let isModalOpen = false

    const openEditModal = (product) => {
        productToEdit = product
        isModalOpen = true
    };

    const closeEditModal = () => {
        productToEdit = null
        isModalOpen = false
    };

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
                    fetchProducts()
                } else {
                    alert("Something Went Wrong")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    $: $records_per_page, $page_number, fetchProducts();
</script>

<main>
    { #if $is_user_logged_in }
        <table id="myTable">
            <colgroup>
                <col style="width: 8%;">
                <col style="width: 10%;">
                <col style="width: 32%;">
                <col style="width: 10%;">
                <col style="width: 10%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr id="heading">
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="products">
                { #each $table_data as product (product.product_id) }
                    <tr>
                        <td>{product.product_id}</td>
                        <td style="color: rgba(198,245,248,255); text-align: left">{product.title}</td>
                        <td style="text-align: left;">{product.description}</td>
                        <td>${product.price}</td>
                        <td>{product.rating_rate} <br /> ({product.rating_count})</td>
                        <td>
                            <img
                                src={product.image_url}
                                alt=""
                                style="width: 60px; height: 60px;"
                            />                            
                        </td>
                        <td>
                            <div class="delete-edit">
                                <button class="delete-btn" on:click={() => deleteProduct(product.product_id)}>
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button class="edit-btn" on:click={() => openEditModal(product)}>
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
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
                                src={"#"}
                                alt="Error in fetching"
                                style="width:60px; height:60px;"
                            />
                        </td>
                        <td></td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <p style="color: white; width: 80%; margin: 10px auto">{$error_msg}</p>
    {:else}
        <p style="color: white; font-weight: 700; text-align: center; height: 40vh">Please login to continue</p>
    {/if}

    { #if isModalOpen}
        <Modal
            product={productToEdit}
            onClose={closeEditModal}
            add_or_edit_string="Edit"
            isIdDisabled={true}
        />  
    {/if}
</main>


<style>
    main{
        display: flex;
        flex-direction: column;

    }

    table {
        table-layout: fixed;
        border: 1px solid rgba(50, 50, 50, 255);
        border-radius: 20px 20px 0 0;
        border-collapse: collapse;
    }

    td, th {
        border-top: 1px solid rgba(50, 50, 50, 255);
        text-align: center;
    }

    td{
        color: rgb(233, 233, 233);
        height: 20px;
    }

    th {
        background-color: rgba(50, 50, 50, 255);
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

    tr {
        padding: 6px;
        margin: 10px 0;
    }

    .delete-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: red;
    }

    .delete-btn:hover {
        color: darkred;
    }

    .edit-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: #4A90E2;
    }

    .edit-btn:hover {
        cursor: pointer;
        color: #357ABD;
    }
</style>