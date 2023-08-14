import { LightningElement,api} from 'lwc';
import LoginUser from '@salesforce/apex/loginUser.loginusrMed';
import forgotPas from '@salesforce/apex/loginUser.forgotPassword';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MainpageRight extends NavigationMixin (LightningElement) {
     login =true;
     @api forgotpg=false;
     usrValue;
     pwdValue;
     notfy;
     @api isLoaded =false;
     @api resetLink =false;



handleChangeUsr(event){
          this.usrValue=event.target.value;
          this.usrValue=this.usrValue.toUpperCase();
          console.log(this.usrValue)
          let usrfield=this.template.querySelector(".usrName")
                         usrfield.setCustomValidity("");
                         usrfield.reportValidity();
     }
handlepassword(event){
          this.pwdValue=event.target.value;
          console.log(this.pwdValue)
          let pwfield=this.template.querySelector(".password")
          pwfield.setCustomValidity("");
          pwfield.reportValidity();
     }
     handleback(){
          this.forgotpg=false;
          this.login=true;
          this.notfy=null;

     }
handleLogin(){
          if(this.usrValue!=null && this.pwdValue!=null){
               LoginUser({userId:this.usrValue, pWord:this.pwdValue})
               .then((result)=>{
                    alert(result);
                    if(result=='success Login'){
                    this[NavigationMixin.Navigate]({
                      type: 'standard__navItemPage',
                      attributes: {
                          //Name of any CustomTab. Visualforce tabs, web tabs, Lightning Pages, and Lightning Component tabs
                          apiName: 'Details_Page'
                      },
                  });
                    }
                    else if(result=='Wrong Password'){
                         let pwfield=this.template.querySelector(".password")
                         pwfield.setCustomValidity("Please Enter the Correct Password");
                         pwfield.reportValidity();
                    }
                    else if(result=='No User ID'){
                         let usrfield=this.template.querySelector(".usrName")
                         usrfield.setCustomValidity("User ID is Not Exist");
                         usrfield.reportValidity();
                    }
               })
               .catch((error)=>{
                    alert(error);
          
               })
          }
          else if(this.usrValue==null || this.pwdValue==null){
               if(this.usrValue==null && this.pwdValue==null){
                    let usrfield=this.template.querySelector(".usrName")
                    usrfield.setCustomValidity("User ID value is required");
                    usrfield.reportValidity();
                    let pwfield=this.template.querySelector(".password")
                    pwfield.setCustomValidity("Please Enter the Password");
                    pwfield.reportValidity();
               }
               else if(this.usrValue==null){
                    let usrfield=this.template.querySelector(".usrName")
                    usrfield.setCustomValidity("User ID value is required");
                    usrfield.reportValidity();
               }
               else if(this.pwdValue==null){
                    let pwfield=this.template.querySelector(".password")
                    pwfield.setCustomValidity("Please Enter the Password");
                    pwfield.reportValidity();
               }
               
          }
     

}
handleSignUp() {
      console.log('Sign Up Now');
     
        this[NavigationMixin.Navigate]({  
         
          "type": "standard__component", 
          "attributes": {
               "componentName": "c__Main_signup"
           }  
         
        });   
        console.log('Sign Up');
      }
   
   handleForgotPw(){
          this.login=false;
          this.forgotpg=true;
          }
   
   handleresetLink(){
      
     if(this.usrValue!=null){
          this.isLoaded = true;
          forgotPas({userId:this.usrValue})
          .then((result)=>{
               let usrfield=this.template.querySelector(".usrName")
               usrfield.setCustomValidity("");
               usrfield.reportValidity();
               this.isLoaded = false;
               this.notfy=result;
          })
          .catch((error)=>{
               alert(JSON.stringify(error));
               console.log(JSON.stringify(error));
          
          })
     }
     else if(this.usrValue==null){
          let usrfield=this.template.querySelector(".usrName")
          usrfield.setCustomValidity("User ID value is required");
          usrfield.reportValidity();
          // const errorToastEvent = new ShowToastEvent({
          // title: 'Error',    
          // message: 'Enter the User ID',
          // variant: 'error',

          //  });     
          //  dispatchEvent(errorToastEvent);
          
          }

   }
}