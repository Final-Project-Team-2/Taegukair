package org.taegukair.project.member.service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.logging.Logger;

@Service
public class CoolSMSService {

    private static final Logger logger = Logger.getLogger(CoolSMSService.class.getName());

    @Value("${coolsms.apiKey}")
    private String apiKey;

    @Value("${coolsms.apiSecret}")
    private String apiSecret;

    public void sendSms(String phoneNumber, String message) throws CoolsmsException {
        Message coolsms = new Message(apiKey, apiSecret);

        if (!phoneNumber.startsWith("+")) {
            phoneNumber = "+82" + phoneNumber.substring(1);
        }

        HashMap<String, String> params = new HashMap<>();
        params.put("to", phoneNumber);
        params.put("from", "01073308274");  // 발신자 번호 (실제 발신 가능한 번호로 설정)
        params.put("type", "SMS");
        params.put("text", message);
        params.put("app_version", "test app 1.2");

        try {
            JSONObject response = (JSONObject) coolsms.send(params);
            logger.info("SMS Response: " + response.toString());
        } catch (CoolsmsException e) {
            logger.severe("Failed to send SMS: " + e.getMessage());
            throw e;
        }
    }
}
