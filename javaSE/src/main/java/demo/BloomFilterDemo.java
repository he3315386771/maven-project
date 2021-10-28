package demo;

import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;
import entity.User;
import enums.ObjectFunnel;

import java.util.*;

public class BloomFilterDemo {
    private final static int SIZE = 10000000;
    public static void main(String[] args) throws Exception {
        test01();//bloomFilter<Integer>  快
        test02();//List<Integer>  巨慢
//        test03();//bloomFilter<User> 快
//        test04();//Set<User>  巨快
//        test05(); //Set<Integer>  巨快
    }
    public static void test01() throws Exception{
        BloomFilter<Integer> bloomFilter = BloomFilter.create(Funnels.integerFunnel(), SIZE);
        for (int i = 0; i < SIZE; i++) {
            bloomFilter.put(i);
        }
        Long l1 = System.currentTimeMillis();
        for (int i = 0; i < SIZE; i++) {
            if (!bloomFilter.mightContain(i)) {
                System.out.println("有坏人逃脱了");
            }
        }
        Long l2 = System.currentTimeMillis();
        System.out.println(l2-l1);

        List<Integer> list = new ArrayList<Integer>(1000);
        for (int i = SIZE + 10000; i < SIZE + 20000; i++) {
            if (bloomFilter.mightContain(i)) {
                list.add(i);
            }
        }
        System.out.println("有误伤的数量：" + list.size());
    }
    public static void test02() throws Exception{
        Set<Integer> all = new HashSet<>(SIZE);
        for (int i = 0; i < SIZE; i++) {
            all.add(i);
        }
        Long l1 = System.currentTimeMillis();
        for (int i = 0; i < SIZE; i++) {
            if (!all.contains(i)) {
                System.out.println("有坏人逃脱了");
            }
        }
        Long l2 = System.currentTimeMillis();
        System.out.println(l2-l1);

        List<Integer> list = new ArrayList<Integer>(1000);
        for (int i = SIZE + 10000; i < SIZE + 20000; i++) {
            if (all.contains(i)) {
                list.add(i);
            }
        }
        System.out.println("有误伤的数量：" + list.size());
    }
    public static void test03() throws Exception{
        BloomFilter<User> bloomFilter = BloomFilter.create(ObjectFunnel.OBJECT_FUNNEL, SIZE);
        Set<User> users = new HashSet<>(SIZE);
        for(int i = 0;i<SIZE;i++){
            User user = new User(i);
            users.add(user);
        }
        for(User user : users){
            bloomFilter.put(user);
        }
        Long l1 = System.currentTimeMillis();
        for (User user : users) {
            if (!bloomFilter.mightContain(user)) {
                System.out.println("有坏人逃脱了");
            }
        }
        Long l2 = System.currentTimeMillis();
        System.out.println(l2-l1);
        List<Integer> list = new ArrayList<Integer>(1000);
        for (int i = SIZE + 10000; i < SIZE + 20000; i++) {
            if (bloomFilter.mightContain(new User(i))) {
                list.add(i);
            }
        }
        System.out.println("有误伤的数量：" + list.size());
    }
    public static void test04() throws Exception{
        Set<User> all = new HashSet<>(SIZE);
        for(int i = 0;i<SIZE;i++){
            all.add(new User(i));
        }
        Long l1 = System.currentTimeMillis();
        for (User user : all) {
            if (!all.contains(user)) {
                System.out.println("有坏人逃脱了");
            }
        }
        Long l2 = System.currentTimeMillis();
        System.out.println(l2-l1);
        List<Integer> list = new ArrayList<Integer>(1000);
        for (int i = SIZE + 10000; i < SIZE + 20000; i++) {
            if (all.contains(new User(i))) {
                list.add(i);
            }
        }
        System.out.println("有误伤的数量：" + list.size());
    }
    public static void test05() throws Exception{
        Set<Integer> all = new HashSet<>(SIZE);
        for(int i = 0;i<SIZE;i++){
            all.add(i);
        }
        Long l1 = System.currentTimeMillis();
        for (int i = 0;i<SIZE;i++) {
            if (!all.contains(i)) {
                System.out.println("有坏人逃脱了");
            }
        }
        Long l2 = System.currentTimeMillis();
        System.out.println(l2-l1);
        List<Integer> list = new ArrayList<Integer>(1000);
        for (int i = SIZE + 10000; i < SIZE + 20000; i++) {
            if (all.contains(i)) {
                list.add(i);
            }
        }
        System.out.println("有误伤的数量：" + list.size());
    }
}
