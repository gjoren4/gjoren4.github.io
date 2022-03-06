$(document).ready(function () {
  $(".circular").tooltip();

  $("#randomizeEmojis").modal("hide");
  const ppEmailRegistered = localStorage.getItem("ppEmailRegistered");
  if (!!ppEmailRegistered) {
    $("#staticBackdrop").modal("hide");
  } else {
    $("#staticBackdrop").modal("show");
  }

  let state = [];
  const animate = (container) => {
    if (state[container]) {
      $(`.slots.${container}`).removeClass("loop");
      setTimeout(function () {
        $(`.slots.${container}`).addClass("stop");
      }, 1);
      state[container] = false;
    } else {
      $(`.slots.${container}`).removeClass("stop");
      $(`.slots.${container}`).addClass("loop");
      state[container] = true;
    }
  };

  const getRandomEmoji = () => {
    const isAnimated = $("#animatedEmoji").prop("checked");
    const emojis = isAnimated ? animatedEmojis : standardEmojis;

    const index = Math.floor(Math.random() * emojis.length + 1);
    const emojiUrl = isAnimated ? "emoji-animated" : "emoji-standard";
    return `<img src="assets/${emojiUrl}/${emojis[index - 1]}">`;
  };

  const displayEmoji = (container) => {
    $(`.emoji.${container}`).html("");
    const emojis = [];
    emojis[container] = [];
    for (let i = 0; i < 20; i++) {
      let emoji = getRandomEmoji();
      while (emojis[container].includes(emoji)) {
        emoji = getRandomEmoji();
      }
      emojis[container].push(emoji);

      $(`.emoji.${container}`).append(
        `<div>${emoji}</div>`
      );
    }

    animate(container);

    setTimeout(() => {
      animate(container);
    }, 1000);
  };

  $("#mainBtn").click(() => {
    $("#mainBtn > i").removeClass("d-none");
    displayEmoji("mainIdea");
  });

  $("#sentence2Btn").click(() => {
    $("#sentence2Btn > i").removeClass("d-none");
    displayEmoji("sentence2");
  });

  $("#sentence3Btn").click(() => {
    $("#sentence3Btn > i").removeClass("d-none");
    displayEmoji("sentence3");
  });

  $("#sentence4Btn").click(() => {
    $("#sentence4Btn > i").removeClass("d-none");
    displayEmoji("sentence4");
  });

  $("#endBtn").click(() => {
    $("#endBtn > i").removeClass("d-none");
    displayEmoji("endSentence");
  });

  $("#signup-form").submit((e) => {
    e.preventDefault();
    const form = $("#signup-form");
    const data = new FormData(form[0]);
    const action = e.target.action;
    $(".modal-body #signup-form .btnSubmit").addClass("d-none");
    $(".modal-body #signup-form .processing").removeClass("d-none");

    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      localStorage.setItem("ppEmailRegistered", true);
      $(".modal-content").addClass("thank-you")
      $(".modal-body > .form-container").html(
        "<div class='d-flex flex-column align-items-center'><img src='assets//images/thankyou_header.png' class='img-fluid' /><div><span class='font-bold'>Congratulations </span>you are one step closer to</div><div class='font-bold'>#TeachBetterWorkLess</div></div>"
      );
      setTimeout(() => {
        $("#staticBackdrop").modal("hide");
      }, 3000);
    });
  });

  let countdown;
  const reset = () => {
    clearInterval(countdown);
    $(".countdown").addClass("d-none");
    $(".circle .left .progress").css("animation", "none")
    $(".circle .right .progress").css("animation", "none")
    $('.circular').removeClass("d-none");
    $('.circular input').removeClass("d-none");
    $(".number").val("");
    $('.circular input').focus();
  }

  $("#showTimer").click(() => {
    const isShowTimer = $("#showTimer").prop("checked");
    reset();
    if (!isShowTimer) {
      $('.circular').addClass("d-none");
    }
  })

  $(".number").on("keypress", (e) => {
    if (e.which === 13) {
      const length = parseFloat($(".number").val());
      const inSeconds = length * 60;
      /**set animation css prop */
      $(".circle .left .progress").css("animation", `left ${inSeconds / 2}s linear both`)
      $(".circle .right .progress").css("animation", `right ${inSeconds / 2}s linear both`)
      $(".circle .right .progress").css("animation-delay", `${inSeconds / 2}s`)

      let minutes = parseInt(length);
      let seconds = (length - minutes) * 60;
      $(".number").addClass("d-none");
      $(".countdown").removeClass("d-none");
      $(".countdown").text(`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
      
      countdown = setInterval(() => {
        if (seconds === 0 && minutes > 0) {
          minutes--;
          seconds = 60;
        }
        seconds--;

        if (seconds === 0 && minutes === 0) {
          clearInterval(countdown);
          setTimeout(() => {
            $(".countdown").html('<span class="reset-timer p-3"><i class="fa fa-undo"></i></span>');
          }, 1000)
        }

        $(".countdown").text(`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
      }, 1000)
    }
  });

  $(".circular").on("click", ".reset-timer", () => {
    reset();
  })
});
