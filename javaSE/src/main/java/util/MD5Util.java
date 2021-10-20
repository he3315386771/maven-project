package util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Locale;

public class MD5Util {
	private MD5Util(){}

	/**
	 * 转换为大写Md5
	 * @param str
	 * @return
	 */
	public static String md5Uppper(String str) {
		String md5Str = md5(str);
		if(StringUtil.isNoneBlank(md5Str)){
			return md5(str).toUpperCase(Locale.getDefault());			
		}
		return null;
	}
	
	/**
	 * md5加密
	 * @param str
	 * @return
	 */
	public static String md5(String str) {
		return md5(str,true);
	}

	/**
	 * md5加密
	 * @param str
	 * @param flag true->32位  false->16位
	 * @return
	 */
	public static String md5(String str,boolean flag){
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(str.getBytes());
			byte[] byteDigest = md.digest();
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < byteDigest.length; offset++) {
				i = byteDigest[offset];
				if (i < 0){
					i += 256;
				}
				if (i < 16){
					buf.append("0");
				}
				buf.append(Integer.toHexString(i));
			}
			if(flag){
				// 32位加密
				return buf.toString();
			}else{
				// 16位的加密
				 return buf.toString().substring(8, 24);
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
	}
}
