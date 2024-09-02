import { writable } from "svelte/store";

export const records_per_page = writable(10);
export const total_records = writable(10);
export const page_number = writable(1);
export const max_page = writable(4);
export const is_user_logged_in = writable(false);
export const table_data = writable([]);
export const error_msg = writable("");
