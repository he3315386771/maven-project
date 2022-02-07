package sync;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Test1 {
    public static void main(String[] args) {
        ExecutorService service = Executors.newCachedThreadPool();
        Runnable r1 = () -> {
            while (true){
                Aoo aoo = Aoo.GetInstance();
                aoo.printInstanceTime();
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        Runnable r2 = () -> {
            while (true){
                Aoo aoo = Aoo.GetInstance();
                aoo.printInstanceTime();
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        service.execute(r1);
        service.execute(r2);
    }
}
class Aoo{
    private static Aoo aoo;
    private static Integer i=0;
    private Aoo(){
        i++;
    };
    public static Aoo GetInstance(){
        if(aoo==null){
            synchronized(Aoo.class){
                if(aoo==null){
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    aoo = new Aoo();
                }
            }
        }
        return aoo;
    }
    public void printInstanceTime(){
        System.out.println(i);
    }
}
