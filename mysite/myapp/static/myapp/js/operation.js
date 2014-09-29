/**
 * Created by priyansh on 16-09-2014.
 */
(function($){
    var app= $.sammy(function() {
        //Index Page
        this.get('#/', function(context) {
            context.log('Index page of Student Information System');
            $("#homepage").attr("href", "#/");
             if($.cookie('pk')) {
                 $("#result").load('/employee/logout/', function () {
                    $("#header_ele ul#head li").remove();
                     $("#homepage").attr("href", "#/");

                     $("#header_ele ul#head").append('<li><a id="regopen">Registration</a></li>');
                     $("#regopen").attr("href", "#/registration");

                     $("#header_ele ul#head").append('<li><a id="emplogin">Login</a></li>');
                     $("#emplogin").attr("href", "#/employeelogin");

                     $("#header_ele ul#head").append('<li><a id="forgotpassword">Forgot Password</a></li>');
                     $("#forgotpassword").attr("href", "#/forgotpwd");

                     $("#header_ele ul#head").append('<li><a id="adminlogin">Admin</a></li>');
                     $("#adminlogin").attr("href", "#/adminLogin");

                 });
             }
            $.removeCookie('pk');
            $.removeCookie('type');
            $.removeCookie('desid');
            localStorage.clear();
         });
        //Employee Login page Open.
        this.get('#/employeelogin',function(context){
            context.log('Login Page Of Employee.');
            $("#result").load('/employee/login/');
        });
        //Employee Registration page open.
        this.get('#/registration',function(context){
            context.log('Registration Page Of Employee.');
            $("#result").load('/employee/registration/',function(){
              url="employee/getdepartment/";
                $(document).ajaxStart(function(){ });
                $.ajax({
                    url: "employee/getcity/",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        document.getElementById('e_city').innerHTML = "";
                        if(data.length==0){$('#nocity').html("No City Available.")
                        }else{
                            $('#e_city').append('<option value="-1">---Select---</option>');
                            $.each(data,function(key,value){
                               var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.city_name + '">' + value.city_name + '</option>');
                               $('#e_city').append(newOption);
                            });
                        }
                    },
                   error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                   }//error close
                });$(document).ajaxComplete(function(){   });

                $(document).ajaxStart(function(){ });
                $.ajax({
                        url: "employee/getdepartment/",
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            document.getElementById('e_dept').innerHTML = "";
                            if(data.length==0){$('#nodept').html("No Department Available.")
                            }else{
                                $('#e_dept').append('<option value="-1">---Select---</option>');
                                $.each(data,function(key,value){
                                   var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.dname + '">' + value.dname + '</option>');
                                   $('#e_dept').append(newOption);
                                });
                            }
                        },
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                        }//error close
                    });$(document).ajaxComplete(function(){   });
                });
        });
        //Forgot password Open.
        this.get('#/forgotpwd',function(context){
            context.log('Forgot Password Page Of Employee.');
            $('#result').load('employee/forgotPassword/');
        });
        this.get('#/forgotPassword/success',function(context){});
        this.get('#/btn_forgotpassword',function(context){
            context.log('Forgot Password Of Employee.');

            $(document).ajaxStart(function(){ });
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        $('#smag').html('Your password send vai mail.');
                        window.location.hash="/forgotPassword/success/";
                    }
                });
        });
        //Admin Login page open.
        this.get('#/adminLogin',function(context){
            context.log('Login Page Of Admin.');
            $('#result').load('employee/adminLogin/');
        });
        //Perform Employee Login Process.
        this.get('#/login/error/', function(context) {});
        this.get('#/btnemplogin',function(context){
            context.log('Employee Login page validation.');
            var e_email=document.getElementById('e_emaillog');
            var e_pwd=document.getElementById('e_pwdlog');
            if(e_email.value.length==0 || e_pwd.value.length==0){
                $('#loginerror').html("*All fields are required..!");
                 window.location.hash="/login/error/";
            }else{
                $(document).ajaxStart(function(){     });
                url='employee/getemployee/';
                var flag1;var pk;var desid;
                $(document).ajaxStart(function(){ });
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        $.each(data, function (key, value) {
                            if (value.emailid == e_email.value && value.password == e_pwd.value) {
                                flag1 = true;
                                pk = value.id;
                                desid = value.designation;
                            }
                        });
                        if (flag1 == true) {
                            $.cookie('pk', '' + pk + '');
                            $.cookie('desid', '' + desid + '');
                            window.location.hash="/employee/index/";
                        }
                        else {
                            $('#loginerror').html("*Invalid Email Id Or Password..!");
                            window.location.hash="/login/error/";
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                        console.log("There was a problem...");
                        console.log("Status::" + status);
                        console.log("Error Thrown::" + errorThrown);
                    }
                });$(document).ajaxComplete(function(){   });
            }
        });
        //Perform Admin Login Process.
        this.get('#/adminlogin/error/', function(context) {});
        this.get('#/btnadminlogin',function(context){
            context.log('Admin Login page validation.');
            var email=document.getElementById('emailid');
            var pwd=document.getElementById('password');
            if(email.value.length==0 || pwd.value.length==0){
                $('#loginerror').html("*All fields are required..!");
                 window.location.hash="/adminlogin/error/";
            }else{
                $(document).ajaxStart(function(){     });
                url='employee/getadmin/';
                var flag1;var pk;var type;var desid;
                $(document).ajaxStart(function(){ });
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        $.each(data, function (key, value) {
                            if (value.emailid == email.value && value.password == pwd.value) {
                                flag1 = true;
                                pk = value.id;
                                type = 'admin';
                                desid = value.designation;
                            }
                        });
                        if (flag1 == true) {
                            $.cookie('pk', '' + pk + '');
                            $.cookie('type', '' + type + '');
                            $.cookie('desid', '' + desid + '');
                            window.location.hash="/employee/index/";
                        }
                        else {
                            $('#loginerror').html("*Invalid Email Id Or Password..!");
                            window.location.hash="/adminlogin/error/";
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                        console.log("There was a problem...");
                        console.log("Status::" + status);
                        console.log("Error Thrown::" + errorThrown);
                    }
                });$(document).ajaxComplete(function(){   });
            }
        });
        //Index Page of Employee
        this.get('#/employee/index/', function(context) {
            context.log('HomePage of Employee');
            var pk = $.cookie('pk');
            if($.cookie('pk'))
            {
                    $("#result").load('/employee/index/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    if($.cookie('type')){
                        $(document).ajaxStart(function(){     });
                        url='employee/adminprofile/'+ $.cookie('pk');
                        $(document).ajaxStart(function(){ });
                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                $("#wcmsg").html("" + data.name);
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                                console.log("There was a problem...");
                                console.log("Status::" + status);
                                console.log("Error Thrown::" + errorThrown);
                            }
                        });$(document).ajaxComplete(function(){   });
                    }
                    else
                    {
                        $(document).ajaxStart(function(){     });
                        url='employee/empprofile/'+ $.cookie('pk');
                        $(document).ajaxStart(function(){ });
                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                $("#wcmsg").html("" + data.ename);
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                                console.log("There was a problem...");
                                console.log("Status::" + status);
                                console.log("Error Thrown::" + errorThrown);
                            }
                        });$(document).ajaxComplete(function(){   });
                    }
                    if ($.cookie('desid') == 1) {
                        $('#desmsg').append('<div class="alert alert-info" role="alert"><strong>Designation</strong> is not assign by admin to you. </div>')
                    }
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Profile Page of Employee
        this.get('#/employee/profile/', function(context) {
            context.log('Profile page of Employee');
            profileSet();
         });
         function profileSet(){
            var pk = $.cookie('pk');
            if($.cookie('pk'))
            {
                if($.cookie('type')){
                    $("#result").load('/employee/adminprofile/', function () {
                        $("#header_ele ul#head li").remove();
                        menuset();
                        $(document).ajaxStart(function () {
                        });
                        url = 'employee/adminprofile/' + $.cookie('pk');
                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data1) {
                                $('#name').val(data1.name);
                                $('#emailid').val(data1.emailid);
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                                console.log("There was a problem...");
                                console.log("Status::" + status);
                                console.log("Error Thrown::" + errorThrown);
                            }
                        });
                        $(document).ajaxComplete(function () {
                        });

                    });
                }else {
                    $("#result").load('/employee/profile/', function () {
                        $("#header_ele ul#head li").remove();
                        menuset();
                        $(document).ajaxStart(function () {
                        });
                        url = 'employee/empprofile/' + $.cookie('pk');
                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data1) {
                                $.ajax({
                                    url: "/employee/getcity/",
                                    type: "GET",
                                    dataType: "json",
                                    success: function (data) {
                                        $('#e_cityp').html('');
                                        if (data.length == 0) {
                                            $('#nocity').html("No City Available.")
                                        } else {
                                            $.each(data, function (key, value) {
                                                if (data1.city == value.id) {
                                                    $('#e_cityp').append('<option value="' + value.id + '" id=' + value.id + ' name="' + value.city_name + '" selected>' + value.city_name + '</option>');
                                                } else {
                                                    var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.city_name + '">' + value.city_name + '</option>');
                                                    $('#e_cityp').append(newOption);
                                                }
                                            });
                                        }
                                    },
                                    error: function (xhr, status, errorThrown) {
                                        alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                                        console.log("There was a problem...");
                                        console.log("Status::" + status);
                                        console.log("Error Thrown::" + errorThrown);
                                    }//error close
                                });//Get city ajax close
                                $(document).ajaxComplete(function () {
                                });
                                $(document).ajaxStart(function () {
                                });
                                $.ajax({
                                    url: "/employee/getdepartment/",
                                    type: "GET",
                                    dataType: "json",
                                    success: function (data) {
                                        $('#e_deptp').html('');
                                        if (data.length == 0) {
                                            $('#nodept').html("No Department Available.")
                                        } else {

                                            $.each(data, function (key, value) {
                                                if (data1.department == value.id) {
                                                    $('#e_deptp').append('<option value="' + value.id + '" id=' + value.id + ' name="' + value.dname + '" selected>' + value.dname + '</option>');
                                                }
                                                else {
                                                    var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.dname + '">' + value.dname + '</option>');
                                                    $('#e_deptp').append(newOption);
                                                }
                                            });
                                        }
                                    }
                                });
                                $(document).ajaxComplete(function () {
                                });
                                $('#e_namep').val(data1.ename);
                                $('#e_emailp').val(data1.emailid);
                                $('#e_mobp').val(data1.mobno);
                                $('#e_addressp').val(data1.address);
                                $('#e_pincodep').val(data1.pincode);
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                                console.log("There was a problem...");
                                console.log("Status::" + status);
                                console.log("Error Thrown::" + errorThrown);
                            }
                        });
                        $(document).ajaxComplete(function () {
                        });

                    });
                }
            }
            else
            {
                window.location.hash="#/";
            }
         }
        //Save Admin Profile
        this.get('#/adminprofile/error',function(context){});
        this.get('#/adminprofile/success',function(context){
            profileSet();
        });
        this.get('#/admin_profile_save',function(context){
            context.log('Save Profile page of Employee.');
                var name=document.getElementById('name');
                var email=document.getElementById('emailid');
                var emailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var flag6;
                if(email.value.length==0){
                    $("#eremail").html("*please insert your Email ID."); flag6=false;
                    window.location.hash="/adminprofile/error";
                }else if(!(email.value.match(emailformat))){
                    $("#eremail").html("*Invalid Email ID format."); flag6=false;
                    window.location.hash="/adminprofile/error";
                }
                else{$("#eremail").html(""); flag6=true;}

                if(flag6)
                {
                    url='employee/adminprofile/'+ $.cookie('pk');
                         $(document).ajaxStart(function(){     });
                         $.ajax({
                             url: url,
                             type: "GET",
                             dataType: "json",
                             success: function (data1) {
                                 url='employee/adminprofile/'+ $.cookie('pk')+'/';
                                $(document).ajaxStart(function(){     });
                                $.ajax({
                                    url: url,
                                    type: "PUT",
                                    data: {"name": "" + name.value + "","emailid": "" + email.value + "","designation":2},
                                    dataType: "json",
                                    success: function(data){
                                        window.location.hash="/adminprofile/success";
                                    },//success close
                                    error: function(xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                           console.log("There was a problem...");
                                           console.log("Status::"+status);
                                           console.log("Error Thrown::"+errorThrown);
                                         }//error close
                                });//$.ajax close
                                $(document).ajaxComplete(function(){   });
                             },
                             error: function(xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                           console.log("There was a problem...");
                                           console.log("Status::"+status);
                                           console.log("Error Thrown::"+errorThrown);
                             }
                         });$(document).ajaxComplete(function(){   });

                }//flag check if close
        });
        //Save Employee Profile
        this.get('#/profile/error',function(context){});
        this.get('#/profile/success',function(context){
            profileSet();
        });
        this.get('#/saveProfile',function(context){
            context.log('Save Profile page of Employee.');
                var e_name=document.getElementById('e_namep');
                var id=document.getElementById('e_deptp');
                var ctid=document.getElementById('e_cityp');
                var e_email=document.getElementById('e_emailp');
                var e_pincode=document.getElementById('e_pincodep');
                var e_address=document.getElementById('e_addressp');
                var e_mob=document.getElementById('e_mobp');
                var letter= /^[A-Za-z- ]+$/;
                var numbers = /^[0-9 ]+$/;
                var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/;
                var emailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var flag1,flag2,flag4,flag5,flag6,flag7;
                if(e_name.value.length==0){
                    $("#erename").html("*please insert your Full name."); flag1=false;
                    window.location.hash="/profile/error";
                }else if(!(e_name.value.match(letter))){
                    $("#erename").html("*please insert alphabet character only."); flag1=false;
                    window.location.hash="/profile/error";
                }
                else{$("#erename").html(""); flag1=true;}

                if(id.value==-1){
                    $("#erdept").html("*please select your Department."); flag2=false;
                    window.location.hash="/profile/error";
                }else{$("#erdept").html(""); flag2=true;}

                if(ctid.value==-1){
                    $("#ercity").html("*please select your City."); flag7=false;
                    window.location.hash="/profile/error";
                }else{$("#ercity").html(""); flag7=true;}

                if(!(e_pincode.value.match(numbers))){
                    $("#erpincode").html("*please insert only number."); flag4=false
                    window.location.hash="/profile/error";
                }
                else{$("#erpincode").html(""); flag4=true;}

                if(e_mob.value.length==0){
                    $("#ermobno").html("*please insert your mobile number."); flag5=false;
                    window.location.hash="/profile/error";
                }else if(!(e_mob.value.match(phoneno))){
                    $("#ermobno").html("*Invalid mobile number format.please insert this format +99 9999999999."); flag5=false;
                    window.location.hash="/profile/error";
                }
                else{$("#ermobno").html(""); flag5=true;}

                if(e_email.value.length==0){
                    $("#eremail").html("*please insert your Email ID."); flag6=false;
                    window.location.hash="/profile/error";
                }else if(!(e_email.value.match(emailformat))){
                    $("#eremail").html("*Invalid Email ID format."); flag6=false;
                    window.location.hash="/profile/error";
                }
                else{$("#eremail").html(""); flag6=true;}

                if(flag1 && flag2 && flag4 && flag5 && flag6 && flag7)
                {
                    url='employee/empprofile/'+ $.cookie('pk');
                         $(document).ajaxStart(function(){     });
                         $.ajax({
                             url: url,
                             type: "GET",
                             dataType: "json",
                             success: function (data1) {
                                 url='employee/empprofile/'+ $.cookie('pk')+'/';
                                $(document).ajaxStart(function(){     });
                                $.ajax({
                                    url: url,
                                    type: "PUT",
                                    data: {"ename": "" + e_name.value + "","emailid": "" + e_email.value + ""
                                        ,"mobno": ""+e_mob.value+"","department": id.value,"pincode":e_pincode.value,
                                        "city":ctid.value,"designation":data1.designation,"address":""+e_address.value+""},
                                    dataType: "json",
                                    success: function(data){
                                        window.location.hash="/profile/success/";
                                    },//success close
                                    error: function(xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                           console.log("There was a problem...");
                                           console.log("Status::"+status);
                                           console.log("Error Thrown::"+errorThrown);
                                         }//error close
                                });//$.ajax close
                                $(document).ajaxComplete(function(){   });
                             },
                             error: function(xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                           console.log("There was a problem...");
                                           console.log("Status::"+status);
                                           console.log("Error Thrown::"+errorThrown);
                             }
                         });$(document).ajaxComplete(function(){   });

                }//flag check if close
        });
        //Employee Change Password
        this.get('#/employee/changepassword/',function(context) {
            context.log('Change Password page of Employee.');
            var pk = $.cookie('pk');
            if($.cookie('pk')) {
                if($.cookie('type')){
                    $('#result').load('employee/changepassword/', function () {
                        $("#header_ele ul#head li").remove();
                        menuset();
                        url = 'employee/adminprofile/' + $.cookie('pk');
                        $(document).ajaxStart(function () {
                        });
                        $.ajax({
                            url: url,
                            type: "GET",
                            dataType: "json",
                            success: function (data1) {
                                $("#empemail").html("" + data1.emailid);
                            }
                        });
                        $(document).ajaxComplete(function () {
                        });
                    });
                }
                else {
                    $('#result').load('employee/changepassword/', function () {
                        $("#header_ele ul#head li").remove();
                        menuset();
                        url = 'employee/empprofile/' + $.cookie('pk');
                        $(document).ajaxStart(function () {
                        });
                        $.ajax({
                            url: url,
                            type: "GET",
                            dataType: "json",
                            success: function (data1) {
                                $("#empemail").html("" + data1.emailid);
                            }
                        });
                        $(document).ajaxComplete(function () {
                        });
                    });
                }
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Employee Change password Save
        this.get('#/changepassword/error', function(context) {});
        this.get('#/changepassword/success', function(context) {});
        this.get('#/changepasswordsave',function(context){
            context.log('Change Password save of Employee.');
            var oldpwd=document.getElementById('oldpwd');
            var newpwd=document.getElementById('newpwd');
            var newcpwd=document.getElementById('newcpwd');
            var flag1;var flag2;var flag3;
            debugger;
            if(oldpwd.value.length==0 || newpwd.value.length==0 || newcpwd.value.length==0){
                    $('#chpwderror').html('*All fields are required..!');flag1=false;
                    window.location.hash="/changepassword/error";
            }else{$('#chpwderror').html('');flag1=true;}

            if(newpwd.value.length<6 || newpwd.value.length>12){
                    $("#chpwderror").html("*password length between 6 to 12 letters."); flag2=false;
                     window.location.hash="/changepassword/error";
                }else{$('#erpwd').html('');flag2=true;}

            if(newpwd.value!=newcpwd.value){
                $('#chpwderror').html('*New password and conform password does not match..!');flag3=false;
                window.location.hash="/changepassword/error";
            }else{$('#ercpass').html('');flag3=true;}

            if(flag1 && flag3 && flag2)
            {
                if($.cookie('type')){
                    url='employee/adminprofile/'+ $.cookie('pk');
                    $(document).ajaxStart(function(){     });
                     debugger;
                     $.ajax({
                         url: url,
                         type: "GET",
                         dataType: "json",
                         success: function (data1) {
                             if(data1.password!=oldpwd.value){
                                 $('#chpwderror').html('Invalid Old Password..!');
                                 window.location.hash="/changepassword/error";
                             }
                             else
                             {
                                 url='employee/adminprofile/'+ $.cookie('pk');
                                 $(document).ajaxStart(function(){     });
                                 $.ajax({
                                     url: url,
                                     type: "PUT",
                                     data: {"name": "" + data1.name + "", "emailid": "" + data1.emailid + "", "password": newpwd.value, "designation": data1.designation},
                                     dataType: "json",
                                     success: function (data) {
                                         $('#chpwderror').html('Your Password changed successfully..!');
                                         window.location.hash="/changepassword/success";
                                     },//success close
                                     error: function (xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                         console.log("There was a problem...");
                                         console.log("Status::" + status);
                                         console.log("Error Thrown::" + errorThrown);
                                     }//error close
                                 });//$.ajax close
                             }
                         },
                         error: function(xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                       console.log("There was a problem...");
                                       console.log("Status::"+status);
                                       console.log("Error Thrown::"+errorThrown);
                         }
                     });$(document).ajaxComplete(function(){   });
                }
                else {
                    url = 'employee/empprofile/' + $.cookie('pk');
                    $(document).ajaxStart(function () {
                    });
                    debugger;
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            if (data1.password != oldpwd.value) {
                                $('#chpwderror').html('Invalid Old Password..!');
                                window.location.hash = "/changepassword/error";
                            }
                            else {
                                url = 'employee/empprofile/' + $.cookie('pk');
                                $(document).ajaxStart(function () {
                                });
                                $.ajax({
                                    url: url,
                                    type: "PUT",
                                    data: {"ename": "" + data1.ename + "", "emailid": "" + data1.emailid + "", "password": newpwd.value, "mobno": "" + data1.mobno + "", "department": data1.department, "pincode": data1.pincode,
                                        "city": data1.city, "designation": data1.designation, "address": "" + data1.address + ""},
                                    dataType: "json",
                                    success: function (data) {
                                        $('#chpwderror').html('Your Password changed successfully..!');
                                        window.location.hash = "/changepassword/success/";
                                    },//success close
                                    error: function (xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                        console.log("There was a problem...");
                                        console.log("Status::" + status);
                                        console.log("Error Thrown::" + errorThrown);
                                    }//error close
                                });//$.ajax close
                            }
                        },
                        error: function (xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                            console.log("There was a problem...");
                            console.log("Status::" + status);
                            console.log("Error Thrown::" + errorThrown);
                        }
                    });
                    $(document).ajaxComplete(function () {
                    });
                }
            }//flag if close

        });
        //Employee Registration
        this.get('#/registration/error/', function(context) {});
        this.get('#/employee/login/', function(context) {
            context.log('Login Page Of Employee.');
            $("#result").load('/employee/login/');
        });
         this.get('#/saveemployeeregis',function(context) {
             context.log('Save Employee registration page of Employee.');
             var e_name=document.getElementById('e_name');
                var id=document.getElementById('e_dept');
                var ctid=document.getElementById('e_city');
                var e_email=document.getElementById('e_email');
                var e_pwd=document.getElementById('e_pwd');
                var e_cpwd=document.getElementById('e_cpwd');
                var e_mob=document.getElementById('e_mob');
                var letter= /^[A-Za-z- ]+$/;
                var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/;
                var emailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                var flag1,flag2,flag3,flag4,flag5,flag6,flag7;
                if(e_name.value.length==0){
                    $("#erename").html("*please insert your Full name."); flag1=false;
                    window.location.hash="/registration/error/";
                }else if(!(e_name.value.match(letter))){
                    $("#erename").html("*please insert alphabet character only."); flag1=false;
                    window.location.hash="/registration/error/";
                }
                else{$("#erename").html(""); flag1=true;}

                if(id.value==-1){
                    $("#erdept").html("*please select your Department."); flag2=false;
                    window.location.hash="/registration/error/";
                }else{$("#erdept").html(""); flag2=true;}

                if(ctid.value==-1){
                    $("#ercity").html("*please select your City."); flag7=false;
                    window.location.hash="/registration/error/";
                }else{$("#ercity").html(""); flag7=true;}

                if(e_pwd.value.length==0){
                    $("#erpwd").html("*please insert your password."); flag3=false;
                    window.location.hash="/registration/error/";
                }else if(e_pwd.value.length<6 || e_pwd.value.length>12){
                    $("#erpwd").html("*password length between 6 to 12 letters."); flag3=false;
                    window.location.hash="/registration/error/";
                }
                else{$("#erpwd").html(""); flag3=true;}

                if(!(e_pwd.value==e_cpwd.value)){
                    $("#ercpass").html("*Conform password and password does not match."); flag4=false
                    window.location.hash="/registration/error/";
                }
                else{$("#ercpass").html(""); flag4=true;}

                if(e_mob.value.length==0){
                    $("#ermobno").html("*please insert your mobile number."); flag5=false;
                    window.location.hash="/registration/error/";
                }else if(!(e_mob.value.match(phoneno))){
                    $("#ermobno").html("*Invalid mobile number format.please insert this format +99 9999999999."); flag5=false;
                    window.location.hash="/registration/error/";
                }
                else{$("#ermobno").html(""); flag5=true;}

                if(e_email.value.length==0){
                    $("#eremail").html("*please insert your Email ID."); flag6=false;
                    window.location.hash="/registration/error/";
                }else if(!(e_email.value.match(emailformat))){
                    $("#eremail").html("*Invalid Email ID format."); flag6=false;
                    window.location.hash="/registration/error/";
                }
                else{$("#eremail").html(""); flag6=true;}
                debugger;
                if(flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7)
                {
                    url='/employee/employeeregistration/';
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"ename": "" + e_name.value + "","emailid": "" + e_email.value + "",
                            "password": ""+e_pwd.value+"","mobno": ""+e_mob.value+"","department": id.value,
                            "city":ctid.value,"designation":1},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/employee/login/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
                }//flag check if close
         });

        //Designation Open
        this.get('#/employee/designation/',function(context){
           context.log('Designation page of Employee.');
            designationList();
        });
        function designationList(){

            var pk = $.cookie('pk');
            if($.cookie('pk'))
            {
                $('#result').load('employee/designation/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    url = 'employee/getdesignation';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.each(data1,function(key,value){
                                var str='';
                                if(value.id==2 || value.id==3 || value.id==1)
                                {
                                   str+='<img src="static/myapp/images/notedit.jpg" class="img-circle" height="30px" width="30px" alt="NotAllowed image">'+
                                       '<img src="static/myapp/images/notallowed.jpg" class="img-circle" height="30px" width="30px" alt="NotAllowed image">';

                                }
                                else
                                {
                                    str+='<a id="'+value.id+'"><img src="static/myapp/images/edit.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>'+
                                     '<a id="del'+value.id+'"><img src="static/myapp/images/delete.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>';
                                }
                                $('#designation_list').append('<tr class="info"><td>'+value.id+'</td><td>'+value.des_name+'</td><td>'+str+'</td></tr>');
                                $("#"+value.id).attr("href", "#/employee/designation_edit/"+value.id+"/"+value.des_name+"/");
                                $("#del"+value.id).attr("href", "#/employee/designation_delete/"+value.id+"/"+value.des_name+"/");
                            });
                        }
                    });
                    $(document).ajaxComplete(function () { });
                });
            }
            else
            {
                window.location.hash="#/";
            }
        }
        this.get('#/designation/error/', function(context) {});
        this.get('#/designation/success/', function(context) {
            context.log('Designation page of Employee.');
            designationList();
        });
        //Edit Designation
        this.get('#/employee/designation_edit/:id/?:name/',function(context) {
            context.log('Designation Edit page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                $('#result').load('employee/designation_edit/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $('#desname').val(name1);
                    $('#des_id').val(pk);
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Update Designation
        this.get('#/designation_update',function(context){
             context.log('Update Designation of Employee.');
            var des_name=document.getElementById('desname');
            var id=document.getElementById('des_id');
            if(des_name.value.length==0){
                $("#erdname").html("*Please insert Designation Name.");
                window.location.hash="/designation_edit/error/";
            }
            else
            {
//                alert("did::"+id.value);
                url='/employee/designationop/'+id.value;
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "PUT",
                        data: {"des_name": "" + des_name.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/designation/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });
        //Delete Designation
        this.get('#/employee/designation_delete/:id/?:name/',function(context) {
            context.log('Designation Delete page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                    if(confirm("Are you sure you want to delete "+name1+" Department?"))
                    {
                        url='/employee/designationop/'+pk;
                        $(document).ajaxStart(function(){     });
                        $.ajax({
                            url: url,
                            type: "DELETE",
                            dataType: "json",
                            success: function(data){
                                window.location.hash="/designation/success/";
                            },//success close
                            error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                                 }//error close
                        });//$.ajax close
                        $(document).ajaxComplete(function(){   });
                    }
                    else
                    {
                        window.location.hash="/designation/success/";
                    }
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //SaveDesignation
        this.get('#/designation_save',function(context){
            context.log('Save Designation of Employee.');
            var des_name=document.getElementById('desname');
            if(des_name.value.length==0){
                $("#erdname").html("*Please insert Designation Name.");
                window.location.hash="/designation/error/";
            }
            else
            {
                url='/employee/getdesignation/';
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"des_name": "" + des_name.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/designation/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });

        //Student Registration open.
        this.get('#/employee/stud_info/',function(context){
           context.log('Student Registration Page');
           if($.cookie('pk'))
           {
                $('#result').load('employee/Student/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $.ajax({
                        url: "/employee/getcity/",
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            document.getElementById('city').innerHTML = "";
                            if(data.length==0){$('#nocity').html("No City Available.")
                            }else{
                                $('#city').append('<option value="-1">---Select---</option>');
                                $.each(data,function(key,value){
                                   var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.city_name + '">' + value.city_name + '</option>');
                                   $('#city').append(newOption);
                                });
                            }
                        },
                       error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                       }//error close
                    });
                    $.ajax({
                            url: "/employee/getcourse/",
                            type: "GET",
                            dataType: "json",
                            success: function (data) {

                                document.getElementById('course').innerHTML = "";
                                if(data.length==0){$('#nodept').html("No Course Available.")
                                }else{
                                    $('#course').append('<option value="-1">---Select---</option>');
                                    $.each(data,function(key,value){
                                       var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.cname + '">' + value.cname + '</option>');
                                       $('#course').append(newOption);
                                    });
                                }
                            },
                            error: function(xhr, status, errorThrown) {
                                       alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                       console.log("There was a problem...");
                                       console.log("Status::"+status);
                                       console.log("Error Thrown::"+errorThrown);
                           }
                  });
                });
           }
            else{
               window.location.hash="#/";
           }
        });
        //Save Student
        this.get('#/Student/error/',function(context){});
        this.get('#/Student/success/',function(context){
            context.log('Student Registration Page');
           if($.cookie('pk'))
           {
                $('#result').load('employee/Student/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $.ajax({
                        url: "/employee/getcity/",
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            document.getElementById('city').innerHTML = "";
                            if(data.length==0){$('#nocity').html("No City Available.")
                            }else{
                                $('#city').append('<option value="-1">---Select---</option>');
                                $.each(data,function(key,value){
                                   var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.city_name + '">' + value.city_name + '</option>');
                                   $('#city').append(newOption);
                                });
                            }
                        },
                       error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                       }//error close
                    });
                    $.ajax({
                            url: "/employee/getcourse/",
                            type: "GET",
                            dataType: "json",
                            success: function (data) {

                                document.getElementById('course').innerHTML = "";
                                if(data.length==0){$('#nodept').html("No Course Available.")
                                }else{
                                    $('#course').append('<option value="-1">---Select---</option>');
                                    $.each(data,function(key,value){
                                       var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.cname + '">' + value.cname + '</option>');
                                       $('#course').append(newOption);
                                    });
                                }
                            },
                            error: function(xhr, status, errorThrown) {
                                       alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                       console.log("There was a problem...");
                                       console.log("Status::"+status);
                                       console.log("Error Thrown::"+errorThrown);
                           }
                  });
                });
           }
            else{
               window.location.hash="#/";
           }
        });
        this.get('#/studentinfo_save',function(context){
            context.log("Student Information Save.");
            var sname=document.getElementById('sname');
               var rollno=document.getElementById('rollno');
               var emailid=document.getElementById('emailid');
               var gen=$("input:radio[name=gen]:checked").val();
               var course=document.getElementById('course');
               var bdate=document.getElementById('bdate');
               var jdate=document.getElementById('jdate');
               var age=document.getElementById('age');
               var address=document.getElementById('address');
               var city=document.getElementById('city');
               var pincode=document.getElementById('pincode');
               var smobno=document.getElementById('smobno');
               var flag1;var flag2;var flag3;var flag4;var flag5;var flag6;var flag7;var flag8;var flag9;
               var letter= /^[A-Za-z- ]+$/;
                var numbers = /^[0-9 ]+$/;
                var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/;
                var emailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

               if(sname.value.length==0){
                   $('#ersname').html('*please insert Student Name.');flag1=false;
                   window.location.hash="/Student/error/";
               }else if(!(sname.value.match(letter))){
                   $('#ersname').html('*please insert alphabet character only.');flag1=false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#ersname').html('');flag1=true;
               }

               if(rollno.value.length==0){
                   $('#errno').html('*please insert Student Roll NO.');flag2=false;
                   window.location.hash="/Student/error/";
               }else if(!(rollno.value.match(numbers))){
                   $('#errno').html('*please insert number only.');flag2=false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#errno').html('');flag2=true;
               }

               if(emailid.value.length==0){
                   $('#eremail').html('*please insert Student Email ID.');flag3=false;
                   window.location.hash="/Student/error/";
               }else if(!(emailid.value.match(emailformat))){
                   $('#eremail').html('*Invalid Email Id.');flag3=false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#eremail').html('');flag3=true;
               }

//               if(gen.value.length==0){
//                   $('#ergen').html('*please select Student gender.');flag4=false;
//               }else{
//                   $('#ergen').html('');flag4=true;
//               }

               if(course.value==-1){
                   $('#ercourse').html('*please select Student course.');flag5=false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#ercourse').html('');flag5=true;
               }

               if(age.value.length==0){
                   $('#erage').html('*please insert Student Age.');flag6=false;
                   window.location.hash="/Student/error/";
               }else if(!(age.value.match(numbers))){
                   $('#erage').html('*please insert number only.');flag6=false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#erage').html('');flag6=true;
               }

               if(city.value==-1) {
                   $('#ercity').html('*please select Student City.');
                   flag7 = false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#ercity').html('');flag7=true;
               }

               if(!(pincode.value.match(numbers))){
                   $('#erpcode').html('*please insert number only.');flag8=false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#erpcode').html('');flag8=true;
               }

               if(smobno.value.length==0){
                   $('#ermobno').html('*please insert Student Mobile No.');flag9=false;
                   window.location.hash="/Student/error/";
               }else if(!(smobno.value.match(phoneno))){
                   $('#ermobno').html('*invalid mobileno format. please insert this format +99 9999999999');flag9=false;
                   window.location.hash="/Student/error/";
               }else{
                   $('#ermobno').html('');flag9=true;
               }

               if(flag1 && flag2 && flag3 && flag5 && flag6 && flag7 && flag8 && flag9){
                   url="/employee/Studentinsert/";
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"sname": "" + sname.value + "","rollno":rollno.value, "emailid": "" + emailid.value + "", "bdate": bdate.value, "mobno": "" + smobno.value + "", "course": course.value, "pincode": pincode.value,
                               "join_date":""+ jdate.value +"","age":age.value,"gender":""+ gen +"","city": city.value, "address": "" + address.value + ""},
                        dataType: "json",
                        success: function (data) {
                              window.location.hash="/Student/success/";
                        },//success close
                        error: function (xhr, status, errorThrown) {
//                          alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                            console.log("There was a problem...");
                            console.log("Status::" + status);
                            console.log("Error Thrown::" + errorThrown);
                        }//error close
                    });//$.ajax close
               }
        });
