<script>
    import Header from "../lib/Header.svelte";
    import RecordsInput from "../lib/RecordsInput.svelte";
    import Pagination from "../lib/Pagination.svelte"
    import Table from "../lib/Table.svelte";
    import { is_user_logged_in } from "../store";
    // import AddProduct from "../lib/AddProduct.svelte";
    
</script>

<main>
    <div class="container">
        <Header />
        {#if $is_user_logged_in}
            <!-- <div class="product-form-container">
                <AddProduct />
            </div> -->
            <RecordsInput />
        {/if}
        <div class="table-container">
            <Table />
        </div>
        {#if $is_user_logged_in}
            <Pagination />
        {/if}
    </div>
</main>

<style>
    .container{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: auto;
    }

    /* .product-form-container{
        display: inline-block;
        width: 46%;
        min-width: 516px;
        margin: auto;
    } */

    .table-container{
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        margin-bottom: 20px;
    }
</style>