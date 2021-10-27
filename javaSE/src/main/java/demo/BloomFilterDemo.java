package demo;

import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;

import java.util.ArrayList;
import java.util.List;

public class BloomFilterDemo {
    private final static int SIZE = 100000;
    public static void main(String[] args) throws Exception {
        test01();
        test02();
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
        List<Integer> all = new ArrayList<>(SIZE);
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
}
