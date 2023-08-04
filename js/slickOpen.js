$('.all_items').slick({
    dots:false,
  slidesToShow: 5.2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 500,
  speed:700,
  infinite: true,
  nextArrow:false,
          prevArrow:false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
  });
  


  $('.single_item').slick({
    dots:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    speed:1500,
    infinite: true,
    arrows:false,
    pauseOnHover:false
  });


  $('.multiple_item').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    autoplay:false,
    autoplaySpeed: 1000,
    infinite:true,
    nextArrow:'<h2 class="slick_open_right" style=""><i class="bi bi-arrow-right"></i></h2>',
          prevArrow:'<h2 class="slick_open_left"><i class="bi bi-arrow-left"></i></h2>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2.6,
                slidesToScroll: 1,
                infinite: false,
           
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1,
                arrows:false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1,
                arrows:false,
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
  });


  $('.slide_estimator_close').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1000,
    autoplay:false,
    arrows:false,
    autoplaySpeed: 1000,
    infinite:true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1.4,
                slidesToScroll: 1,
                infinite: false,
           
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1.1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
  });


  $('.slide_estimator_close1').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1000,
    autoplay:false,
    arrows:false,
    autoplaySpeed: 1000,
    infinite:true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2.2,
                slidesToScroll: 1,
                infinite: false,
           
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1.1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
  });