import com.alibaba.fastjson.JSONObject;
import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import entity.User;
import org.junit.Test;
import util.BeanUtil;
import util.CollectionUtil;
import util.DateUtil;
import util.StringUtil;

import java.io.*;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class TestSE {
    public static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static void main(String[] args) throws Exception {
        List<String> strs = new ArrayList<>();
        strs.add("1");
        strs.add("3");
        strs.add("2");
        strs.stream().sorted(Comparator.comparing(Object::toString).reversed());
        System.out.println(strs);
    }


    public static void calcAdd(Integer a,Integer b){
        System.out.println(MessageFormat.format("{1} + {2} = {0}",a+b+1,a,b));
    }
}
class Coo{
    private String data;

    public String getData() {
        return data;
    }

    public void setData(String data) {
        data = data;
    }
}
class Aoo implements Serializable{
    private static final long serialVersionUID = 932144292226177938L;
    @SerializedName("idno")
    private String identityNo;

    private String identityNo2;

    private String birth;


    public Aoo(String identityNo) {
        this.identityNo = identityNo;
    }

    public Aoo(String identityNo, String identityNo2) {
        this.identityNo = identityNo;
        this.identityNo2 = identityNo2;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getIdentityNo2() {
        return identityNo2;
    }

    public void setIdentityNo2(String identityNo2) {
        this.identityNo2 = identityNo2;
    }

    public String getIdentityNo() {
        return identityNo;
    }

    public void setIdentityNo(String identityNo) {
        this.identityNo = identityNo;
    }

    @Override
    public String toString() {
        return "Aoo{" +
                "identityNo='" + identityNo + '\'' +
                ", identityNo2='" + identityNo2 + '\'' +
                ", birth='" + birth + '\'' +
                '}';
    }
}
class Boo implements Serializable{
    private Integer idno;

    @SerializedName("identityNo2")
    private Integer identityNo;

    @SerializedName("birth")
    private Date birthday;

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Integer getIdentityNo() {
        return identityNo;
    }

    public void setIdentityNo(Integer identityNo) {
        this.identityNo = identityNo;
    }

    public Integer getIdno() {
        return idno;
    }

    public void setIdno(Integer idno) {
        this.idno = idno;
    }

}

