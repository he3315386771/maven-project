package com.yyt.ecard.common.util.zidingyi;

import com.google.gson.annotations.SerializedName;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 对象COPY (浅COPY)
 */
public class BeanUtil {
    private BeanUtil(){}
    /** Bean方法名中属性名开始的下标 */
    private static final int BEAN_METHOD_PROP_INDEX = 3;

    /** * 匹配getter方法的正则表达式 */
    private static final Pattern GET_PATTERN = Pattern.compile("get(\\p{javaUpperCase}\\w*)");

    /** * 匹配setter方法的正则表达式 */
    private static final Pattern SET_PATTERN = Pattern.compile("set(\\p{javaUpperCase}\\w*)");

    /**
     * Bean属性复制工具方法。
     * @param dest 目标对象
     * @param src  源对象
     */
    public static void copyBeanProp(Object dest, Object src) {
        List<Method> destSetters = getSetterMethods(dest);
        List<Method> srcGetters = getGetterMethods(src);
        try {
            for (Method setter : destSetters) {
                for (Method getter : srcGetters) {
                    if (isMethodPropEquals(setter.getName(), getter.getName())
                            && setter.getParameterTypes()[0].equals(getter.getReturnType())) {
                        setter.invoke(dest, getter.invoke(src));
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取对象的setter方法
     * @param obj  对象
     * @return     对象的setter方法列表
     */
    public static List<Method> getSetterMethods(Object obj) {
        // setter方法列表
        List<Method> setterMethods = new ArrayList<Method>();
        // 获取所有方法
        Set<Method> methods = getAllMethods(obj.getClass(),null);
        // 查找setter方法
        for (Method method : methods) {
            Matcher m = SET_PATTERN.matcher(method.getName());
            if (m.matches() && (method.getParameterTypes().length == 1)) {
                setterMethods.add(method);
            }
        }
        return setterMethods;
    }

    /**
     * 获取对象的getter方法。
     * @param obj  对象
     * @return     对象的getter方法列表
     */
    public static List<Method> getGetterMethods(Object obj) {
        // getter方法列表
        List<Method> getterMethods = new ArrayList<Method>();
        // 获取所有方法
        Set<Method> methods = getAllMethods(obj.getClass(),null);
        // 查找getter方法
        for (Method method : methods) {
            Matcher m = GET_PATTERN.matcher(method.getName());
            if (m.matches() && (method.getParameterTypes().length == 0)) {
                getterMethods.add(method);
            }
        }
        // 返回getter方法列表
        return getterMethods;
    }

    /**
     *
     * @param clazz 类型
     * @param ms 方法集合
     * @return 获取所有方法集合(包括父级)
     */
    public static Set<Method> getAllMethods(Class clazz,Set<Method> ms){
        if(ms==null){
            ms = new HashSet<>();
        }
        if(clazz.getSuperclass()!=null){
            getAllMethods(clazz.getSuperclass(),ms);
        }
        ms.addAll(Arrays.asList(clazz.getMethods()));
        return ms;
    }

    /**
     * 检查Bean方法名中的属性名是否相等。<br>
     * 如getName()和setName()属性名一样，getName()和setAge()属性名不一样。
     * @param m1 方法名1
     * @param m2 方法名2
     * @return 属性名一样返回true，否则返回false
     */
    public static boolean isMethodPropEquals(String m1, String m2) {
        return m1.substring(BEAN_METHOD_PROP_INDEX).equals(m2.substring(BEAN_METHOD_PROP_INDEX));
    }

    public static void copyBean(Object dest,Object src){
        if(src==null || dest==null){
            return;
        }
        Map<String,Field> destFields = getFields(dest.getClass(),null);
        Map<String,Field> srcFields = getFields(src.getClass(),null);
        Set<Map.Entry<String, Field>> entries = srcFields.entrySet();
        try{
            for (Map.Entry<String, Field> entry : entries){
                Field srcField = entry.getValue();
                srcField.setAccessible(true);
                if(srcField.get(src) == null){
                    continue;
                }
                Field destField = destFields.get(entry.getKey());
                if(destField!=null){
                    destField.setAccessible(true);
                    try{
                        switch (destField.getType().getName()){
                            case "java.lang.String":
                                destField.set(dest,String.valueOf(srcField.get(src)));
                                break;
                            case "java.lang.Integer":
                                destField.set(dest,Integer.parseInt(srcField.get(src).toString()));
                                break;
                            case "java.util.Date":
                                destField.set(dest,ParseUtil.toDate(srcField.get(src).toString()));
                                break;
                            default:
                                destField.set(dest,srcField.get(src));
                        }
                    }catch (Exception e){
                        System.out.println(destField.getName()+"#"+srcField.get(src));
                    }
                }
            }
        }catch (Exception e){

        }
    }
    private static Map<String,Field> getFields(Class clazz, Map<String,Field> Fields){
        if(Fields==null){
            Fields = new HashMap<>();
        }
        if(clazz.getSuperclass()!=null){
            getFields(clazz.getSuperclass(),Fields);
        }
        for(Field field : clazz.getDeclaredFields()){
            String key=field.getName();
            SerializedName sNAn = field.getAnnotation(SerializedName.class);
            if(sNAn!=null){
                key = sNAn.value();
            }
            Fields.put(key,field);
        }
        return Fields;
    }
}
