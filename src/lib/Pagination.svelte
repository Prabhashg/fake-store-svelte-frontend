<script>
    import { page_number, max_page } from "../store";
    
    const handleStartClick = () => {
        if($page_number > 1){
            page_number.set(1)
        }
    }

    const handlePreviousClick = () => {
        if($page_number > 1){
            page_number.update(val => val - 1)
        }
    }

    const handleNextClick = () => {
        if($page_number < $max_page){
            page_number.update(val => val + 1)
        }
    }

    const handleEndClick = () => {
        if($page_number < $max_page){
            page_number.set($max_page)
        }
    }
</script>

<main>
    <div class="container">
        <button on:click={handleStartClick}>Start</button>
        <button on:click={handlePreviousClick}> Prev </button>
        <input type="text" bind:value={$page_number} disabled>
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

     input:disabled{
        background-color: white;
     }
</style>