//        #/employee/studentlistonly/
        //Student List only
        this.get('#/employee/studentlistonly/',function(context){
            context.log('Student List Page');
           getstudentlistonly();
        });
        function getstudentlistonly(){
            if($.cookie('pk')) {
               $('#result').load('employee/Student_list_only/', function () {
                   $("#header_ele ul#head li").remove();
                   menuset();
                   url="/employee/getstudent";
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function(data){

                            $.each(data,function(key,value){
                                 var str="<tr class='info' id='studtr'>"+
                                 "<td align='center'>"+ value.rollno +"</td>"+
                                 "<td align='center'>"+ value.sname +"</td>"+
                                 "<td align='center'>"+ value.emailid +"</td>"+
                                 "<td align='center'>"+ value.gender +"</td>";
                                var str1="<td align='center'>"+ value.bdate +"</td>"+
                                 "<td align='center'>"+ value.age +"</td>"+
                                 "<td align='center'>"+ value.address +"</td>";
                                var str2="<td align='center'>"+ value.pincode +"</td>"+
                                 "<td align='center'>"+ value.mobno +"</td>"+
                                 "</tr>";
                                  $.ajax({
                                    url: "/employee/getcourse/",
                                    type: "GET",
                                    dataType: "json",
                                    success: function (data1) {
                                        $.each(data1,function(key,value1){
                                            if(value1.id==value.course){
                                                $.ajax({
                                                    url: "/employee/getcity/",
                                                    type: "GET",
                                                    dataType: "json",
                                                    success: function (data2) {
                                                        $.each(data2,function(key,value2){
                                                            if(value2.id==value.city){
                                                                $('#student_list').append(str+"<td>"+value1.cname+"</td>"+str1+"<td>"+value2.city_name+"</td>"+str2);
                                                        }
                                                        });
                                                    },
                                                   error: function(xhr, status, errorThrown) {
                                                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                                               console.log("There was a problem...");
                                                               console.log("Status::"+status);
                                                               console.log("Error Thrown::"+errorThrown);
                                                   }//error close
                                                });

                                        }
                                        });
                                    },
                                   error: function(xhr, status, errorThrown) {
                                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                               console.log("There was a problem...");
                                               console.log("Status::"+status);
                                               console.log("Error Thrown::"+errorThrown);
                                   }//error close
                                });
                                //Edit and delete property

                            });
                        },
                        error: function (xhr, status, errorThrown) {
    //                          alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                console.log("There was a problem...");
                                console.log("Status::" + status);
                                console.log("Error Thrown::" + errorThrown);
                            }
                    });
               });
           }
            else
           {
               window.location.hash="#/";
           }
        }
        //Student List
        this.get('#/employee/studentlist/',function(context){
            context.log('Student Registration Page');
           getstudentlist();
        });
        function getstudentlist(){
            if($.cookie('pk')) {
               $('#result').load('employee/Student_list/', function () {
                   $("#header_ele ul#head li").remove();
                   menuset();
                     var ct='';var cour='';
                   url="/employee/getstudent";
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function(data){

                            $.each(data,function(key,value){
                                 var str="<tr class='info' id='studtr'>"+
                                 "<td align='center'>"+ value.rollno +"</td>"+
                                 "<td align='center'>"+ value.sname +"</td>"+
                                 "<td align='center'>"+ value.emailid +"</td>"+
                                 "<td align='center'>"+ value.gender +"</td>";
                                var str1="<td align='center'>"+ value.bdate +"</td>"+
                                 "<td align='center'>"+ value.age +"</td>"+
                                 "<td align='center'>"+ value.address +"</td>";
                                var str2="<td align='center'>"+ value.pincode +"</td>"+
                                 "<td align='center'>"+ value.mobno +"</td>"+
                                 "<td align='center'><a id='del"+value.id+"'><img src='static/myapp/images/delete.jpg' class='img-circle' height='30px' width='30px' alt='image'></a>"+
                                 "<a id='"+value.id+"'><img src='static/myapp/images/edit.jpg' class='img-circle' height='30px' width='30px' alt='image'></a></td>"+
                                 "</tr>";

                                  $.ajax({
                                    url: "/employee/getcourse/",
                                    type: "GET",
                                    dataType: "json",
                                    success: function (data1) {
                                        $.each(data1,function(key,value1){
                                            if(value1.id==value.course){
                                                $.ajax({
                                                    url: "/employee/getcity/",
                                                    type: "GET",
                                                    dataType: "json",
                                                    success: function (data2) {
                                                        $.each(data2,function(key,value2){
                                                            if(value2.id==value.city){
                                                                $('#student_list').append(str+"<td>"+value1.cname+"</td>"+str1+"<td>"+value2.city_name+"</td>"+str2);
                                                                //Edit and delete Link set
                                                                $("#"+value.id).attr("href", "#/employee/student_edit/"+value.id+"/"+value.sname+"/");
                                                                $("#del"+value.id).attr("href", "#/employee/student_delete/"+value.id+"/"+value.sname+"/");
                                                        }
                                                        });
                                                    },
                                                   error: function(xhr, status, errorThrown) {
                                                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                                               console.log("There was a problem...");
                                                               console.log("Status::"+status);
                                                               console.log("Error Thrown::"+errorThrown);
                                                   }//error close
                                                });

                                        }
                                        });
                                    },
                                   error: function(xhr, status, errorThrown) {
                                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                               console.log("There was a problem...");
                                               console.log("Status::"+status);
                                               console.log("Error Thrown::"+errorThrown);
                                   }//error close
                                });
                                //Edit and delete property

                            });
                        },
                        error: function (xhr, status, errorThrown) {
    //                          alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                console.log("There was a problem...");
                                console.log("Status::" + status);
                                console.log("Error Thrown::" + errorThrown);
                            }
                    });
               });
           }
            else
           {
               window.location.hash="#/";
           }
        }
        //Edit Student
        this.get('#/employee/student_edit/:id/?:name/',function(context) {
            context.log('Student Edit page.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                $('#result').load('employee/Student_edit/',function(){
                   url="employee/getstudent/"+pk;
                    $(document).ajaxStart(function(){ });
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        success: function (data1) {

                            //-->city
                            $.ajax({
                             url: "/employee/getcity/",
                             type: "GET",
                             dataType: "json",
                             success: function (data) {
                                 $('#city').html('');
                                 if (data.length == 0) {

                                 } else {
                                     $.each(data, function (key, value) {
                                         if (data1.city == value.id) {
                                             $('#city').append('<option value="' + value.id + '" id=' + value.id + ' name="' + value.city_name + '" selected>' + value.city_name + '</option>');
                                         } else {
                                             var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.city_name + '">' + value.city_name + '</option>');
                                             $('#city').append(newOption);
                                         }
                                     });
                                 }
                             },
                             error: function (xhr, status, errorThrown) {
                                 alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                                 console.log("There was a problem...");
                                 console.log("Status::" + status);
                                 console.log("Error Thrown::" + errorThrown);
                             }//error close
                        });//Get city ajax close
                            $(document).ajaxComplete(function(){   });
                            $(document).ajaxStart(function(){     });
                            $.ajax({
                             url: "/employee/getcourse/",
                             type: "GET",
                             dataType: "json",
                             success: function (data) {
                                 $('#course').html('');
                                 if (data.length == 0) {

                                 } else {

                                     $.each(data, function (key, value) {
                                         if (data1.course == value.id) {
                                             $('#course').append('<option value="' + value.id + '" id=' + value.id + ' name="' + value.cname + '" selected>' + value.cname + '</option>');
                                         }
                                         else {
                                             var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.cname + '">' + value.cname + '</option>');
                                             $('#course').append(newOption);
                                         }
                                     });
                                 }
                             }
                         });$(document).ajaxComplete(function(){   });
                         if(data1.gender=='Male'){
                             $("#male").attr( "checked", true );
                         }
                         else{
                            $("#female").attr( "checked", true );
                         }
                         $('#sid').val(data1.id);
                         $('#sname').val(data1.sname);
                         $('#rollno').val(data1.rollno);
                         $('#age').val(data1.age);
                         $('#emailid').val(data1.emailid);
                         $('#mobno').val(data1.mobno);
                         $('#address').val(data1.address);
                         $('#pincode').val(data1.pincode);
                        },
                        error: function (xhr, status, errorThrown) {
                            alert("Sorry, there was a problem..." + ",Status:" + status + ",Error Thrown::" + errorThrown);
                            console.log("There was a problem...");
                            console.log("Status::" + status);
                            console.log("Error Thrown::" + errorThrown);
                        }
                    });$(document).ajaxComplete(function(){   });
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Update Student
        this.get('#/Student_edit/success/',function(context){
            getstudentlist();
        });
        this.get('#/Student_edit/error',function(context){});
        this.get('#/student_update',function(context){
            context.log("Student Information Save.");
            var pk=document.getElementById('sid');
            var sname=document.getElementById('sname');
               var rollno=document.getElementById('rollno');
               var emailid=document.getElementById('emailid');
               var gen=$("input:radio[name=gen]:checked").val();
               var course=document.getElementById('course');
               var age=document.getElementById('age');
               var address=document.getElementById('address');
               var city=document.getElementById('city');
               var pincode=document.getElementById('pincode');
               var smobno=document.getElementById('mobno');
               var flag1;var flag2;var flag3;var flag4;var flag5;var flag6;var flag7;var flag8;var flag9;
               var letter= /^[A-Za-z- ]+$/;
                var numbers = /^[0-9 ]+$/;
                var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/;
                var emailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

               if(sname.value.length==0){
                   $('#ersname').html('*please insert Student Name.');flag1=false;
                   window.location.hash="/Student_edit/error/";
               }else if(!(sname.value.match(letter))){
                   $('#ersname').html('*please insert alphabet character only.');flag1=false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#ersname').html('');flag1=true;
               }

               if(rollno.value.length==0){
                   $('#errno').html('*please insert Student Roll NO.');flag2=false;
                   window.location.hash="/Student_edit/error/";
               }else if(!(rollno.value.match(numbers))){
                   $('#errno').html('*please insert number only.');flag2=false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#errno').html('');flag2=true;
               }

               if(emailid.value.length==0){
                   $('#eremail').html('*please insert Student Email ID.');flag3=false;
                   window.location.hash="/Student_edit/error/";
               }else if(!(emailid.value.match(emailformat))){
                   $('#eremail').html('*Invalid Email Id.');flag3=false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#eremail').html('');flag3=true;
               }

               if(course.value==-1){
                   $('#ercourse').html('*please select Student course.');flag5=false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#ercourse').html('');flag5=true;
               }

               if(age.value.length==0){
                   $('#erage').html('*please insert Student Age.');flag6=false;
                   window.location.hash="/Student_edit/error/";
               }else if(!(age.value.match(numbers))){
                   $('#erage').html('*please insert number only.');flag6=false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#erage').html('');flag6=true;
               }

               if(city.value==-1) {
                   $('#ercity').html('*please select Student City.');
                   flag7 = false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#ercity').html('');flag7=true;
               }

               if(!(pincode.value.match(numbers))){
                   $('#erpcode').html('*please insert number only.');flag8=false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#erpcode').html('');flag8=true;
               }

               if(smobno.value.length==0){
                   $('#ermobno').html('*please insert Student Mobile No.');flag9=false;
                   window.location.hash="/Student_edit/error/";
               }else if(!(smobno.value.match(phoneno))){
                   $('#ermobno').html('*invalid mobileno format. please insert this format +99 9999999999');flag9=false;
                   window.location.hash="/Student_edit/error/";
               }else{
                   $('#ermobno').html('');flag9=true;
               }

               if(flag1 && flag2 && flag3 && flag5 && flag6 && flag7 && flag8 && flag9){

                   url="employee/getstudent/"+pk.value;
                   $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.ajax({
                                url: url,
                                type: "PUT",
                                data: {"sname": "" + sname.value + "","rollno":rollno.value, "emailid": "" + emailid.value + "",  "mobno": "" + smobno.value + "", "course": course.value, "pincode": pincode.value,
                                       "bdate":data1.bdate,"join_date":data1.bdate,"age":age.value,"gender":""+ gen +"","city": city.value, "address": "" + address.value + ""},
                                dataType: "json",
                                success: function (data) {
                                      window.location.hash="/Student_edit/success/";
                                },//success close
                                error: function (xhr, status, errorThrown) {
        //                          alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                    console.log("There was a problem...");
                                    console.log("Status::" + status);
                                    console.log("Error Thrown::" + errorThrown);
                                }//error close
                            });//$.ajax close
                        },//success close
                        error: function (xhr, status, errorThrown) {
//                          alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                            console.log("There was a problem...");
                            console.log("Status::" + status);
                            console.log("Error Thrown::" + errorThrown);
                        }//error close
                    });//$.ajax close
               }
        });
         //open Course
        this.get('#/employee/course/',function(context){
           context.log('Course page of Employee.');
            courseList();
        });
        function courseList(){
            var pk = $.cookie('pk');
            if($.cookie('pk'))
            {
                $('#result').load('employee/course/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    url = 'employee/getcourse';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.each(data1,function(key,value){
                                var str='';
                                    str+='<a id="'+value.id+'"><img src="static/myapp/images/edit.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>'+
                                     '<a id="del'+value.id+'"><img src="static/myapp/images/delete.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>';
                                $('#course_list').append('<tr class="info"><td>'+value.cname+'</td><td>'+str+'</td></tr>');
                                $("#"+value.id).attr("href", "#/employee/curse_edit/"+value.id+"/"+value.cname+"/");
                                $("#del"+value.id).attr("href", "#/employee/course_delete/"+value.id+"/"+value.cname+"/");
                            });
                        }
                    });
                    $(document).ajaxComplete(function () { });
                });
            }
            else
            {
                window.location.hash="#/";
            }
        }
        this.get('#/course/error/', function(context) {});
        this.get('#/course/success/', function(context) {
            context.log('Course page of Employee.');
            courseList();
        });
        //Edit Course
        this.get('#/employee/curse_edit/:id/?:name/',function(context) {
            context.log('Course Edit page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                $('#result').load('employee/course_edit/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $('#cname').val(name1);
                    $('#course_id').val(pk);
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Update Course
        this.get('#/course_update',function(context){
             context.log('Update Course of Employee.');
            var cname=document.getElementById('cname');
            var id=document.getElementById('course_id');
            if(cname.value.length==0){
                $("#erdname").html("*Please insert Course Name.");
                window.location.hash="/course_edit/error/";
            }
            else
            {
//                alert("did::"+id.value);
                url='/employee/course_detail/'+id.value;
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "PUT",
                        data: {"cname": "" + cname.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/course/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });
        //Delete Course
        this.get('#/employee/course_delete/:id/?:name/',function(context) {
            context.log('Course Delete page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                    if(confirm("Are you sure you want to delete "+name1+" Course?"))
                    {
                        url='/employee/course_detail/'+pk;
                        $(document).ajaxStart(function(){     });
                        $.ajax({
                            url: url,
                            type: "DELETE",
                            dataType: "json",
                            success: function(data){
                                window.location.hash="/course/success/";
                            },//success close
                            error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                                 }//error close
                        });//$.ajax close
                        $(document).ajaxComplete(function(){   });
                    }
                    else
                    {
                        window.location.hash="/course/success/";
                    }
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Save Course
        this.get('#/course_save',function(context){
            context.log('Save Course of Employee.');
            var cname=document.getElementById('cname');
            if(cname.value.length==0){
                $("#ercname").html("*Please insert Course Name.");
                window.location.hash="/course/error/";
            }
            else
            {
                url='/employee/getcourse/';
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"cname": "" + cname.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/course/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });

         //open Department
        this.get('#/employee/department/',function(context){
           context.log('Department page of Employee.');
            deptList();
        });
        function deptList(){
            var pk = $.cookie('pk');
            if($.cookie('pk'))
            {
                $('#result').load('employee/department/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    url = 'employee/getdepartment';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.each(data1,function(key,value){
                                var str='';
                                    str+='<a id="'+value.id+'"><img src="static/myapp/images/edit.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>'+
                                     '<a id="del'+value.id+'"><img src="static/myapp/images/delete.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>';
                                $('#dept_list').append('<tr class="info"><td>'+value.dname+'</td><td>'+str+'</td></tr>');
                                $("#"+value.id).attr("href", "#/employee/dept_edit/"+value.id+"/"+value.dname+"/");
                                $("#del"+value.id).attr("href", "#/employee/dept_delete/"+value.id+"/"+value.dname+"/");
                            });
                        }
                    });
                    $(document).ajaxComplete(function () { });
                });
            }
            else
            {
                window.location.hash="#/";
            }
        }
        this.get('#/department/error/', function(context) {});
        this.get('#/department/success/', function(context) {
            context.log('Course page of Employee.');
            deptList();
        });
        //Edit Department
        this.get('#/employee/dept_edit/:id/?:name/',function(context) {
            context.log('Department Edit page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                $('#result').load('employee/department_edit/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $('#dname').val(name1);
                    $('#did').val(pk);
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Update Department
        this.get('#/dept_update',function(context){
             context.log('Update Deparmment of Employee.');
            var dname=document.getElementById('dname');
            var id=document.getElementById('did');
            if(dname.value.length==0){
                $("#erdname").html("*Please insert Department Name.");
                window.location.hash="/department_edit/error/";
            }
            else
            {
//                alert("did::"+id.value);
                url='/employee/getdepartment_detail/'+id.value;
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "PUT",
                        data: {"dname": "" + dname.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/department/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });
        //Delete Department
        this.get('#/employee/dept_delete/:id/?:name/',function(context) {
            context.log('Department Delete page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                    if(confirm("Are you sure you want to delete "+name1+" Department?"))
                    {
                        url='/employee/getdepartment_detail/'+pk;
                        $(document).ajaxStart(function(){     });
                        $.ajax({
                            url: url,
                            type: "DELETE",
                            dataType: "json",
                            success: function(data){
                                window.location.hash="/department/success/";
                            },//success close
                            error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                                 }//error close
                        });//$.ajax close
                        $(document).ajaxComplete(function(){   });
                    }
                    else
                    {
                        window.location.hash="/department/success/";
                    }
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Save Department
        this.get('#/dept_save',function(context){
            context.log('Save Department of Employee.');
            var dname=document.getElementById('dname');
            if(dname.value.length==0){
                $("#erdname").html("*Please insert Department Name.");
                window.location.hash="/department/error/";
            }
            else
            {
                url='/employee/getdepartment/';
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"dname": "" + dname.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/department/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });

        //open Department
        this.get('#/employee/country/',function(context){
           context.log('Country page of Employee.');
            countryList();
        });
        function countryList(){
            var pk = $.cookie('pk');
            if($.cookie('pk'))
            {
                $('#result').load('employee/country/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    url = 'employee/getcountry';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.each(data1,function(key,value){
                                var str='';
                                    str+='<a id="'+value.id+'"><img src="static/myapp/images/edit.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>'+
                                     '<a id="del'+value.id+'"><img src="static/myapp/images/delete.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>';
                                $('#country_list').append('<tr class="info"><td>'+value.country_name+'</td><td>'+str+'</td></tr>');
                                $("#"+value.id).attr("href", "#/employee/country_edit/"+value.id+"/"+value.country_name+"/");
                                $("#del"+value.id).attr("href", "#/employee/country_delete/"+value.id+"/"+value.country_name+"/");
                            });
                        }
                    });
                    $(document).ajaxComplete(function () { });
                });
            }
            else
            {
                window.location.hash="#/";
            }
        }
        this.get('#/country/error/', function(context) {});
        this.get('#/country/success/', function(context) {
            context.log('Country page of Employee.');
            countryList();
        });
        //Edit country
        this.get('#/employee/country_edit/:id/?:name/',function(context) {
            context.log('country Edit page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                $('#result').load('employee/country_edit/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $('#country_name').val(name1);
                    $('#cid').val(pk);
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Update Country
        this.get('#/country_update',function(context){
             context.log('Update country of Employee.');
            var country_name=document.getElementById('country_name');
            var id=document.getElementById('cid');
            if(country_name.value.length==0){
                $("#ercname").html("*Please insert country Name.");
                window.location.hash="/country_edit/error/";
            }
            else
            {
//                alert("did::"+id.value);
                url='/employee/getcountry_detail/'+id.value;
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "PUT",
                        data: {"country_name": "" + country_name.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/country/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });
        //Delete Country
        this.get('#/employee/country_delete/:id/?:name/',function(context) {
            context.log('Country Delete page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;
            if($.cookie('pk')) {
                    if(confirm("Are you sure you want to delete "+name1+" country?"))
                    {
                        url='/employee/getcountry_detail/'+pk;
                        $(document).ajaxStart(function(){     });
                        $.ajax({
                            url: url,
                            type: "DELETE",
                            dataType: "json",
                            success: function(data){
                                window.location.hash="/country/success/";
                            },//success close
                            error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                                 }//error close
                        });//$.ajax close
                        $(document).ajaxComplete(function(){   });
                    }
                    else
                    {
                        window.location.hash="/country/success/";
                    }
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Save country
        this.get('#/country_save',function(context){
            context.log('Save country of Employee.');
            var country_name=document.getElementById('country_name');
            if(country_name.value.length==0){
                $("#ercname").html("*Please insert country Name.");
                window.location.hash="/country/error/";
            }
            else
            {
                url='/employee/getcountry/';
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"country_name": "" + country_name.value + ""},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/country/success/";
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });


        //Change Employee Designation page open
        this.get('#/employee/empdesignation/',function(context){
           context.log('Employee Designation page.');
            empdesList();
        });
        function empdesList(){
            var pk = $.cookie('pk');
            if($.cookie('pk'))
            {

                $('#result').load('employee/empdeschange/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $('.row').hide();
                    url = 'employee/getemployee';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.each(data1,function(key,value){
                                var str='';var str1='';
                                    url='/employee/getdepartment_detail/'+value.department;
                                    $.ajax({
                                        url: url,
                                        type: "GET",
                                        dataType: "json",
                                        success: function(data){
                                            url='/employee/designationop/'+value.designation;
                                            $.ajax({
                                                url: url,
                                                type: "GET",
                                                dataType: "json",
                                                success: function(data2){
                                                        str+='<tr class="info"><td>'+value.ename+'</td>';
                                                        str+='<td>'+value.emailid+'</td>';
                                                        str+='<td>'+data.dname+'</td>';
                                                        str+='<td>'+data2.des_name+'</td>';
                                                        str+='<td>'+value.mobno+'</td>';
                                                        str+='<td><a id="'+value.id+'" class="btn btn-primary">Change Designation</a></td>';
                                                        $('#des_list').append(str+'</tr>');
                                                        $("#"+value.id).attr("href", "#/change_designation/"+value.id+"/"+value.ename+"/");
                                                }//success close
                                            });//$.ajax close
                                        }
                                    });//$.ajax close
                            });

                            //Designation drop-down fill

                        }
                    });
                    $(document).ajaxComplete(function () { });

                });
            }
            else
            {
                window.location.hash="#/";
            }
        }

        //====================
        function empdes(pk,name1){
            if($.cookie('pk'))
            {
                $('#result').load('employee/empdeschange/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
//                    $('.row').hide();
                    url = 'employee/getemployee';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.each(data1,function(key,value){
                                var str='';var str1='';
                                    url='/employee/getdepartment_detail/'+value.department;
                                    $.ajax({
                                        url: url,
                                        type: "GET",
                                        dataType: "json",
                                        success: function(data){
                                            url='/employee/designationop/'+value.designation;
                                            $.ajax({
                                                url: url,
                                                type: "GET",
                                                dataType: "json",
                                                success: function(data2){
                                                        str+='<tr class="info"><td>'+value.ename+'</td>';
                                                        str+='<td>'+value.emailid+'</td>';
                                                        str+='<td>'+data.dname+'</td>';
                                                        str+='<td>'+data2.des_name+'</td>';
                                                        str+='<td>'+value.mobno+'</td>';
                                                        str+='<td><a id="'+value.id+'" class="btn btn-primary">Change Designation</a></td>';
                                                        $('#des_list').append(str+'</tr>');
                                                        $("#"+value.id).attr("href", "#/change_designation/"+value.id+"/"+value.ename+"/");
                                                }//success close
                                            });//$.ajax close
                                        }
                                    });//$.ajax close
                            });
                        }
                    });
                    $(document).ajaxComplete(function () { });

                    $('#empid').val(pk);
                $('#empname').html(name1);
                url = 'employee/empprofile/'+pk;
                    $(document).ajaxStart(function () {});
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            $.ajax({
                             url: "/employee/getdesignation/",
                             type: "GET",
                             dataType: "json",
                             success: function (data) {
                                 $('#desig').html('');
                                 if (data.length == 0) {

                                 } else {
                                     $.each(data, function (key, value) {
                                         if (data1.designation == value.id) {
                                             $('#desig').append('<option value="' + value.id + '" id=' + value.id + ' name="' + value.des_name + '" selected>' + value.des_name + '</option>');
                                         }
                                         else {
                                             var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.des_name + '">' + value.des_name + '</option>');
                                             $('#desig').append(newOption);
                                         }
                                     });
                                 }
                             }
                         });
                        }
                    });
                    $(document).ajaxComplete(function () { });

                });
            }
            else
            {
                window.location.hash="#/";
            }
        }

        //Change Empdes
        this.get('#/designation/error/',function(context){});
        this.get('#/change_designation/:id/?:name/',function(context) {
            context.log('Employee change designation panel show.');
//            window.location.hash="/designation/error/";
            var pk=context.params.id;  var name1=context.params.name;
            $('.row').show();
            if($.cookie('pk')) {
                empdes(pk,name1);
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Update Employee Designation
        this.get('#/change_desg',function(context){
           context.log("Employee Designation Update.");
            var empid=document.getElementById('empid');
            var desid=document.getElementById('desig');
            url='employee/empprofile/'+ empid.value;
            $(document).ajaxStart(function(){     });
             $.ajax({
                 url: url,
                 type: "GET",
                 dataType: "json",
                 success: function (data1) {
                     url='employee/empprofile/'+ empid.value;
                     $(document).ajaxStart(function(){     });
                     $.ajax({
                         url: url,
                         type: "PUT",
                         data: {"ename": "" + data1.ename + "", "emailid": "" + data1.emailid + "", "password": "" + data1.password + "", "mobno": "" + data1.mobno + "", "department": data1.department, "pincode": data1.pincode,
                             "city": data1.city, "designation": desid.value, "address": "" + data1.address + ""},
                         dataType: "json",
                         success: function (data) {
                             empdesList();
                         },//success close
                         error: function (xhr, status, errorThrown) {
//                                           alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                             console.log("There was a problem...");
                             console.log("Status::" + status);
                             console.log("Error Thrown::" + errorThrown);
                         }//error close
                     });//$.ajax close
                 },
                 error: function(xhr, status, errorThrown) {
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                 }
             });$(document).ajaxComplete(function(){   });

        });
        //State Detail Open
        this.get('#/employee/state/',function(context){
            context.log("State Detail Page open.");
            stateDetailper(-1);
        });
        function stateDetail(){
            if($.cookie('pk'))
            {
                $('#result').load('employee/state/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
//                    $('.row').hide();
                    url = 'employee/getcountry';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
//                            document.getElementById('country').innerHTML = "";
                            if(data1.length==0){
                            }else{
                                $('#country').append('<option value="-1">---Select---</option>');
                                $.each(data1,function(key,value){
                                   var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.country_name + '">' + value.country_name + '</option>');
                                   $('#country').append(newOption);
                                });
                            }
                        }
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            document.getElementById('countrysel').innerHTML = "";
                            if(data1.length==0){
                            }else{
                                $('#countrysel').append('<option value="-1" selected>---Select---</option>');
                                $.each(data1,function(key,value){
                                   var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.country_name + '">' + value.country_name + '</option>');
                                   $('#countrysel').append(newOption);
                                });
                            }
                        }
                    });
