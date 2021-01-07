new WOW().init();

$(document).ready(function () {
  $(".slider").slick({
    infinite: true, //бесконечная прокрутка
    slidesToShow: 1, //сколько слайдов показывать
    slidesToScroll: 1, //сколько слайдов скроллить
    arrows: false, //стрелки
    dots: true, //буллеты(точки)
    adaptiveHeight: true, //адаптивная высота(под каждый слайд)
    //+ align-items: flex-start; в .slick-track
    speed: 500, //скорость пролистывания в мс
    easing: "linear", //тип анимации пролистывания
    //http://fls.guru/csstransition.html -> timing-duration-function
    initialSlide: 0, //начальный слайд
    autoplay: false, //автопролистывание
    autoplaySpeed: 1000, //пауза
    pauseOnFocus: true, //пауза при клике куда то
    pauseOnHover: true, //при наведении
    pauseOnDotsHover: true, //при наведении на точки
    draggable: true, // свайп на ПК
    swipe: true, // свайп на мобилках
    waitForAnimate: true, //дожидаться конца анимации чтобы пролистать дальше
    centerMode: false, //один слайд по центру с классом slick-center
    variableWidth: true, //автоматическая ширина под ширину контента слайда
    centerMode: true,
    rows: 1, //слайды в несколько строк
    slidesPerRow: 1, //колличество слайдов в ряду
    vertical: false, // вертикальный слайдер
    verticalSwiping: false,
    //.slider .slick-track > display: block;
    //стоит указывать высоту для слайда
    fade: false, //слайды заменяютс плавным переходом
    //необходим slidesToShow: 1

    //адаптив через бейкпоинты
    responsive: [
      {
        breakpoint: 945,
        settings: {
          variableWidth: true,
        },
      },
    ],
    // mobileFirst: false, меняет max-width на min-width
    //data-lazy в верстке для оптимизации загрузки
    //   appendArrows: $(".section-service__title .section-service__buttons"),
    // appendDots:$('.block')
  });

  $("a.bottomLink").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 500,
        easing: "swing",
      }
    );
    return false;
  });

  const contacts = {
    name :'',
    contact:'',
  };

  const form = document.querySelector(".contacts-form");
  // console.log(form);


  const sendForm = () => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      contacts.name = document.getElementById("input-name").value;
      contacts.contact = document.getElementById("input-phone").value;
      // console.log(JSON.stringify(contacts));

        postData(contacts)
        .then((res) => res.json())
        .then((res) => {
          if (res["status"] === "ok") {
            
            form.reset();
            form.style.display = "none";
            alert(res["message"]);
          } else if (res["status"] === "error") {
            alert(res["message"]);
          }
        });
    });
  };

  const postData = (body) => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  sendForm();

});

//   console.log($('.slider').length);
