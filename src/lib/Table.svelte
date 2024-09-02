<script>
    import { is_user_logged_in, table_data, error_msg } from "../store"

    
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
                        <td style="color: rgb(233, 233, 233); padding-left: 2%; width: 5%"
                            >{product.id}</td
                        >
                        <td style="color: rgba(198,245,248,255); padding-left: 20px;"
                            >{product.title}</td
                        >
                        <td style="color: rgb(233, 233, 233); padding-left: 10px;"
                            >{product.description}</td
                        >
                        <td style="color: rgb(233, 233, 233); padding: 60px"
                            >${product.price}</td
                        >
                        <td style="color: rgb(233, 233, 233); padding-left: 70px"
                            >{product.rating_rate} <br /> ({product
                                .rating_count})</td
                        >
                        <td>
                            <img
                                src={product.img_url}
                                alt=""
                                style="width:60px; height:60px; padding-left: 30px"
                            />
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td style="color: rgb(233, 233, 233); padding: 2%"></td>
                        <td style="color: rgba(198,245,248,255); padding-left: 20px;"
                            ></td
                        >
                        <td style="color: rgb(233, 233, 233); padding-left: 10px;"
                            ></td
                        >
                        <td style="color: rgb(233, 233, 233); padding: 60px"></td>
                        <td style="color: rgb(233, 233, 233); padding-left: 70px"
                            ></td
                        >
                        <td>
                            <img
                                src="#"
                                alt="Error in fetching image"
                                style="width:60px; height:60px; padding-left: 30px"
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
</style>