//                    $('#state_list').append('<tr><td colspan="2" align="center">Recond No Found.</td></tr>');
                });
            }
            else
            {
                window.location.hash="#/";
            }
        }
        function stateDetailper(cid){
            if($.cookie('pk'))
            {
                $('#result').load('employee/state/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
//                    $('.row').hide();
                    url = 'employee/getcountry';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            document.getElementById('country').innerHTML = "";
                            if(data1.length==0){
                            }else{
                                $('#country').append('<option value="-1">---Select---</option>');
                                $.each(data1,function(key,value){
                                   var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.country_name + '">' + value.country_name + '</option>');
                                   $('#country').append(newOption);
                                });
                            }
                        }
                    });
                    url = 'employee/getcountry';
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
                            document.getElementById('countrysel').innerHTML = "";
                            if(data1.length==0){
                            }else{
                                $('#countrysel').append('<option value="-1">---Select---</option>');
                                $.each(data1,function(key,value){
                                    if(cid==value.id){
                                        var newOption1 = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.country_name + '" selected>' + value.country_name + '</option>');
                                   $('#countrysel').append(newOption1);
                                    }
                                    else {
                                        var newOption1 = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.country_name + '">' + value.country_name + '</option>');
                                        $('#countrysel').append(newOption1);
                                    }
                                });
                            }
                        }
                    });
                    url="employee/getstate";
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
//                            document.getElementById('country').innerHTML = "";
                            var flag=0;
                            if(data1.length==0){
                                $('#state_list').append('<tr><td colspan="2" align="center">Recond No Found.</td></tr>');
                            }else{
                                $.each(data1,function(key,value){
                                    if(value.country==cid){
                                        str='<a id="'+value.id+'"><img src="static/myapp/images/edit.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>'+
                                             '<a id="del'+value.id+'"><img src="static/myapp/images/delete.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>';
                                        $('#state_list').append('<tr class="info"><td>'+value.state_name+'</td><td>'+str+'</td></tr>');
                                        $("#"+value.id).attr("href", "#/employee/state_edit/"+value.id+"/"+value.state_name+"/"+value.country+"/");
                                        $("#del"+value.id).attr("href", "#/employee/state_delete/"+value.id+"/"+value.state_name+"/"+value.country+"/");
                                        flag+=1;
                                    }
                                });
                                if(flag==0){
                                    $('#state_list').append('<tr><td colspan="2" align="center">No Record Found.</td></tr>');
                                }
                            }
                        }
                    });
