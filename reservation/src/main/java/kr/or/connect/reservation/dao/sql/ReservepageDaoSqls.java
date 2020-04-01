package kr.or.connect.reservation.dao.sql;

public class ReservepageDaoSqls {
	public static final String SELECT_DISPLAY_INFO = "SELECT date_add(curdate(),INTERVAL CAST(RAND() * 4 AS SIGNED) + 1 DAY) resrv_date, prod.description, di.place_name, di.place_lot, di.place_street, di.tel, di.opening_hours, di.opening_term, fi.save_file_name"
			+ " FROM display_info di, product prod, file_info fi WHERE di.id = :displayInfoId and di.product_id = prod.id"
			+ " and fi.id in (select pi.file_id from product_image pi where product_id = :productId and pi.type = \"ma\")";

	public static final String SELECT_PRODUCT_PRICE_INFO = "SELECT price_type_name, price, discount_rate FROM product_price WHERE product_id = :productId";
}
