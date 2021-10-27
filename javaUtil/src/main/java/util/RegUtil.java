package util;

import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegUtil {
	private RegUtil(){}

	public static final String REG_NUMBER = "^[-\\+]?\\d+(\\.\\d+)?$";
	/**
	 * 正则验证
	 * @param chars
	 * @param regex
	 * @return
	 */
	public static boolean test(String chars,String regex){
		if(StringUtils.isBlank(chars) || StringUtils.isBlank(regex)){
            return false;
        }
        return match(regex,chars);
	}

	private static boolean match(String regex, String str) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}

	public static String getReg(String str, String reg) {
		if (StringUtils.isBlank(str) || StringUtils.isBlank(reg)) {
			return "";
		}
		Pattern p = Pattern.compile(reg);
		Matcher m = p.matcher(str);
		if (m.find()) {
			return m.group(1);
		}
		return "";
	}

	/**
	 * 验证是否为数字
	 * @param str
	 * @return
	 */
	public static boolean isNumber(String str){
		if(StringUtils.isEmpty(str)){
			return false;
		}
		return test(str,REG_NUMBER);
	}

}
