jQuery.validator.setDefaults({
  highlight: function (element, errorClass, validClass) {
    $(element).addClass("is-invalid");
  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass("is-invalid");
  },
});
$("#wish-form")
  .submit(function (e) {
    e.preventDefault();
  })
  .validate({
    submitHandler: function () {
      var afterForm = "<div class='after-form'></div>";
      var spinner = "<span>Loading...</span>";
      var name = $("input#name").val();
      var msg = $("textarea#message").val();
      $.ajax({
        url: "action/send.php",
        method: "POST",
        data: { name: name, msg: msg },
        beforeSend: function () {
          $("#wish-form").html(afterForm);
          $("#wish-form").css("justify-content", "center");
          $(".after-form").html(spinner);
        },
        success: function (r) {
          $(".after-form").addClass("form-success");
          setTimeout(function () {
            $(".after-form").html(r);
          }, 2000);
        },
        error: function (e) {
          $(".after-form").addClass("form-fail");
          setTimeout(function () {
            $(".after-form").html(e);
          }, 2000);
        },
      });
    },
  });
