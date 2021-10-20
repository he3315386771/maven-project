/**
 * 
 */
package util;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ParseUtil {
	private ParseUtil(){}
	private static final DateFormat[] ACCEPT_DATE_FORMATS = {
			new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"),
			new SimpleDateFormat("yyyy-MM-dd HH:mm"),
			new SimpleDateFormat("yyyy-MM-dd"),
			new SimpleDateFormat("yyyy-MM"),
			new SimpleDateFormat("yyyy/MM/dd HH:mm:ss"),
			new SimpleDateFormat("yyyy/MM/dd HH:mm"),
			new SimpleDateFormat("yyyy/MM/dd"),
			new SimpleDateFormat("yyyy/MM"),
			new SimpleDateFormat("dd/MM/yyyy"),
			new SimpleDateFormat("yyyyMMdd")
	};

	public static Boolean toBoolean(final String s) {
		try {
			return Boolean.valueOf(s);
		} catch (Exception e) {
			return null;
		}
	}

	public static Byte toByte(final String s) {
		try {
			return Byte.valueOf(s);
		} catch (Exception e) {
			return null;
		}

	}

	public static String toString(final String s) {
		return s;
	}

	public static Integer toInteger(final String s) {
		try {
			return Integer.valueOf(s);
		} catch (Exception e) {
			return null;
		}
	}

	public static Long toLong(final String s) {

		try {
			return Long.valueOf(s);
		} catch (Exception e) {
			return null;
		}
	}

	public static Float toFloat(final String s) {
		try {
			return Float.valueOf(s);
		} catch (Exception e) {
			return null;
		}
	}

	public static Double toDouble(final String s) {
		try {
			return Double.valueOf(s);
		} catch (Exception e) {
			return null;
		}
	}

	public static Short toShort(final String s) {
		try {
			return Short.valueOf(s);
		} catch (Exception e) {
			return null;
		}
	}

	public static Date toDate(final String s) {
		for (DateFormat format : ACCEPT_DATE_FORMATS) {
			try {
				return format.parse(s);
			} catch (Exception e) {
				continue;
			}
		}
		return null;
	}

	public static BigDecimal toBigDecimal(final String s) {
		try {
			return new BigDecimal(s);
		} catch (Exception e) {
			return null;
		}
	}
}
