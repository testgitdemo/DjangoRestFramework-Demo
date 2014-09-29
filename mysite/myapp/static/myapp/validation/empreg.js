/**
 * Created by priyansh on 16-09-2014.
 */
function validate()
        {
            if (document.formreg.password.value.length < 6 || document.formreg.password.value.length > 12)
            {
                document.getElementById("erpwd").innerHTML="Your password must be length between 6 to 12 Characters.";
                //alert('Your password must be length between 6 to 12 Characters');
                return false;
            }
            if(document.formreg.password.value != document.formreg.cpass.value)
            {
                document.getElementById("ercpass").innerHTML="Your password and Conform password does not match.";
                return false;
            }
            if(document.formreg.dept.value == '-1')
            {
                document.getElementById("erdept").innerHTML="Please select your department.";
                return false;
            }
            if(allLetter())
            {
                //return true;
            }
            else{
                document.getElementById("erename").innerHTML="Name contains only characters and space.";
                return false;
            }
            if(phonenumber())
            {

            }
            else{
                document.getElementById("ermobno").innerHTML="Invalid mobile number.please insert +99 9999999999 format.";
                return false;
            }
        }
        //full name
        function allLetter()
        {
           var letters = /^[A-Za-z ]+$/;
           if(document.formreg.ename.value.match(letters))
             {
              return true;
             }
           else
           {
             return false;
             }
        }
        //mobile
        function phonenumber()
        {
            var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/;
            if(document.formreg.mobno.value.match(phoneno))
            {
                return true;
             }
            else
            {
                //alert("Not a valid Phone Number");
                return false;
             }
         }
