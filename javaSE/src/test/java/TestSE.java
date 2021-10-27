import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;
import entity.User;
import org.junit.Test;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class TestSE {
    private static int size = 1000000;

    private static BloomFilter<Integer> bloomFilter = BloomFilter.create(Funnels.integerFunnel(), size);

    public static void main(String[] args) throws Exception {
        test01();
        test02();
    }
    public static void test01() throws Exception{
        for (int i = 0; i < size; i++) {
            bloomFilter.put(i);
        }
        Long l1 = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            if (!bloomFilter.mightContain(i)) {
                System.out.println("有坏人逃脱了");
            }
        }
        Long l2 = System.currentTimeMillis();
        System.out.println(l2-l1);

        List<Integer> list = new ArrayList<Integer>(1000);
        for (int i = size + 10000; i < size + 20000; i++) {
            if (bloomFilter.mightContain(i)) {
                list.add(i);
            }
        }
        System.out.println("有误伤的数量：" + list.size());
    }
    public static void test02() throws Exception{
        List<Integer> all = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            all.add(i);
        }
        Long l1 = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            if (!all.contains(i)) {
                System.out.println("有坏人逃脱了");
            }
        }
        Long l2 = System.currentTimeMillis();
        System.out.println(l2-l1);

        List<Integer> list = new ArrayList<Integer>(1000);
        for (int i = size + 10000; i < size + 20000; i++) {
            if (all.contains(i)) {
                list.add(i);
            }
        }
        System.out.println("有误伤的数量：" + list.size());
    }
}
