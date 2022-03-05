$(document).ready(function () {
  $("#tagline").tooltip();

  $("#randomizeEmojis").modal("hide");
  const ppEmailRegistered = localStorage.getItem("ppEmailRegistered");
  if (!!ppEmailRegistered) {
    $("#staticBackdrop").modal("hide");
  } else {
    $("#staticBackdrop").modal("show");
  }

  let state = false;
  const animate = (container) => {
    if (state) {
      $(`.slots${container}`).removeClass("loop");
      setTimeout(function () {
        $(`.slots${container}`).addClass("stop");
      }, 1);
    } else {
      $(`.slots${container}`).removeClass("stop");
      $(`.slots${container}`).addClass("loop");
    }
    state = !state;
  };

  const getRandomEmoji = () => {
    const isAnimated = $("#animatedEmoji").prop("checked");
    const emojis = isAnimated ? animatedEmojis : standardEmojis;

    const index = Math.floor(Math.random() * emojis.length + 1);
    const emojiUrl = isAnimated ? "emoji-animated" : "emoji-standard";
    return `<img src="assets/${emojiUrl}/${emojis[index - 1]}">`;
  };

  const displayEmoji = (container) => {
    $(`.emoji${container}`).html("");
    const emojis = [];
    for (let i = 0; i < 20; i++) {
      let emoji = getRandomEmoji();
      while (emojis.includes(emoji)) {
        emoji = getRandomEmoji();
      }
      emojis.push(emoji);

      $(`.emoji${container}`).append(
        `<div>${emoji}</div>`
      );
    }

    animate(container);

    let randomizeEmojis = new Promise((resolve, reject) => {
      setTimeout(() => {
        animate(container);
        resolve();
      }, 1000);
    });

    randomizeEmojis.then(() => {
      setTimeout(() => {
        // $(container).html(emojis[1]);
      }, 1250);
    });
  };

  $("#mainBtn").click(() => {
    $("#mainBtn > i").removeClass("d-none");
    displayEmoji(".mainIdea");
  });

  $("#sentence2Btn").click(() => {
    $("#sentence2Btn > i").removeClass("d-none");
    displayEmoji(".sentence2");
  });

  $("#sentence3Btn").click(() => {
    $("#sentence3Btn > i").removeClass("d-none");
    displayEmoji(".sentence3");
  });

  $("#sentence4Btn").click(() => {
    $("#sentence4Btn > i").removeClass("d-none");
    displayEmoji(".sentence4");
  });

  $("#endBtn").click(() => {
    $("#endBtn > i").removeClass("d-none");
    displayEmoji(".endSentence");
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
});
