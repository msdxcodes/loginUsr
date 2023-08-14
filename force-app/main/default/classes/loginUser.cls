public with sharing class loginUser {
    @AuraEnabled
    public static string loginusrMed(string userId, string pWord) {  
        string message  ;
        List<Contact> userRecord = new List<Contact>();
            userRecord = [Select Id, userId__c, Password__c From Contact WHERE userId__c=:userId LIMIT 1];
            System.debug('userRecord..'+userRecord);
            if(userRecord.size()==1){
                for(Contact cc:userRecord)
            if(cc.Password__c==pWord){
                message='success Login Now';
            System.debug('Yes..EQUAL');
            }
            else if(cc.Password__c!=pWord){
              message='Wrong Password';
            //   message='Error..! Enter the Correct Password';
             System.debug('No..Not EQUAL');
            }
            }
            else if(userRecord.size()==0){
                message='No User ID';
            }
            
        return message;
    }

    @AuraEnabled
    public static string forgotPassword(string userId){
        
        string message;
        List<Contact> con= [SELECT Id, userId__c, Password__c, Email From Contact WHERE userId__c=:userId  LIMIT 1];
        try{
            for(Contact coc:con){
        if(coc!=null){
          Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();

        email.setTemplateId('00X5i000000EdIyEAK');

        email.setTargetObjectId(coc.Id);

        // email.saveAsActivity = false;
        message='Email Sent Successfully';
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{ email });       
         }
        else if(coc==null){
            message='User ID Not Exist';
        }
        }	
        }
		catch (Exception e) {
			    System.debug('The follow e.getMessage()ing exception has occurred: ' + e.getMessage());
               message= e.getMessage();

        }        
                return message;

    }
    }