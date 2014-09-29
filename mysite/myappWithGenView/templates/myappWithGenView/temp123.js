(function($) {
    var app=$.sammy(function() {
        this.element_selector = '#main';

        /*  *********************************** Home page routes begin ***********************************  */

        // Login Page
        this.get('#/', function(context) {
            context.log('LoginPage of Employee Information System');
             $("#header_ele ul#head li").remove();
            $("#main").load('/emp/login/');
            $("#homepage").attr("href","#/");
            $.removeCookie('user');
            $.removeCookie('type');
            localStorage.clear();
         });

        // Login Page Validation
        this.get('#/login/', function(context) {
            context.log('LoginPage Validation of Employee Information System');
            var usertype=$("input:radio[name=usertype]:checked").val();
            var username=$("#username").val();  var password=$("#password").val();
            if(username.length==0 || password.length==0)
            {
                $("#loginError").html("*Blank fields are not allowed");
                $("#loginError").css("color", "red");
                window.location.hash="/login/error/"
            }
            else if(usertype.match("admin")){
                var pk;
                $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                $.ajax({
                    url: "/emp/admin/",
                    type: "GET",
                    dataType:"json",
                    success: function (data) {
                        var flag = false;

                        $.each(data, function (key, value) {
                            if (username == value.email && password==value.password) {
                                flag = true;  pk=value.admin_id;
                            }
                        });

                        if (flag==true) {
                            $.cookie('user',''+pk+'');
                            $.cookie('type','admin');
                            window.location.hash="/index/"; }
                        else {

                            $("#loginError").html("*Please Check your Username or Password");
                            $("#loginError").css("color", "red");
                            window.location.hash="/login/error/"
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    }

                });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  }
            else if(usertype.match("employee")){
                $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                $.ajax({
                    url: "/emp/employee/",
                    type: "GET",
                    dataType:"json",
                    success: function (data) {
                        var flag1 = false; var pk=0;
                        $.each(data, function (key, value) {
                            if (username == value.emailid && password==value.password) {
                                flag1 = true;
                                pk=value.employee_id;
                            }
                        });

                        if (flag1==true) {
                            $.cookie('user',''+pk+'');
                            $.cookie('type','employee');
                            window.location.hash="/index/employee/"+pk+"/";
                           }
                        else {

                            $("#loginError").html("*Please Check your Username or Password");
                            $("#loginError").css("color", "red");
                            window.location.hash="/login/error/"
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    }

                });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  }

        });

        // Login error redirection
         this.get('#/login/error/', function(context) {});

        //Index page of admin
        this.get('#/index/', function(context) {
            context.log('HomePage of Employee Information System(Admin)');
            if($.cookie('user') && $.cookie('type').match('admin')) {
            var pk = $.cookie('user');
            $("#main").load('/emp/index/', function () {
                   if($("#header_ele ul#head li").length==0){ add(); }
                    if(localStorage.key("change")) { $("#msg").show().html(localStorage.getItem("change")).delay(5000).fadeOut();
                    localStorage.removeItem("change");    }
                });
            }
            else
            {
                window.location.hash="#/";
            }
         });

        //Index page of employee
        this.get('#/index/employee/:id?/', function(context) {
            context.log('HomePage of Employee Information System(Employee)');
                if($.cookie('user') && $.cookie('type').match('employee')) {
             var pk= $.cookie('user');
                $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                $.ajax({
                url: "/emp/employee/"+pk+"/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                  $("#main").load('/emp/employee_detail/',function(){

                  $("#back_detail").html("Edit details");
                  $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                             url: "/emp/department/"+data.department+"",
                              type: "GET",
                             dataType: "json",
                            success: function (data1) {
                                var dept=data1.department_name;
                                 $("#viewemp").html("Welcome "+data.ename+" ,Your Details");
                                            $("#ename2").text(data.ename);
                                            $("#age2").text(data.age);
                                            $("#email2").text(data.emailid);
                                            $("#mob2").text(data.mobno);
                                            $("#designation2").text(data.designation);
                                            $("#department2").text(data1.department_name);
                                            localStorage.setItem("empid",data.employee_id);
                                            localStorage.setItem("empname",data.ename);
                                            localStorage.setItem("department",dept); localStorage.setItem("did",data.department);
                                    $("#header_ele ul#head li").remove(); add();
                                if(localStorage.key("update1")) { $("#msg").show().html(localStorage.getItem("update1")).delay(5000).fadeOut();
                                localStorage.removeItem("update1");
                                }
                                if(localStorage.key("change")) { $("#msg").show().html(localStorage.getItem("change")).delay(5000).fadeOut();
                                localStorage.removeItem("change");
                                }

                     },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                } });
                $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                });
                 },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                } });
                $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
         }
            else
            {
                window.location.hash="#/";
            }

         });

        //Change password page
        this.get('#/change_password/:type?/?:value?/?:id?/', function(context) {
            context.log('Change Password');
             var old,new_p,re;
             var pk=context.params.id; var type=context.params.type; var value=context.params.value;
             if($.cookie('user')) {
                 if (value == 0) {
                     $("#main").load('/emp/change_password/', function () {
                         $("#error1").hide();
                         $("#error2").hide();
                         $("#error3").hide();
                         if (type.match('employee')) {
                               var pk = $.cookie('user');
                               if($("#header_ele ul#head li").length==0){ add(); }
                             $("#back_change").attr("href", "#/index/employee/" + pk + "/");
                             $("#change_pass").attr("href", "#/change_password/employee/1/" + pk + "/");
                         }
                         else if (type.match('admin')) {
                              var pk = $.cookie('user');
                           if($("#header_ele ul#head li").length==0){ add(); }
                            $("#back_change").attr("href", "#/index/");
                            $("#change_pass").attr("href", "#/change_password/admin/1/" + pk + "/");
                        }

                     });
                 }

                 else if (value == 1) {
                       if($("#header_ele ul#head li").length==0){ add(); }
                     var flag1, flag2, flag3;
                     old = $("#current").val();
                     new_p = $("#new").val();
                     re = $("#reenter").val();
                     if (old.length == 0) {
                         $("#error1").show();
                         $("#error1").html("*Empty Field is not allowed.");
                         $("#error1").css("color", "red");
                         flag1 = true;
                     }
                     else {
                         $("#error1").hide();
                         flag1 = false;
                     }
                     if (new_p.length == 0) {
                         $("#error2").show();
                         $("#error2").html("*Empty Field is not allowed.");
                         $("#error2").css("color", "red");
                         flag2 = true;
                     }
                     else if (new_p.length < 6 || new_p.length > 20) {
                         $("#error2").show();
                         $("#error2").html("*Password must be between 6 to 20 characters.");
                         $("#error2").css("color", "red");
                         flag2 = true;
                     }
                     else {
                         $("#error2").hide();
                         flag2 = false;
                     }
                     if (re.length == 0) {
                         $("#error3").show();
                         $("#error3").html("*Empty Field is not allowed.");
                         $("#error3").css("color", "red");
                         flag3 = true;
                     }
                     else if (!(re==new_p)) {
                         $("#error3").show();
                         $("#error3").html("*Password does not match.");
                         $("#error3").css("color", "red");
                         flag3 = true;
                     }
                     else {
                         $("#error3").hide();
                         flag3 = false;
                     }
                     if (flag1 == true || flag2 == true || flag3 == true) {
                         window.location.hash = "/change_password/" + type + "/2/" + pk + "/";
                     }
                     else {
                         if (type.match('employee')) {
                             $(document).ajaxStart(function () {
                                 $("#wait").css("display", "block");
                             });
                             $.ajax({
                                 url: "/emp/employee/" + pk + "/",
                                 type: "GET",
                                 dataType: "json",
                                 success: function (data1) {
                                     if (old==data1.password) {
                                         $(document).ajaxStart(function () {
                                             $("#wait").css("display", "block");
                                         });
                                         $.ajax({
                                             url: "/emp/employee/" + pk + "/",
                                             type: "PUT",
                                             data: { "ename": "" + data1.ename + "", "age": data1.age, "emailid": "" + data1.emailid + "", "mobno": data1.mobno, "designation": "" + data1.designation + "", "department": data1.department, "password": "" + new_p + ""},
                                             dataType: "json",
                                             success: function (data) {
                                                 localStorage.setItem("change","Your password is successfully updated.");
                                                 window.location.hash = "/index/employee/" + pk + "/";
                                             },
                                             error: function (xhr, status, errorThrown) {
                                                 console.log("Sorry, there was a problem!");
                                                 console.log("Error: " + errorThrown);
                                                 console.log("Status: " + status);
                                             }
                                         });
                                         $(document).ajaxComplete(function () {
                                             $("#wait").css("display", "none");
                                         });
                                     }
                                     else {
                                         $("#error1").show();
                                         $("#error1").html("*Please correct your current password.");
                                         $("#error1").css("color", "red");
                                         window.location.hash = "/change_password/" + type + "/2/" + pk + "/";
                                     }
                                 },
                                 error: function (xhr, status, errorThrown) {
                                     console.log("Sorry, there was a problem!");
                                     console.log("Error: " + errorThrown);
                                     console.log("Status: " + status);
                                 }
                             });
                             $(document).ajaxComplete(function () {
                                 $("#wait").css("display", "none");
                             });
                         }
                         else if (type.match('admin')) {
                             $(document).ajaxStart(function () {
                                 $("#wait").css("display", "block");
                             });
                             $.ajax({
                                 url: "/emp/admin/" + pk + "/",
                                 type: "GET",
                                 dataType: "json",
                                 success: function (data1) {
                                     if (old.match(data1.password)) {
                                         $(document).ajaxStart(function () {
                                             $("#wait").css("display", "block");
                                         });
                                         $.ajax({
                                             url: "/emp/admin/" + pk + "/",
                                             type: "PUT",
                                             data: { "email": "" + data1.email + "", "password": "" + new_p + ""},
                                             dataType: "json",
                                             success: function (data) {
                                                 localStorage.setItem("change","Your password is successfully updated.");
                                                 window.location.hash = "/index/";

                                             },
                                             error: function (xhr, status, errorThrown) {
                                                 console.log("Sorry, there was a problem!");
                                                 console.log("Error: " + errorThrown);
                                                 console.log("Status: " + status);
                                             }
                                         });
                                         $(document).ajaxComplete(function () {
                                             $("#wait").css("display", "none");
                                         });
                                     }
                                     else {
                                         $("#error1").show();
                                         $("#error1").html("*Please correct your current password.");
                                         $("#error1").css("color", "red");
                                         window.location.hash = "/change_password/" + type + "/2/" + pk + "/";
                                     }
                                 },
                                 error: function (xhr, status, errorThrown) {
                                     console.log("Sorry, there was a problem!");
                                     console.log("Error: " + errorThrown);
                                     console.log("Status: " + status);
                                 }
                             });
                             $(document).ajaxComplete(function () {
                                 $("#wait").css("display", "none");
                             });
                         }
                     }
                 }
                 else if (value == 2) {   if($("#header_ele ul#head li").length==0){ add(); }
                 }
             }
             else
            {
                window.location.hash="#/";
            }
        });

        /*  *********************************** Home page routes end ***********************************  */
        /*  *********************************** Department routes begin ***********************************  */

        // Main page List of Department
        this.get('#/department_list/', function(context) {
        context.log('Main page-->> List of Department');
         if($.cookie('user') && $.cookie('type').match('admin')) {
        $("#main").load('/emp/department_list/',function(){
          var pk = $.cookie('user');
          if($("#header_ele ul#head li").length==0){ add(); }
        $(document).ajaxStart(function(){$("#wait").css("display","block"); });
         $.ajax({
                     url: "/emp/department/",
                     type: "GET",
                     dataType: "json",
                     contentType:"application/json",
                     success: function (data) {
                         if(data.length==0) {
                             $("#department_list").append( "<tr id=\"nodata1\">"+ "<td class='alert-danger' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");

                         }
                         else
                         {

                         $.each(data,function(key,value){

                             //var obj = $.parseJSON( value );
                             $("#department_list").append( "<tr id="+value.department_id+">"+
                                 "<td>"+ value.department_name +"</td>"+
                                 "<td>"+ "<a class=\"view btn\" id="+value.department_id+" name="+value.department_name+" href=\"#/view_details/"+value.department_id+"/"+value.department_name+"/view/\">View Details</a>" +"</td>"+
                                 "<td>"+ "<a class=\"edit btn\" id="+value.department_id+" name="+value.department_name+" href=\"#/update_department/"+value.department_id+"/"+value.department_name+"/edit/0/\">Edit</a>" +"</td>"+
                                 "<td>"+ "<a class=\"delete btn\" id="+value.department_id+" name="+value.department_name+" href=\"#/delete_department/"+value.department_id+"/"+value.department_name+"/\">Delete</a>" +"</td>"+
                                 "</tr>");
                         });
                         }
                     },
                     error: function(xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }

            });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  });
            }
            else
            {
                window.location.hash="#/";
            }
           });

           // View details of department
         this.get('#/view_details/:id/?:name?/?:view?/', function(context) {
        context.log('View Details of department');
               if($.cookie('user')) {
              $("#main").load('/emp/view_details/',function(){
                 if($("#header_ele ul#head li").length==0){ add(); }
               var pk=context.params.id; var name=context.params.name; var view=context.params.view;
                  if(view.match('view')){
                      $("#back_view").attr("href","#/department_list/");
                  }
                  else
                  {
                       $("#back_view").attr("href","#/index/employee/"+view+"/");
                  }
         $(document).ajaxStart(function(){$("#wait").css("display","block"); });
        $.ajax({
            url: "/emp/employee/",
            type: "GET",
            dataType: "json",
            success: function(data){
                $("#viewdet").html("Employees of "+name+" department")
                    var flag=false;
                    $.each(data,function(key,value){
                            if(value.department==pk) {
                                flag=true;
                              $("#emp_list").append("<tr>" +
                                    "<td>" + value.ename + "</td>" +
                                     "<td>" + value.age + "</td>" +
                                     "<td>" + value.emailid + "</td>" +
                                    "<td>" + value.mobno + "</td>" +
                                    "<td>" + value.designation + "</td>" +
                                    "</tr>");
                            } });
                if(!flag) {
                    $("#emp_list").append( "<tr id=\"nodata3\">"+ "<td class='alert-danger' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");
                }
             },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });   });
         }
            else
            {
                window.location.hash="#/";
            }
           });

        // Update department details
         this.get('#/update_department/:id/?:name?/', function(context) {
           context.log('Update department details');
           if($("#header_ele ul#head li").length==0){ add(); }
             if($.cookie('user') && $.cookie('type').match('admin')) {
           var department=$("#id_department1").val();
             var pk=context.params.id;  var name=context.params.name;
         if (department.length == 0) {

                window.location.hash="/update_department/"+pk+"/"+name+"/edit/1/";
         }
         else {
            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
            $.ajax({
                url:  "/emp/department/",
                type: "GET",
                dataType:"JSON",
                success: function (data) {
                   data=JSON.parse(data);
                   var flag = false;
                    $.each((data), function (k,v) {
                        if (department == v.department_name) { flag = true;  }  });
                    if (flag == true) {
                        window.location.hash="/update_department/"+pk+"/"+name+"/edit/2/";
                    }
                    else {
                     $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                       $.ajax({
                            url: "/emp/department/" + pk + "/",
                            type: "PUT",
                            data: { "department_name": "" + department + "" },
                            dataType: "json",

                            success: function () {
                                window.location.hash="/department_list/";

                            },
                            error: function (xhr, status, errorThrown) {
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                            }
                        });  $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                    }
                },
         error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
        }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  }
        }
            else
            {
                window.location.hash="#/";
            }
       });


        //Edit department page
         this.get('#/update_department/:id/?:name?/?:edit?/?:value?/', function(context) {
        context.log('Edit department page');
            if($.cookie('user') && $.cookie('type').match('admin')) {
         var pk=context.params.id; var name=context.params.name;
         var value=context.params.value;
         if(value==0){

             $("#main").load('/emp/update_department/',function(){
                     if($("#header_ele ul#head li").length==0){ add(); }
                    $("#error2").hide();
                    $("#id_department1").val(name);
                    $("#id_department1").focus();
                    $(".update").attr("href","#/update_department/"+pk+"/"+name+"/");         }); }
         else if(value==1){
               if($("#header_ele ul#head li").length==0){ add(); }
               $("#error2").show();
               $("#error2").html("*Empty department field is not allowed!! Please try again");
               $("#error2").css("color", "red");
         }
         else if(value==2){
               if($("#header_ele ul#head li").length==0){ add(); }
               $("#error2").show();
               $("#error2").html("*This department already exists! Please try again!!");
               $("#error2").css("color", "red");
         }
                }
            else
            {
                window.location.hash="#/";
            }
           });

        //delete department
         this.get('#/delete_department/:id/?:name?/', function(context) {
         context.log('Delete department page');
         if($.cookie('user') && $.cookie('type').match('admin')) {
         if($("#header_ele ul#head li").length==0){ add(); }
         var pk=context.params.id; var name=context.params.name;
         var delValue=confirm("Do you really want to delete  "+ name + " department?");
         if(delValue==true) {
            url = "/emp/department/"+pk+"/";
            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "parseJSON",
                success: function () { window.location.hash="/department_list/"; },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }}); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
         }
         else{  window.location.hash="/department_list/"; }
           }
            else
            {
                window.location.hash="#/";
            }
         });

        // Add new department
         this.get('#/add_department/', function(context) {
           context.log('Add new department Page');
            if($.cookie('user') && $.cookie('type').match('admin')) {
           var department=$("#id_department").val();
                if($("#header_ele ul#head li").length==0){ add(); }
         if (department.length == 0) {

                window.location.hash="/new_department/new/1/";
         }
         else {
           url = "/emp/department/";
           var department = $("#id_department").val();
           $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType:"json",
                    success: function (data) {
                        var flag = false;

                        $.each(data, function (key, value) {
                            if (department == value.department_name) {

                                flag = true;
                            }
                        });

                        if (flag==true) {  window.location.hash="/new_department/new/2/"; }
                        else {
                            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: { "department_name": "" + department + "" },
                                dataType: "json",
                                success: function (data) {
                                        window.location.hash="/department_list/";
                                },
                                error: function (xhr, status, errorThrown) {
                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                            }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    }

                });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  }
                 }
            else
            {
                window.location.hash="#/";
            }

       });

        //new department page
         this.get('#/new_department/:new?/?:value?/', function(context) {
         context.log('New Department Page');
            if($.cookie('user') && $.cookie('type').match('admin')) {
         var value=context.params.value;
         if(value==0){
             $("#main").load('/emp/add_department/',function(){
                    if($("#header_ele ul#head li").length==0){ add(); }
                    $('#id_department').val(null);
                    $('#error1').hide("");
                    $("#id_department").focus();
             }); }
         else if(value==1){
             if($("#header_ele ul#head li").length==0){ add(); }
               $("#error1").show();
               $("#error1").html("*Empty department field is not allowed!! Please try again");
               $("#error1").css("color", "red");
         }
         else if(value==2){
             if($("#header_ele ul#head li").length==0){ add(); }
               $("#error1").show();
               $("#error1").html("*This department already exists! Please try again!!");
               $("#error1").css("color", "red");
         }
              }
            else
            {
                window.location.hash="#/";
            }
           });


        /*  *********************************** Department routes end ***********************************  */

        /*  *********************************** Employee routes begin ***********************************  */

         // Main page List of Employee
        this.get('#/employee_list/', function(context) {
        context.log('Main page-->> List of Employee');

        if($.cookie('user') && $.cookie('type').match('admin')) {
        $("#main").load('/emp/employee_list/',function(){
         if($("#header_ele ul#head li").length==0){ add(); }
             var pk = $.cookie('user');
             if($("#head li").length==0){ adminAdd(); }
         if(localStorage.key("email")) { $("#msg").show().html(localStorage.getItem("email")).delay(5000).fadeOut();
         localStorage.removeItem("email");  }
        $(document).ajaxStart(function(){$("#wait").css("display","block"); });
         $.ajax({
                url: "/emp/employee/",
                type: "GET",
                dataType: "json",
                success: function (data) {

                if (data.length == 0) {
                    $("#emp_list1").append("<tr id=\"nodata2\">" + "<td class='alert-danger' colspan='10'><center>" + "<b>No Data Found</b>" + "</center></td>" + "</tr>");
                }
                else {

                 $.each(data, function (key, value) {
                    $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                                $.ajax({
                                url:"/emp/department/" + value.department + "/",
                                type: "GET",
                                dataType: "json",
                                success: function(data){
                                           var dept_name=data.department_name;
                                    $("#emp_list1").append("<tr id=" + value.employee_id + ">" +
                                    "<td id=\"emp1\">" + value.ename + "</td>" +
                                    "<td id=\"emp2\">" + value.age + "</td>" +
                                    "<td id=\"emp3\">" + value.emailid+ "</td>" +
                                    "<td id=\"emp4\">" + value.mobno + "</td>" +
                                    "<td id=\"emp5\">" + value.designation + "</td>" +
                                    "<td id=\"emp6\">" + dept_name + "</td>" +
                                    "<td>" + "<a class=\"btn view\" id="+value.employee_id+" name="+value.ename+" href=\"#/employee_detail/"+value.employee_id+"/"+value.ename+"/\">View Details</a>"+"</td>" +
                                    "<td>" + "<a class=\"btn edit\" id="+value.employee_id+" name="+value.ename+" href=\"#/update_employee/"+value.employee_id+"/"+value.ename+"/edit/0/\">Edit</a>"  + "</td>" +
                                    "<td>"+ "<a class=\"btn delete\" id="+value.employee_id+" name="+value.ename+" href=\"#/delete_employee/"+value.employee_id+"/"+value.ename+"/\">Delete</a>" +"</td>"+
                                    "</tr>");


                                },
                                error:function (xhr, status, errorThrown) {
                                      console.log("Sorry, there was a problem!"); }
                                }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                 });
                }    },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);       }  });
            $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  });
             }
            else
            {
                window.location.hash="#/";
            }
           });

         // Add new Employee
         this.get('#/add_employee/', function(context) {
           context.log('Add new Employee page');

            if($.cookie('user') && $.cookie('type').match('admin')) {
             if($("#header_ele ul#head li").length==0){ add(); }
            var name=document.getElementById("ename_new");
            var age=document.getElementById("age_new");
            var email=document.getElementById("email_new");
            var mob=document.getElementById("mob_new");
            var designation=document.getElementById("designation_new");
            var id=$("#dropdepartment1").find('option:selected').attr("id");
            var department=$("#dropdepartment1").find('option:selected').attr("name");
             var flag1,flag2,flag3,flag4,flag5; var letters = /^[A-Za-z- ]+$/;
              if(name.value.length==0)
            {
                $("#new1").html("*Empty Name field is not allowed");  $("#new1").css("color","red"); flag1=false;
            }
            else if(!(name.value.match(letters)))
            {
                $("#new1").html("*Please input alphabet characters only."); $("#new1").css("color","red"); flag1=false;
            } else { $("#new1").html(""); flag1=true;}
            if(age.value.length==0)
            {
                $("#new2").html("*Empty Age field is not allowed"); $("#new2").css("color","red"); flag2=false;
            }
            else if(isNaN(age.value))
            {
                $("#new2").html("*Please input digits only."); $("#new2").css("color","red"); flag2=false;
            } else { $("#new2").html(""); flag2=true;}
              if(mob.value.length==0)
            {
                $("#new4").html("*Empty mobile no field is not allowed"); $("#new4").css("color","red"); flag3=false;
            }
               else if(isNaN(mob.value))
             {  $("#new4").html("*Only digits are allowed"); $("#new4").css("color","red"); flag3=false;}
             else if(!(mob.value.length == 10))
             {  $("#new4").html("*Only 10 digits are allowed"); $("#new4").css("color","red"); flag3=false;}else { $("#new4").html(""); flag3=true;}
             if(designation.value.length==0)
            {
                $("#new5").html("*Empty designation field is not allowed"); $("#new5").css("color","red"); flag4=false;
            }
            else if(!(designation.value.match(letters)))
            {
                $("#new5").html("*Please input alphabet characters only."); $("#new5").css("color","red"); flag4=false;
            } else { $("#new5").html(""); flag4=true;}
            var letters1=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
             if(email.value.length==0)
            {
                $("#new3").html("*Empty email id field is not allowed"); $("#new3").css("color","red"); flag5=false;
            }
            else if(!(email.value.match(letters1)))
            {
                $("#new3").html("*Please input correct email id."); $("#new3").css("color","red"); flag5=false;
            }

            else { $("#new3").html(""); flag5=true; }
             window.location.hash="/new_employee/new/1/"

            if(flag1 && flag2 && flag3 && flag4 && flag5)
            {
                var password=name.value+age.value;
                password = password.replace(/\s/g, '');
                url="/emp/employee/";
                 $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                 $.ajax({
                                url: url,
                                type: "POST",
                                data: { "ename": "" + name.value + "","age":  age.value ,"emailid": "" + email.value + "","mobno": mob.value,"designation": "" + designation.value + "" ,"department": id,"password": "" + password + "" },
                                dataType: "json",
                                //processData:false,
                               // contentType:"application/json",
                                success: function (data) {
                                    window.location.hash="/employee_list/"
                                    $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                                      $.ajax({
                                        url: "/emp/mail/"+name.value+"/"+password+"/"+email.value+"/",
                                        type: "GET",
                                        contentType:"application/json",
                                         success: function () {
                                            localStorage.setItem("email","Registration email successfully sent to "+name.value+"");
                                           // window.location.hash="/employee_list/"
                                          },
                                        error: function (xhr, status, errorThrown) {

                                            console.log("Sorry, there was a problem!");
                                            console.log("Error: " + errorThrown);
                                            console.log("Status: " + status);
                                }
                                }); },
                                error: function (xhr, status, errorThrown) {

                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                         });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
            }
            }
            else
            {
                window.location.hash="#/";
            }

       });

        //new employee page
         this.get('#/new_employee/:new?/?:value?/', function(context) {
         context.log('New Employee page');
               if($.cookie('user') && $.cookie('type').match('admin')) {
         var value=context.params.value;
         if(value==0){
             $("#main").load('/emp/add_employee/',function(){
                 if($("#header_ele ul#head li").length==0){ add(); }
                $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data) {
                                if(data.length==0){ $("#newerror").show(); $("#newemp").hide();}
                                else{
                                   $.each(data, function (key, value) {
                                       $("#newemp").show();
                                       var newOption = $('<option value="' + value.department_name + '" id=' + value.department_id + ' name="' + value.department_name + '">' + value.department_name + '</option>');
                                        $('#dropdepartment1').append(newOption);
                                }); }
                            },
                            error: function (xhr, status, errorThrown) {
                                        console.log("Sorry, there was a problem!");
                                        console.log("Error: " + errorThrown);
                                        console.log("Status: " + status);
                                }
                }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
             }); }
         else if(value==1) {  if($("#header_ele ul#head li").length==0){ add(); } }
                     }
            else
            {
                window.location.hash="#/";
            }
           });

          // View details of employee
         this.get('#/employee_detail/:id?/?:name?/', function(context) {
        context.log('view details of employee');
             if($.cookie('user') && $.cookie('type').match('admin')) {
        $("#main").load('/emp/employee_detail/',function(){
             if($("#header_ele ul#head li").length==0){ add(); }
            $("#back_detail").html("BACK");
            $("#back_detail").attr("href","#/employee_list/")
        var pk=context.params.id; var name=context.params.name;
          $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
         $.ajax({
                url:  "/emp/employee/"+pk+"/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                                url:"/emp/department/" + data.department + "/",
                                type: "GET",
                                dataType: "json",
                                success: function(data1){

                                            $("#viewemp").html("Details of "+data.ename+" ");
                                            $("#ename2").text(data.ename);
                                            $("#age2").text(data.age);
                                            $("#email2").text(data.emailid);
                                            $("#mob2").text(data.mobno);
                                            $("#designation2").text(data.designation);
                                            $("#department2").text(data1.department_name);
                                } });
                    $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });

                },
                 error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
         }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });    });
           }
            else
            {
                window.location.hash="#/";
            }
           });

         // Update employee details
         this.get('#/update_employee/:id/?:name?/?:edit?/', function(context) {
           context.log('Update Employee details');
                if($.cookie('user')) {
                     if($("#header_ele ul#head li").length==0){ add(); }
            var pk=context.params.id;  var name1=context.params.name; var edit=context.params.edit;
             var name=document.getElementById("ename1");
            var age=document.getElementById("age1");
            var email=document.getElementById("email1");
            var mob=document.getElementById("mob1");
            var designation=document.getElementById("designation1");
            var password=document.getElementById("password");
            var id=$("#dropdepartment").find('option:selected').attr("id");
            var department=$("#dropdepartment").find('option:selected').attr("name");
             var flag1,flag2,flag3,flag4,flag5; var letters = /^[A-Za-z- ]+$/;
            if(name.value.length==0)
            {
                $("#name1").html("*Empty Name field is not allowed"); $("#name1").css("color","red"); flag1=false;
            }
            else if(!(name.value.match(letters)))
            {
                $("#name1").html("*Please input alphabet characters only."); $("#name1").css("color","red"); flag1=false;
            } else { $("new1").html(""); flag1=true;}
            if(age.value.length==0)
            {
                $("#name1").html("*Empty Age field is not allowed"); $("#name1").css("color","red"); flag2=false;
            }
            else if(isNaN(age.value))
            {
                $("#name2").html("*Please input digits only."); $("#name2").css("color","red"); flag2=false;
            } else { $("#name2").html(""); flag2=true;}
              if(mob.value.length==0)
            {
                $("#name4").html("*Empty mobile no field is not allowed"); $("#name4").css("color","red"); flag3=false;
            }
              else if(isNaN(mob.value))
             {  $("#name4").html("*Only digits are allowed"); $("#name4").css("color","red"); flag3=false;}
             else if(!(mob.value.length == 10))
             {  $("#name4").html("*Only 10 digits are allowed"); $("#name4").css("color","red"); flag3=false;}
             else { $("#name4").html(""); flag3=true;}
             if(designation.value.length==0)
            {
                $("#name5").html("*Empty designation field is not allowed"); $("#name5").css("color","red"); flag4=false;
            }
            else if(!(designation.value.match(letters)))
            {
                $("#name5").html("*Please input alphabet characters only."); $("#name5").css("color","red"); flag4=false;
            } else { $("#new5").html(""); flag4=true;}
            var letters1=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
             if(email.value.length==0)
            {
                $("#name3").html("*Empty email id field is not allowed"); $("#name3").css("color","red"); flag5=false;
            }
            else if(!(email.value.match(letters1)))
            {
                $("#name3").html("*Please input correct email id."); $("#name3").css("color","red"); flag5=false;
            }

            else { $("#name3").html(""); flag5=true; }
              window.location.hash="#/update_employee/"+pk+"/"+name1+"/edit/1/"
            if(flag1 && flag2 && flag3 && flag4 && flag5)
            {
                $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
               $.ajax({
                                url: "/emp/employee/" + pk + "/",
                                type: "PUT",
                                data: { "ename": "" + name.value + "","age":  age.value ,"emailid": "" + email.value + "","mobno": mob.value ,"designation": "" + designation.value + "" ,"department": id, "password": "" + password.value + ""},
                                dataType: "json",
                                success: function (data) {
                                    if(edit.match('edit_employee')){
                                        localStorage.setItem("update1","Your details are successfully updated.");
                                        window.location.hash="/index/employee/"+pk+"/";
                                    }
                                    else{
                                    window.location.hash="/employee_list/";
                                    }
                                },
                                error: function (xhr, status, errorThrown) {

                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                         });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
            }
            }
            else
            {
                window.location.hash="#/";
            }
       });

        //Edit employee page
         this.get('#/update_employee/:id/?:name?/?:edit?/?:value?/', function(context) {
        context.log('Edit Employee page');
        if($("#header_ele ul#head li").length==0){ add(); }
         if($.cookie('user')) {
         var pk=context.params.id; var name=context.params.name;
         var value=context.params.value; var edit=context.params.edit;
         if(value==0){
             $("#main").load('/emp/update_employee/',function(){
                if(edit.match('edit_employee')) {
                $("#back_update").attr("href","#/index/employee/"+pk+"/")
                }
              $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
            $.ajax({
                url: "/emp/employee/"+pk+"/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                      $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data1) {
                                 $("#ename1").val(data.ename);
                                 $("#age1").val(data.age);
                                 $("#email1").val(data.emailid);
                                 $("#mob1").val(data.mobno);
                                 $("#designation1").val(data.designation);
                                 $("#password").val(data.password);
                                 var dept=data.department;
                                $.each(data1,function(key,value){
                                    if(value.department_id==dept) {

                                        var newOption = $('<option value="'+value.department_name+'" id='+value.department_id+' name="'+value.department_name+'" selected>'+value.department_name+'</option>');
                                        $('#dropdepartment').append(newOption);

                                    }
                                    else{
                                     var newOption = $('<option value="'+value.department_name+'" id='+value.department_id+' name="'+value.department_name+'">'+value.department_name+'</option>');
                                        $('#dropdepartment').append(newOption);
                                    }
                                });
                                 if(edit.match('edit_employee')) { $(".update").attr("href","#/update_employee/"+pk+"/"+name+"/edit_employee/");}
                                else{
                              $(".update").attr("href","#/update_employee/"+pk+"/"+name+"/edit/");}
                    },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                } });
                $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });

             }); }
         else if(value==1){  }
             }
            else
            {
                window.location.hash="#/";
            }
         });

        //delete employee
         this.get('#/delete_employee/:id/?:name?/', function(context) {
         context.log('Delete Employee page');
          if($.cookie('user') && $.cookie('type').match('admin')) {
               if($("#header_ele ul#head li").length==0){ add(); }
         var pk=context.params.id; var name=context.params.name;
         var delValue=confirm("Do you really want to delete  "+ name + " named employee?");
         if(delValue==true) {
            url = "/emp/employee/"+pk+"/";
            $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "parseJSON",
                success: function () {
                    $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                     url: "/emp/employee/",
                     type: "GET",
                     dataType: "json",
                     success: function (data) {
                            window.location.hash="/employee_list/";
                         }  });
                    $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
        }
         else{   window.location.hash="/employee_list/"; }
         }
            else
            {
                window.location.hash="#/";
            }
         });


        /*  *********************************** Employee routes end ***********************************  */
         /*  *********************************** Functions start ***********************************  */
        function add()
        {

             var pk = $.cookie('user'); var type= $.cookie('type');
            if(type.match('admin')) {
                $("#homepage").attr("href", "#/index/");
                $("#header_ele ul#head").append('<li><a id="employee_list">Employee Details</a></li>');
                $("#employee_list").attr("href", "#/employee_list/");
                $("#header_ele ul#head").append('<li><a id="dept_detail">Department Details</a></li>');
                $("#dept_detail").attr("href", "#/department_list/");
                $("#header_ele ul#head").append('<li><a id="change_password">Change password</a></li>');
                $("#change_password").attr("href", "#/change_password/admin/0/" + pk + "/");
                $("#header_ele ul#head").append('<li><a id="logout">LogOut</a></li>');
                $("#logout").attr("href", "#/");

            }
            else if(type.match('employee')){
                var id=localStorage.getItem("empid"); var name=localStorage.getItem("empname");
                var department=localStorage.getItem("department"); var dept=localStorage.getItem("did");
                $("#homepage").attr("href","#/index/employee/"+pk+"/");
                $("#back_detail").attr("href","#/update_employee/"+id+"/"+name+"/edit_employee/0/");
                $("#header_ele ul#head").append('<li><a id="edit_personal">Edit Personal Info</a></li>');
                $("#edit_personal").attr("href","#/update_employee/"+id+"/"+name+"/edit_employee/0/");
                $("#header_ele ul#head").append('<li><a id="dep_detail">Department Details</a></li>');
                $("#dep_detail").attr("href","#/view_details/"+dept+"/"+department+"/"+pk+"/");
                $("#header_ele ul#head").append('<li><a id="change_password">Change password</a></li>');
                $("#change_password").attr("href","#/change_password/employee/0/"+pk+"/");
                $("#header_ele ul#head").append('<li><a id="logout">LogOut</a></li>');
                $("#logout").attr("href","#/");

            }
              return;
        }

         /*  *********************************** Functions end ***********************************  */
    });
    $(function() {
          app.run('#/');
        });

})(jQuery);