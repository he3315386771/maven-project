import org.apache.commons.lang3.StringEscapeUtils;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.parser.Parser;

import java.io.*;
import java.util.*;

public class Xml {
    public static void main(String[] args) throws Exception{
        String xml = "&lt;Root&gt;&lt;Succ&gt;0<8&lt;/Succ&gt;&lt;Msg&gt;&lt;/Msg&gt;&lt;ResponseInfo&gt;&lt;Data&gt;&lt;dept_code&gt;0253&lt;/dept_code&gt;&lt;date_birth&gt;1964-11-06&lt;/date_birth&gt;&lt;visit_no&gt;&lt;/visit_no&gt;&lt;contact_phone&gt;18685043246&lt;/contact_phone&gt;&lt;nation&gt;汉族&lt;/nation&gt;&lt;marry&gt;未婚&lt;/marry&gt;&lt;remark&gt;&lt;/remark&gt;&lt;doctor_id&gt;&lt;/doctor_id&gt;&lt;time_discr&gt;&lt;/time_discr&gt;&lt;patient_name&gt;<![CDATA[t<rue]]>王长发&lt;/patient_name&gt;&lt;cancel_reg_flag&gt;0&lt;/cancel_reg_flag&gt;&lt;doctor_name&gt;&lt;/doctor_name&gt;&lt;visit_status&gt;就诊结束&lt;/visit_status&gt;&lt;address&gt;贵州贵阳&lt;/address&gt;&lt;sex&gt;男&lt;/sex&gt;&lt;dept_name&gt;血液透析门诊&lt;/dept_name&gt;&lt;weight&gt;&lt;/weight&gt;&lt;c_whcd&gt;&lt;/c_whcd&gt;&lt;cardno&gt;38621695&lt;/cardno&gt;&lt;visit_number&gt;&lt;/visit_number&gt;&lt;identityno&gt;520102196411061615&lt;/identityno&gt;&lt;regist_time&gt;%s&lt;/regist_time&gt;&lt;c_zy&gt;工人&lt;/c_zy&gt;&lt;patient_id&gt;38621695&lt;/patient_id&gt;&lt;dept_id&gt;195&lt;/dept_id&gt;&lt;visit_date&gt;%s&lt;/visit_date&gt;&lt;age&gt;56岁&lt;/age&gt;&lt;doctor_code&gt;&lt;/doctor_code&gt;&lt;/Data&gt;&lt;Data&gt;&lt;dept_code&gt;0253&lt;/dept_code&gt;&lt;date_birth&gt;2020-11-06&lt;/date_birth&gt;&lt;visit_no&gt;&lt;/visit_no&gt;&lt;contact_phone&gt;18685043246&lt;/contact_phone&gt;&lt;nation&gt;汉族&lt;/nation&gt;&lt;marry&gt;未婚&lt;/marry&gt;&lt;remark&gt;&lt;/remark&gt;&lt;doctor_id&gt;100058&lt;/doctor_id&gt;&lt;time_discr&gt;&lt;/time_discr&gt;&lt;patient_name&gt;测试A&lt;/patient_name&gt;&lt;cancel_reg_flag&gt;0&lt;/cancel_reg_flag&gt;&lt;doctor_name&gt;杨睿&lt;/doctor_name&gt;&lt;visit_status&gt;就诊结束&lt;/visit_status&gt;&lt;address&gt;贵州贵阳&lt;/address&gt;&lt;sex&gt;男&lt;/sex&gt;&lt;dept_name&gt;内分泌科主任医师门诊_3楼&lt;/dept_name&gt;&lt;weight&gt;&lt;/weight&gt;&lt;c_whcd&gt;&lt;/c_whcd&gt;&lt;cardno&gt;7654321&lt;/cardno&gt;&lt;visit_number&gt;&lt;/visit_number&gt;&lt;identityno&gt;520102196411061615&lt;/identityno&gt;&lt;regist_time&gt;%s&lt;/regist_time&gt;&lt;c_zy&gt;工人&lt;/c_zy&gt;&lt;patient_id&gt;7654321&lt;/patient_id&gt;&lt;dept_id&gt;92&lt;/dept_id&gt;&lt;visit_date&gt;%s&lt;/visit_date&gt;&lt;age&gt;56岁&lt;/age&gt;&lt;doctor_code&gt;489&lt;/doctor_code&gt;&lt;/Data&gt;&lt;/ResponseInfo&gt;&lt;MsgType&gt;B001&lt;/MsgType&gt;&lt;/Root&gt;";
        String sml = StringEscapeUtils.unescapeXml(xml);
        org.jsoup.nodes.Document jsoupDoc = Jsoup.parse(sml,"",  Parser.xmlParser());
        org.dom4j.Document doc = DocumentHelper.parseText(format(jsoupDoc.selectFirst("Root").toString()));
        List sml1 = doc.selectNodes("//Data");
        List<Map<String,Object>> mapList = new ArrayList<>();
        for (Object node:sml1) {
            Element element = (Element) node;
            List<Element> elements = element.elements();
            Iterator<Element> iterator = elements.iterator();
            Map<String, Object> respMap = new HashMap<>();
            while (iterator.hasNext()) {
                Element ele = iterator.next();
                String name = ele.getName();//获取xml节点的名称
                String text = ele.getTextTrim();//获取xml节点的数据的值
                respMap.put(name, text);
            }
            mapList.add(respMap);

        }
    }


    //把字符串压缩成一行
    public static String format(String str) throws Exception{
        StringReader in = new StringReader(str);
        BufferedReader br = new BufferedReader(in);
        String line;
        StringBuilder sb = new StringBuilder();
        while((line=br.readLine())!= null){
            sb.append(line.trim());
        }
        return sb.toString();
    }
}
