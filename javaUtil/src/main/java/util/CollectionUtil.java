package util;

import org.apache.commons.collections.CollectionUtils;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@SuppressWarnings("unchecked")
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

    /**
     * 去重
     * @param list
     * @param keyExtractors
     * @param <T>
     * @return
     */
    public static <T> List<T> distinct(List<T> list, Function<? super T, Object>... keyExtractors){
        return list.stream().filter(distinctByKey(keyExtractors)).collect(Collectors.toList());
    }

    private static <T> Predicate<T> distinctByKey(Function<? super T, Object>... keyExtractors) {
        if(keyExtractors==null || keyExtractors.length==0){
            Set<Object> seen = ConcurrentHashMap.newKeySet();
            return t -> seen.add(t);
        }
        List<List<Object>> lists = new ArrayList<>(keyExtractors.length);
        for(int i = 0 ;i<keyExtractors.length; i++){
            lists.add(new ArrayList<>());
        }
        return t -> {
            Boolean flag=true;
            Set<Integer> set = new HashSet<>();
            for(int i = 0 ;i<lists.get(0).size(); i++){
                set.add(i);
            }
            for(int i =0 ;i<keyExtractors.length;i++){
                Boolean flag2=true;
                Iterator<Integer> setI = set.iterator();
                while(setI.hasNext()){
                    int j = setI.next();
                    if(i==keyExtractors.length-1){
                        if(Objects.equals(lists.get(i).get(j),keyExtractors[i].apply(t))){
                            flag=false;
                            break;
                        }
                    }else{
                        if((!Objects.equals(lists.get(i).get(j),keyExtractors[i].apply(t)))){
                            setI.remove();
                        }else{
                            flag2 = false;
                        }
                    }
                }
                if(flag2 || !flag){
                    break;
                }
            }
            if(flag){
                for(int i =0 ;i<keyExtractors.length;i++){
                    lists.get(i).add(keyExtractors[i].apply(t));
                }
            }
            return flag;
        };
    }
}
