package entity;

import java.io.Serializable;

public class Hobby extends Base implements Serializable {

    private static final long serialVersionUID = -1478012336418518003L;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
