package entity;

import java.io.Serializable;

public class Dept extends Base implements Serializable {
    private static final long serialVersionUID = 2011659024203565603L;
    private String name;
    private String code;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "Dept{" +
                "name='" + name + '\'' +
                ", code='" + code + '\'' +
                "} " + super.toString();
    }
}
