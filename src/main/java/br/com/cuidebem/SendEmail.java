package br.com.cuidebem;

import javax.annotation.Resource;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {

	
	 @Resource(mappedName="java:/cuidebemmail")
	    private Session mailSession;
	 
	 private static final String from_email = "cuidebemm@hotmail.com";
	 
	 public void send(String to_email, String subject, String content, String type_content){
		 try    {
             MimeMessage m = new MimeMessage(mailSession);
             Address from = new InternetAddress(from_email);
             Address[] to = new InternetAddress[] {new InternetAddress(to_email) };
             m.setFrom(from);
             m.setRecipients(Message.RecipientType.TO, to);
             m.setSubject(subject);
             m.setSentDate(new java.util.Date());
             m.setContent(content,type_content);
             Transport.send(m);
         }
         catch (javax.mail.MessagingException e)
         {
             e.printStackTrace();
            
         }
	 }
	
	
}
