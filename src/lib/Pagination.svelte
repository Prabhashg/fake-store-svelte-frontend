<script>

    import { page_number, max_page } from "../store";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let page_nubmer_value;

    page_number.subscribe((val) => {
        page_nubmer_value = val;
    })
    

    const handleStartClick = () => {
        if(page_nubmer_value > 1){
            page_number.set(1)
            dispatch("pageChange")
        }
    }

    const handlePreviousClick = () => {
        if(page_nubmer_value > 1){
            page_number.update(val => val - 1)
            dispatch("pageChange")
        }
    }

    const handleNextClick = () => {
        if(page_nubmer_value < $max_page){
            page_number.update(val => val + 1)
            dispatch("pageChange")
        }
    }

    const handleEndClick = () => {
        if(page_nubmer_value < $max_page){
            page_number.set($max_page)
            dispatch("pageChange")
        }
    }
</script>

<main>
    <div class="container">
        <button on:click={handleStartClick}>Start</button>
        <button on:click={handlePreviousClick}> Prev </button>
        <input type="text" bind:value={page_nubmer_value}>
        <button on:click={handleNextClick}>Next</button>
        <button on:click={handleEndClick}>End</button>
    </div>    
</main>

<style>
    .container{
        display: flex;
        justify-content: flex-end;
    }

    button{
        background-color: rgba(70, 180, 100, 0.8);
        width: 60px;
        height: 30px;
        color: white;
        font-weight: 700;
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
        height: 23px;
    }
</style>