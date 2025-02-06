export interface Purchase {
    id: number;
    user_id: number;
    product_id: number;
    price: number;
    purchased_at: Date;
}