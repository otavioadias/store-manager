SELECT sale_id, date, product_id, quantity FROM sales
INNER JOIN sales_products AS sp ON sp.sale_id = sales.id
ORDER BY sale_id, product_id;