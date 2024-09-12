import { readable, writable, get } from "svelte/store";

export const records_per_page = writable(10);
export const total_records = writable(10);
export const page_number = writable(1);
export const max_page = writable(4);
export const is_user_logged_in = writable(false);
export const table_data = writable([]);
export const error_msg = writable("");

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

export const fetchProducts = async () => {    

    let baseURL = 'http://localhost:8080/api/v1/products'
        let params = {
            page: get(page_number),
            records: get(records_per_page)
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
                max_page.set(Math.ceil(get(total_records) / get(records_per_page)))
            } else {
                error_msg.set("Error in fetching data from server")
            }

            if(Object.keys(get(table_data)).length === 0){
                error_msg.set("No data available on server")
            } else {
                error_msg.set("")
            }
        } catch (error) {
            console.log(error)
        }       
}
