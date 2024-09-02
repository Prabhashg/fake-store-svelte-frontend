<script>
    import Header from "../lib/Header.svelte";
    import RecordsInput from "../lib/RecordsInput.svelte";
    import Pagination from "../lib/Pagination.svelte"
    import Table from "../lib/Table.svelte";
    import AddProduct from "../lib/AddProduct.svelte";
    import { is_user_logged_in, table_data, records_per_page, page_number, total_records, error_msg, max_page } from "../store";
    import { onMount } from "svelte";

    let table_data_value
    let records_per_page_value
    let page_number_value

    table_data.subscribe((value) => {
        table_data_value = value
    });

    records_per_page.subscribe(val => {
        records_per_page_value = val
        
    })

    page_number.subscribe(val => {
        page_number_value = val
        
    })

    const fetchLength = async () => {
        const url = "http://localhost:8080/api/v1/products/length"

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            }).then(res => res.json())

            if(response.ok){
                total_records.set(response.data.length.count)
            }

        } catch (error) {
            console.log(error)
        }   
    }

    const fetchProducts = async () => {
    
        fetchLength();
        

        let baseURL = 'http://localhost:8080/api/v1/products'
        let params = {
            page: page_number_value,
            records: records_per_page_value
        }

        let url = new URL(baseURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            }).then(res => res.json())
    
            if(response.ok){
                table_data.set(response.data)
                max_page.set(Math.ceil($total_records / $records_per_page))
            } else {
                error_msg.set("Error in fetching data from server")
            }

            if(Object.keys(table_data_value).length === 0){
                error_msg.set("No data available on server")
            } else {
                error_msg.set("")
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    onMount(fetchLength)
    onMount(fetchProducts)
</script>

<main>
    <div class="container">
        <Header />
        {#if $is_user_logged_in}
            <div class="product-form-container">
                <AddProduct on:addProductSubmit={ fetchProducts }/>
            </div>
        {/if}
        <RecordsInput on:recordsPerPageSubmit={ fetchProducts } />
        <div class="table-container">
            <Table />
        </div>
        <Pagination on:pageChange={ fetchProducts } />
    </div>
</main>

<style>
    .container{
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: auto;
    }

    .product-form-container{
        display: inline-block;
        width: 46%;
        min-width: 516px;
        margin: auto;
    }

    .table-container{
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        margin-bottom: 20px;
    }
</style>