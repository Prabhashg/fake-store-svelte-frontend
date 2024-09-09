import { readable, writable } from "svelte/store";

export const records_per_page = writable(10);
export const total_records = writable(10);
export const page_number = writable(1);
export const max_page = writable(4);
export const is_user_logged_in = writable(false);
export const table_data = writable([]);
export const error_msg = writable("");
export const selectedProductForUpdate = writable(null)

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
            total_records.set(response.data.length)
        }

    } catch (error) {
        console.log(error)
    }   
}

export const fetchProducts = readable(async () => {
    
    let page_number_value
    let records_per_page_value
    let total_records_value
    let table_data_value

    const unsubscribePageNumber = page_number.subscribe(val => {
        page_number_value = val
    })

    const unsubscribeRPP = records_per_page.subscribe(val => {
        records_per_page_value = val
    })

    const unsubscribeTotalRecords = total_records.subscribe(val => {
        total_records_value = val
    })

    const unsubscribeTableData = table_data.subscribe(val => {
        table_data_value = val
    })
    

    let baseURL = 'http://localhost:8080/api/v1/products'
        let params = {
            page: page_number_value,
            records: records_per_page_value
        }

        let url = new URL(baseURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        try {
            fetchLength();
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            }).then(res => res.json())
    
            if(response.ok){
                table_data.set(response.data)
                max_page.set(Math.ceil(total_records_value / records_per_page_value))
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

        unsubscribePageNumber()
        unsubscribeRPP()
        unsubscribeTableData()
        unsubscribeTotalRecords()
})
