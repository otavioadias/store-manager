SELECT
    date,
    product_id,
    quantity
FROM sales
    INNER JOIN sales_products AS sp ON sp.sale_id = sales.id
WHERE sale_id = 1
ORDER BY sale_id, product_id;