package demo;

import org.junit.jupiter.api.Test;
import util.AESUtil;
import util.RSAUtil;

import javax.crypto.SecretKey;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

public class RSAAndAESDemo {
    @Test
    public void AESDemo() throws Exception{
        String content = "abcdefg789+-*+="; // 待加密的字符串
        System.out.println("明文数据为：" + content);
        try {
            // 获得经 BASE64 处理之后的 AES 密钥
            String strKeyAES = AESUtil.getStrKeyAES();
            System.out.println("经BASE64处理之后的密钥：" + strKeyAES);

            // 将 BASE64 处理之后的 AES 密钥转为 SecretKey
            SecretKey secretKey = AESUtil.strKey2SecretKey(strKeyAES);

            // 加密数据
            byte[] encryptAESbytes = AESUtil.encryptAES(content.getBytes("utf-8"), secretKey);
            System.out.println("加密后的数据经 BASE64 处理之后为：" + Base64.getEncoder().encodeToString(encryptAESbytes));
            // 解密数据
            String decryptAESStr = new String(AESUtil.decryptAES(encryptAESbytes, secretKey), "utf-8");
            System.out.println("解密后的数据为：" + decryptAESStr);

            if (content.equals(decryptAESStr)){
                System.out.println("测试通过！");
            }else {
                System.out.println("测试未通过！");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void RSADemo() throws Exception{
        String content = "abcdefg456+-=";   // 明文内容
        System.out.println("原始字符串是：" + content);
        try {
            // 获得密钥对
            KeyPair keyPair =  RSAUtil.getKeyPair();
            // 获得进行Base64 加密后的公钥和私钥 String
            String privateKeyStr = RSAUtil.getPrivateKey(keyPair);
            String publicKeyStr = RSAUtil.getPublicKey(keyPair);
            System.out.println("Base64处理后的私钥：" + privateKeyStr + "\n"
                    + "Base64处理后的公钥：" + publicKeyStr);

            // 获得原始的公钥和私钥，并以字符串形式打印出来
            PrivateKey privateKey = RSAUtil.string2Privatekey(privateKeyStr);
            PublicKey publicKey = RSAUtil.string2PublicKey(publicKeyStr);

            // 公钥加密/私钥解密
            byte[] publicEncryBytes =  RSAUtil.publicEncrytype(content.getBytes(), publicKey);
            System.out.println("公钥加密后的字符串(经BASE64处理)：" + Base64.getEncoder().encodeToString(publicEncryBytes));
            byte[] privateDecryBytes = RSAUtil.privateDecrypt(publicEncryBytes, privateKey);
            System.out.println("私钥解密后的原始字符串：" + new String(privateDecryBytes));

            String privateDecryStr = new String(privateDecryBytes, "utf-8");
            if (content.equals(privateDecryStr)){
                System.out.println("测试通过！");
            }else {
                System.out.println("测试未通过！");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
