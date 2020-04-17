package kr.or.connect.reservation.dao.sql;

public class MainpageDaoSqls {
	public static final String SELECT_PROMOTIONS = "SELECT IFNULL(CONCAT('./resources/',fi.save_file_name) ,'') AS save_file_name FROM file_info fi, promotion pr WHERE fi.id "
			+ "IN (SELECT pi.file_id FROM product_image pi WHERE pi.product_id = pr.product_id AND pi.type = \"th\") ORDER BY rand()";

	public static final String SELECT_CATEGORY = "SELECT category.id, category.name FROM category";

	public static final String SELECT_ALL_PRODUCTS = "SELECT  product.id, display.id AS display_info_id, product.description, display.place_name, product.content, IFNULL(CONCAT('./resources/',fi.save_file_name) ,'') AS save_file_name"
			+ " FROM product, display_info display, file_info fi, product_image pi"
			+ " WHERE product.id = display.product_id AND pi.product_id = product.id AND pi.file_id = fi.id "
			+ " AND DATEDIFF(TRIM(SUBSTRING_INDEX(display.opening_term,'~', -1)), now())>=0"
			+ " GROUP BY display.id LIMIT :turn,:cnt";

	public static final String SELECT_PRODUCTS_BY_CATEGORY = "SELECT product.id, display.id AS display_info_id, product.description, display.place_name, product.content, IFNULL(CONCAT('./resources/',fi.save_file_name) ,'') AS save_file_name"
			+ " FROM product , display_info display, file_info fi, product_image pi"
			+ " WHERE product.id = display.product_id AND pi.product_id = product.id"
			+ " AND pi.file_id = fi.id AND product.category_id = :id"
			+ " AND DATEDIFF(TRIM(SUBSTRING_INDEX(display.opening_term,'~', -1)), now())>=0"
			+ " GROUP BY display.id ORDER BY product.id LIMIT :turn,:cnt";

	public static final String SELECT_ALL_PRODUCT_COUNT = "SELECT COUNT(*) FROM display_info display where DATEDIFF(TRIM(SUBSTRING_INDEX(display.opening_term,'~', -1)), now())>=0";

	public static final String SELECT_PRODUCT_COUNT_BY_CATEGORY = "SELECT COUNT(*) FROM category, product, display_info display"
			+ " WHERE category.id = :id AND category.id = product.category_id"
			+ " AND product.id = display.product_id AND DATEDIFF(TRIM(SUBSTRING_INDEX(display.opening_term,'~', -1)), now())>=0 GROUP BY product.category_id";
}
