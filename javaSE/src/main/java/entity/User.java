package entity;

import java.io.Serializable;
import java.util.List;

public class User extends Base implements Serializable {
    private static final long serialVersionUID = 2879515882076277777L;
    private String name;
    private Integer age;
    private List<Hobby> hobbies;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public List<Hobby> getHobbies() {
        return hobbies;
    }

    public void setHobbies(List<Hobby> hobbies) {
        this.hobbies = hobbies;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", hobbies=" + hobbies +
                "} " + super.toString();
    }
}