//                    $('#state_list').append('<tr><td colspan="2" align="center">Recond No Found.</td></tr>');
                });
            }
            else
            {
                window.location.hash="#/";
            }
        }
        this.get('#/state_show/success/:id',function(context){
            var cid=context.params.id;
            stateDetailper(cid);
        });
        this.get('#/show_state',function(context){
            context.log('State List Show.');
            var cid=document.getElementById('countrysel');
            window.location.hash="/state_show/success/"+cid.value;
        });
        //Edit state
        this.get('#/employee/state_edit/:id/?:name/?:cid/',function(context) {
            context.log('State Edit page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;var cid=context.params.cid;
            if($.cookie('pk')) {
                $('#result').load('employee/state_edit/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $('#state_name').val(name1);
                    $('#sid').val(pk);
                    $('#cid').val(cid);
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
        this.get('#/state/success',function(context){
           context.log("state Success");
            stateDetail();
        });
        //Update state
        this.get('#/state_update',function(context){
             context.log('Update state of Employee.');
            var state_name=document.getElementById('state_name');
            var id=document.getElementById('sid');
            var cid=document.getElementById('cid');
            if(state_name.value.length==0){
                $("#ersname").html("*Please insert state Name.");
                window.location.hash="/state_edit/error/";
            }
            else
            {
//                alert("did::"+id.value);
                url='/employee/getstate_detail/'+id.value;
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "PUT",
                        data: {"state_name": "" + state_name.value + "","country":cid.value},
                        dataType: "json",
                        success: function(data){
                             window.location.hash="/state_show/success/"+cid.value;
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });

        //Delete State
        this.get('#/employee/state_delete/:id/?:name/?:cid/',function(context) {
            context.log('Country Delete page of Employee.');
            var pk=context.params.id;  var name1=context.params.name; var cid=context.params.cid;
            if($.cookie('pk')) {
                    if(confirm("Are you sure you want to delete "+name1+" state?"))
                    {
                        url='/employee/getstate_detail/'+pk;
                        $(document).ajaxStart(function(){     });
                        $.ajax({
                            url: url,
                            type: "DELETE",
                            dataType: "json",
                            success: function(data){
                                window.location.hash="/state_show/success/"+cid;
                            },//success close
                            error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                                 }//error close
                        });//$.ajax close
                        $(document).ajaxComplete(function(){   });
                    }
                    else
                    {
                        window.location.hash="/state_show/success/"+cid;
                    }
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Save state
        this.get('#/state/error/',function(context){});
        this.get('#/state_save',function(context){
            context.log('Save state of Employee.');
            var state_name=document.getElementById('state_name');
            var country=document.getElementById('country');
            var flag;var flag1;
            if(state_name.value.length==0){
                $("#ersname").html("*Please insert state Name.");flag=false;
                window.location.hash="/state/error/";
            }
            else{
                $("#ersname").html("");flag=true;
            }
            if(country.value==-1){
                $("#ercountry").html("*Please Select any Country Name.");flag1=false;
                window.location.hash="/state/error/";
            }else{$("#ercountry").html("");flag1=true;}
            if(flag && flag1)
            {
                alert("save");
//                window.location.hash="/state/success/";
                url='/employee/getstate/';
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"state_name": "" + state_name.value + "","country":country.value},
                        dataType: "json",
                        success: function(data){
                            window.location.hash="/state_show/success/"+country.value;
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });



        //city Detail Open
        this.get('#/employee/city/',function(context){
            context.log("City Detail Page open.");
            cityDetailper(-1);
        });

        function cityDetailper(sid){
            if($.cookie('pk'))
            {
                $('#result').load('employee/city/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
//                    $('.row').hide();
                    url = 'employee/getstate';
                    $(document).ajaxStart(function () {
                    });
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
//                            document.getElementById('state').innerHTML = "";
                            if(data1.length==0){
                            }else{
                                $('#state').append('<option value="-1">---Select---</option>');
                                $.each(data1,function(key,value){
                                   var newOption = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.state_name + '">' + value.state_name + '</option>');
                                   $('#state').append(newOption);
                                });
                            }
                        }
                    });
                    url = 'employee/getstate';
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
//                            document.getElementById('statesel').innerHTML = "";
                            if(data1.length==0){
                            }else{
                                $('#statesel').append('<option value="-1">---Select---</option>');
                                $.each(data1,function(key,value){
                                    if(sid==value.id){
                                        var newOption1 = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.state_name + '" selected>' + value.state_name + '</option>');
                                   $('#statesel').append(newOption1);
                                    }
                                    else {
                                        var newOption1 = $('<option value="' + value.id + '" id=' + value.id + ' name="' + value.state_name + '">' + value.country_name + '</option>');
                                        $('#statesel').append(newOption1);
                                    }
                                });
                            }
                        }
                    });
                    url="employee/getcity";
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function (data1) {
//                            document.getElementById('country').innerHTML = "";
                            var flag=0;
                            if(data1.length==0){
                                $('#state_list').append('<tr><td colspan="2" align="center">No Record Found.</td></tr>');
                            }else{
                                $.each(data1,function(key,value){
                                    if(value.state==sid){
                                        str='<a id="'+value.id+'"><img src="static/myapp/images/edit.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>'+
                                             '<a id="del'+value.id+'"><img src="static/myapp/images/delete.jpg" class="img-circle" height="30px" width="30px" alt="edit image"></a>';
                                        $('#city_list').append('<tr class="info"><td>'+value.city_name+'</td><td>'+str+'</td></tr>');
                                        $("#"+value.id).attr("href", "#/employee/city_edit/"+value.id+"/"+value.city_name+"/"+value.state+"/");
                                        $("#del"+value.id).attr("href", "#/employee/city_delete/"+value.id+"/"+value.city_name+"/"+value.state+"/");
                                        flag+=1;
                                    }
                                });
                                if(flag==0){
                                    $('#city_list').append('<tr><td colspan="2" align="center">No Record Found.</td></tr>');
                                }
                            }
                        }
                    });
//                    $('#state_list').append('<tr><td colspan="2" align="center">Recond No Found.</td></tr>');
                });
            }
            else
            {
                window.location.hash="#/";
            }
        }
        this.get('#/city_show/success/:id',function(context){
            var sid=context.params.id;
            cityDetailper(sid);
        });
        this.get('#/show_city',function(context){
            context.log('city List Show.');
            var sid=document.getElementById('statesel');
            window.location.hash="/city_show/success/"+sid.value;
        });
        //Edit city
        this.get('#/employee/city_edit/:id/?:name/?:sid/',function(context) {
            context.log('city Edit page of Employee.');
            var pk=context.params.id;  var name1=context.params.name;var sid=context.params.sid;
            if($.cookie('pk')) {
                $('#result').load('employee/city_edit/', function () {
                    $("#header_ele ul#head li").remove();
                    menuset();
                    $('#city_name').val(name1);
                    $('#ctid').val(pk);
                    $('#sid').val(sid);
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });
//        this.get('#/state/success',function(context){
//           context.log("state Success");
//            stateDetail();
//        });
        //Update city
        this.get('#/city_update',function(context){
             context.log('Update city of Employee.');
            var city_name=document.getElementById('city_name');
            var id=document.getElementById('ctid');
            var sid=document.getElementById('sid');
            if(city_name.value.length==0){
                $("#erctname").html("*Please insert city Name.");
                window.location.hash="/state_edit/error/";
            }
            else
            {
//                alert("did::"+id.value);
                url='/employee/city_detail/'+id.value;
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "PUT",
                        data: {"city_name": "" + city_name.value + "","state":sid.value},
                        dataType: "json",
                        success: function(data){
                             window.location.hash="/city_show/success/"+sid.value;
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });

        //Delete city
        this.get('#/employee/city_delete/:id/?:name/?:sid/',function(context) {
            context.log('Country Delete page of Employee.');
            var pk=context.params.id;  var name1=context.params.name; var sid=context.params.sid;
            if($.cookie('pk')) {
                    if(confirm("Are you sure you want to delete "+name1+" city?"))
                    {
                        url='/employee/city_detail/'+pk;
                        $(document).ajaxStart(function(){     });
                        $.ajax({
                            url: url,
                            type: "DELETE",
                            dataType: "json",
                            success: function(data){
                                window.location.hash="/city_show/success/"+sid;
                            },//success close
                            error: function(xhr, status, errorThrown) {
                                   alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                                   console.log("There was a problem...");
                                   console.log("Status::"+status);
                                   console.log("Error Thrown::"+errorThrown);
                                 }//error close
                        });//$.ajax close
                        $(document).ajaxComplete(function(){   });
                    }
                    else
                    {
                        window.location.hash="/city_show/success/"+sid;
                    }
            }
            else
            {
                window.location.hash="#/";
            }
         });
        //Save city
        this.get('#/city/error/',function(context){});
        this.get('#/city_save',function(context){
            context.log('Save city of Employee.');
            var city_name=document.getElementById('city_name');
            var state=document.getElementById('state');
            var flag;var flag1;
            if(city_name.value.length==0){
                $("#erctname").html("*Please insert city Name.");flag=false;
                window.location.hash="/city/error/";
            }
            else{
                $("#erctname").html("");flag=true;
            }
            if(state.value==-1){
                $("#erctname").html("*Please Select any state Name.");flag1=false;
                window.location.hash="/city/error/";
            }else{$("#erctname").html("");flag1=true;}
            if(flag && flag1)
            {
                url='/employee/getcity/';
                    $(document).ajaxStart(function(){     });
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: {"city_name": "" + city_name.value + "","state":state.value},
                        dataType: "json",
                        success: function(data){
                             window.location.hash="/city_show/success/"+state.value;
                        },//success close
                        error: function(xhr, status, errorThrown) {
                               alert("Sorry, there was a problem..."+ ",Status:" + status+",Error Thrown::"+errorThrown);
                               console.log("There was a problem...");
                               console.log("Status::"+status);
                               console.log("Error Thrown::"+errorThrown);
                             }//error close
                    });//$.ajax close
                    $(document).ajaxComplete(function(){   });
            }
        });

        //Employee And Admin Menu Items loads.
        function menuset(){
            if($.cookie('desid')==1){
                $("#homepage").attr("href", "#/employee/index/");
                $("#header_ele ul#head").append('<li><a id="emp_profile">Profile</a></li>');
                $("#emp_profile").attr("href", "#/employee/profile/");
                $("#header_ele ul#head").append('<li><a id="emp_changepassword">Change Password</a></li>');
                $("#emp_changepassword").attr("href", "#/employee/changepassword/");
                $("#header_ele ul#head").append('<li><a id="emp_logout">Logout</a></li>');
                $("#emp_logout").attr("href", "#/");

            }else if($.cookie('desid')==2){
                $("#homepage").attr("href", "#/employee/index/");
                $("#header_ele ul#head").append('<li><a id="emp_profile">Profile</a></li>');
                $("#emp_profile").attr("href", "#/employee/profile/");
                $("#header_ele ul#head").append('<li><a id="std_list_only">Student List</a></li>');
                $("#std_list_only").attr("href", "#/employee/studentlistonly/");
                $("#header_ele ul#head").append('<li><a id="designation_info">Designation</a></li>');
                $("#designation_info").attr("href", "#/employee/designation/");
                $("#header_ele ul#head").append('<li><a id="emp_designation">Employee Designation</a></li>');
                $("#emp_designation").attr("href", "#/employee/empdesignation/");
                $("#header_ele ul#head").append('<li><a id="emp_changepassword">Change Password</a></li>');
                $("#emp_changepassword").attr("href", "#/employee/changepassword/");
                $("#header_ele ul#head").append('<li><a id="emp_logout">Logout</a></li>');
                $("#emp_logout").attr("href", "#/");
            }else if($.cookie('desid')==3){
                $("#homepage").attr("href", "#/employee/index/");
                $("#header_ele ul#head").append('<li><a id="emp_profile">Profile</a></li>');
                $("#emp_profile").attr("href", "#/employee/profile/");
                $("#header_ele ul#head").append('<li><a id="stud_info">Student Info</a></li>');
                $("#stud_info").attr("href", "#/employee/stud_info/");
                $("#header_ele ul#head").append('<li><a id="std_list">Student List</a></li>');
                $("#std_list").attr("href", "#/employee/studentlist/");
                $("#header_ele ul#head").append('<li><a id="course_info">Course</a></li>');
                $("#course_info").attr("href", "#/employee/course/");
                $("#header_ele ul#head").append('<li><a id="dept_info">Department</a></li>');
                $("#dept_info").attr("href", "#/employee/department/");
                $("#header_ele ul#head").append('<li><a id="country_info">Cournty</a></li>');
                $("#country_info").attr("href", "#/employee/country/");
                $("#header_ele ul#head").append('<li><a id="state_info">State</a></li>');
                $("#state_info").attr("href", "#/employee/state/");
                $("#header_ele ul#head").append('<li><a id="city_info">City</a></li>');
                $("#city_info").attr("href", "#/employee/city/");
//                $("#header_ele ul#head").append('<li><a id="emp_designation">Employee Designation</a></li>');
//                $("#emp_designation").attr("href", "#/employee/empdesignation/");
                $("#header_ele ul#head").append('<li><a id="emp_changepassword">Change Password</a></li>');
                $("#emp_changepassword").attr("href", "#/employee/changepassword/");
                $("#header_ele ul#head").append('<li><a id="emp_logout">Logout</a></li>');
                $("#emp_logout").attr("href", "#/");
            }
            else{
                $("#homepage").attr("href", "#/employee/index/");
                $("#header_ele ul#head").append('<li><a id="emp_profile">Profile</a></li>');
                $("#emp_profile").attr("href", "#/employee/profile/");
                $("#header_ele ul#head").append('<li><a id="std_list_only">Student List</a></li>');
                $("#std_list_only").attr("href", "#/employee/studentlistonly/");
                $("#header_ele ul#head").append('<li><a id="emp_changepassword">Change Password</a></li>');
                $("#emp_changepassword").attr("href", "#/employee/changepassword/");
                $("#header_ele ul#head").append('<li><a id="emp_logout">Logout</a></li>');
                $("#emp_logout").attr("href", "#/");
            }
            return;
        }
    });
    $(function() {
          app.run('#/');
        });
})(jQuery);