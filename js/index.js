(function () {
	'use strict'

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')

	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				}

				form.classList.add('was-validated')
			}, false)
		})
})()

// scrollTop

const scroll_button=document.getElementById('scroll_top');

scroll_button.addEventListener("click",()=>{
	scrollTo({
		top:0,
		behavior:"smooth"
	})
});

window.onscroll=function(event){
	if(this.scrollY < 500){
		document.getElementById('scroll_top').style.display="none";
	}
	else{
		document.getElementById('scroll_top').style.display="block"
	}
}




$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})


$(document).ready(function(){
	
	$('ul.tabs_client li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs_client li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})


$(document).ready(function(){
	
	$('.budget_button').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.budget_button').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})

$(window).scroll(function() {
	var a = 0;
	var oTop = $('#counter').offset().top - window.innerHeight;
	console.log($('#counter').offset().top);
	if (a == 0 && $(window).scrollTop() > oTop) {
	  $('.counter-value').each(function() {
		var $this = $(this),
		  countTo = $this.attr('data-count');
		$({
		  countNum: $this.text()
		}).animate({
			countNum: countTo
		  },
  
		  {
  
			duration: 2000,
			easing: 'swing',
			step: function() {
			  $this.text(Math.floor(this.countNum));
			},
			complete: function() {
			  $this.text(this.countNum);
			  //alert('finished');
			}
  
		  });
	  });
	  a = 1;
	}
  
  });


  const stepButtons = document.querySelectorAll('.step-button');
const progress = document.querySelector('#progress');

Array.from(stepButtons).forEach((button,index) => {
    button.addEventListener('click', () => {
        progress.setAttribute('value', index * 100 /(stepButtons.length - 1) );//there are 3 buttons. 2 spaces.

        stepButtons.forEach((item, secindex)=>{
            if(index > secindex){
                item.classList.add('done');
            }
            if(index < secindex){
                item.classList.remove('done');
            }
        })
    })
});


TweenMax.to(".overlayss h1", 2, {
	opacity: 0,
	y: -60,
	ease: Expo.easeInOut
  })
  
  TweenMax.to(".overlayss span", 2, {
	delay: 2,
	opacity: 0,
	y: -60,
	ease: Expo.easeInOut
  })
  
  TweenMax.to(".overlayss", 1, {
	delay: 2,
	top: "-100%",
	ease: Expo.easeIn,
	display:'none'
  });


  
  (function () {
    const header_mobile = document.querySelector('.header_mobile');
      const icon = document.querySelector('.icon-container');
      const icon1 = document.querySelector('.icon-container1');
      icon.onclick = function () {
          header_mobile.classList.toggle('menu-open');
      }
      icon1.onclick = function () {
          header_mobile.classList.toggle('menu-open');
      }
  }());