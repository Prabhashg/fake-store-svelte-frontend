<script>
    import { records_per_page } from "../store";

    let records_per_page_value

    records_per_page.subscribe(val => {
        records_per_page_value = val
    })

    const handleClick = () => {
        records_per_page.set(records_per_page_value)
    }
</script>

<main>
    <div class="outer">
        <div class="inner">
            <span>
                <label for="records" style="color: white;">Records</label>
                <input type="number" name="records" bind:value={records_per_page_value}>
            </span>
            <span>
                <button on:click={handleClick}>OK</button>
            </span>
            
        </div>
    </div>
</main>

<style>
    .inner{
        float: right;
        padding: 5px;
        font-size: medium;
    }

    button{
        background-color: rgba(70, 180, 100, 0.8);
        width: 60px;
        height: 30px;
        color: white;
        font-weight: 600;
    }

    button:hover{
        background-color: rgba(37, 97, 53, 0.9);
        cursor: pointer;
    }

    button:active{
        background-color: rgb(26, 65, 36);
    }

    input{
        width: 100px;
        height: 20px;
    }
</style>