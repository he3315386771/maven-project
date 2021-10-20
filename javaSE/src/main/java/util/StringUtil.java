package util;


import org.apache.commons.lang3.StringUtils;

import java.util.regex.Pattern;

public class StringUtil extends StringUtils {
    private StringUtil(){}
    public static boolean isNumber(String str){
        if(StringUtils.isEmpty(str)){
            return false;
        }
        Pattern pattern = Pattern.compile("^[-\\+]?\\d+(\\.\\d+)?$");
        return pattern.matcher(str).matches();
    }
}
