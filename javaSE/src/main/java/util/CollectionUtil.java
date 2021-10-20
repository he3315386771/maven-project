package util;

import org.apache.commons.collections.CollectionUtils;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CollectionUtil extends CollectionUtils {
    private CollectionUtil(){}

    /**
     * 数组转集合
     * @param array
     * @param <T>
     * @return
     */
    public static <T> List<T> toList(T[] array){
        return toList(array,false);
    }

    /**
     * 数组转集合
     * @param array
     * @param flag true->集合不可增删 false->数组可增删
     * @param <T>
     * @return
     */
    public static <T> List<T> toList(T[] array,boolean flag){
        if(flag){
            return Arrays.asList(array);
        }else{
            return new ArrayList(Arrays.asList(array));
        }
    }
}
