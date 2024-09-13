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
        <span>Page {$page_number} 0f {$max_page}</span>
        <button on:click={handleNextClick}>Next</button>
        <button on:click={handleEndClick}>End</button>
    </div>    
</main>

<style>
    .container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
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

    span{
        height: 28px;
        width: 100px;
        display: flex;
        align-items: center;
        margin: 0 1px;
        justify-content: center;
        background-color: rgba(70, 180, 100, 0.8);
        color: white;
        font-weight: 700;
        font-size: 16px;
    }
</style>