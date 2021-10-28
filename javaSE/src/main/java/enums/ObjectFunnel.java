package enums;

import com.google.common.hash.Funnel;
import com.google.common.hash.PrimitiveSink;

public enum ObjectFunnel implements Funnel {
    OBJECT_FUNNEL;

    @Override
    public void funnel(Object o, PrimitiveSink primitiveSink) {
        primitiveSink.putUnencodedChars(o.toString());
    }
}
