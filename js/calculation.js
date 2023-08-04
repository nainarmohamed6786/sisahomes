// Form Validation
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    });
  })()

// Conditional Input
$( "#groundFloorCheck" ).change(function() {
    if ($("#groundFloorCheck").prop( "checked" )) {
        $( "#floorCount" ).prop( "disabled", true );
    }
    else{
        $( "#floorCount" ).prop( "disabled", false );
    }
}).change();

// Construction Estimator

const formDetails = document.getElementById("quoteCalculator");
formDetails.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    // Initial Value Declarations
    var basicPerSqft = 1499
    var standardPerSqft = 1799		
    var deluxePerSqft = 2149
    var premiumPerSqft = 2599
    var groundOnly = 250
    var plotSizePerCar = 135
    var chennaiPrice = 350
    var isOnlyGroundFloor = 0

    // Number Format
    const numberFormat = {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    }

    // Input Declarations
    var location = document.getElementById("location").value;
    var plotSize = document.getElementById("plotSize").value;
    var floorCount = document.getElementById("floorCount").value;
    var clim=document.getElementById('value_validate')
    var carCount = document.getElementById("carCount").value;
    var eachFloorSize = Math.floor(plotSize * 0.8)
    var carText = carCount > 1 ? 'Cars' : 'Car'
    var floorText = floorCount > 1 ? 'Floors' : 'Floor'

    // Location Based Price Change
    if (location === 'Chennai'){
        basicPerSqft = basicPerSqft + chennaiPrice
        standardPerSqft = standardPerSqft + chennaiPrice
        deluxePerSqft = deluxePerSqft + chennaiPrice
        premiumPerSqft = premiumPerSqft + chennaiPrice
    }




    if (($("#groundFloorCheck").prop("checked"))){
        if (($("#location").val().length > 0) && ($("#carCount").val().length > 0) && ($("#plotSize").val().length > 0)) {

            // Only Ground Floor Initial Declarations
            // Basic
            var basicPerSqft = basicPerSqft +  groundOnly
            var parkingBasic = Math.floor(basicPerSqft * 0.7) 

            // Standard
            var standardPerSqft = standardPerSqft + groundOnly	
            var parkingStandard = Math.floor(standardPerSqft * 0.7) 

            // Deluxe
            var deluxePerSqft = deluxePerSqft + groundOnly
            var parkingDeluxe = Math.floor(deluxePerSqft * 0.7) 


       

            // Premium
            var premiumPerSqft = premiumPerSqft + groundOnly
            var parkingPremium = Math.floor(premiumPerSqft * 0.7) 
            
            // Calculations
            var carPlotSize = (carCount * plotSizePerCar)
            var groundFloorSize = eachFloorSize - carPlotSize
            var builtUpSize = eachFloorSize + carPlotSize

            // Basic
            var groundFloorBasic = (groundFloorSize * basicPerSqft)
            var parkingBasic = (carPlotSize * parkingBasic)
            var totalBasic = groundFloorBasic + parkingBasic 

            // Standard
            var groundFloorStandard = (groundFloorSize * standardPerSqft)
            var parkingStandard = (carPlotSize * parkingStandard)
            var totalStandard = groundFloorStandard + parkingStandard

            // Deluxe
            var groundFloorDeluxe = (groundFloorSize * deluxePerSqft)
            var parkingDeluxe = (carPlotSize * parkingDeluxe)
            var totalDeluxe = groundFloorDeluxe + parkingDeluxe

            // Premium
            var groundFloorPremium = (groundFloorSize * premiumPerSqft)
            var parkingPremium = (carPlotSize * parkingPremium)
            var totalPremium = groundFloorPremium + parkingPremium



            
            $("#packageDisplay").html(
                `
                <h1 class="Your_Cost_Estimate" id="">Your Cost Estimate</h1>

				<div class="row mt-5">


				<div class="col-lg-3 col-md-6 col-12">
				<div class="card card_estimator">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Basic</h2>
				<small class="small_estimator">${location==="Chennai" ? "₹ 1,849/sqft (incl, GST)" : "₹ 1,499/sqft (excl, GST)"} </small>
				</div>
		
				<div class="card-body">

				<div class="d-flex justify-content-between align-items-center">

				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorBasic.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingBasic.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalBasic.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>


				

				<div class="col-lg-3 col-md-6 col-12">
				<div class="card card_estimator1">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Standard</h2>
				 <small class="small_estimator">${location==="Chennai" ? "₹ 2,149/sqft (incl, GST)" : "₹ 1,799/sqft (excl, GST)"}</small>
				</div>
				<div class="card-body">


				<div class="d-flex justify-content-between align-items-center">
				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorStandard.toLocaleString('en-IN', numberFormat) +`</p>
				</div>

				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingStandard.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalStandard.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>


				<div class="col-lg-3 col-md-6 col-12 mt-lg-0 mt-5"  >
				<div class="card card_estimator2">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Deluxe</h2>
				 <small class="small_estimator">${location==="Chennai" ? "₹ 2,499/sqft (incl, GST)" :"₹ 2,149/sqft (excl, GST)" }</small>
				</div>
				<div class="card-body">


				<div class="d-flex justify-content-between align-items-center">
				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorDeluxe.toLocaleString('en-IN', numberFormat) +`</p>
				</div>


				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingDeluxe.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalDeluxe.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>


				<div class="col-lg-3 col-md-6 col-12 card_premium_estimate_value">
				<div class="card card_estimator3 mt-lg-0 mt-5">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Premium</h2>
				 <small class="small_estimator">${location==="Chennai" ? "₹ 2,949/sqft (incl, GST)" : "₹ 2,599/sqft (excl, GST)"}</small>
				</div>
				<div class="card-body">


				<div class="d-flex justify-content-between align-items-center">
				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorPremium.toLocaleString('en-IN', numberFormat) +`</p>
				</div>


				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingPremium.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalPremium.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>

						</div>


                `
            )
        }
    }
    else{
        if (($("#location").val().length > 0) && ($("#carCount").val().length > 0) && ($("#plotSize").val().length > 0)) {
            // Initial Declarations, given No. of Floors
            // Basic
            var parkingBasic = Math.floor(basicPerSqft * 0.7) 

            // Standard
            var parkingStandard = Math.floor(standardPerSqft * 0.7) 

            // Deluxe
            var parkingDeluxe = Math.floor(deluxePerSqft * 0.7) 

            // Premium
            var parkingPremium = Math.floor(premiumPerSqft * 0.7) 
            
            // Calculations
            var carPlotSize = (carCount * plotSizePerCar)
            var groundFloorSize = eachFloorSize - carPlotSize
            var floorSize = eachFloorSize * floorCount
            var builtUpSize = carPlotSize + groundFloorSize + floorSize

            // Basic
            var groundFloorBasic = (groundFloorSize * basicPerSqft) 
            var eachFloorBasic = (floorSize * basicPerSqft)
            var parkingBasic = (carPlotSize * parkingBasic)
            var totalBasic = groundFloorBasic + eachFloorBasic + parkingBasic 

            // Standard
            var groundFloorStandard = (groundFloorSize * standardPerSqft) 
            var eachFloorStandard = (floorSize * standardPerSqft)
            var parkingStandard = (carPlotSize * parkingStandard)
            var totalStandard = groundFloorStandard + eachFloorStandard + parkingStandard

            // Deluxe
            var groundFloorDeluxe = (groundFloorSize * deluxePerSqft) 
            var eachFloorDeluxe = (floorSize * deluxePerSqft)
            var parkingDeluxe = (carPlotSize * parkingDeluxe)
            var totalDeluxe = groundFloorDeluxe + eachFloorDeluxe + parkingDeluxe

            // Premium
            var groundFloorPremium = (groundFloorSize * premiumPerSqft) 
            var eachFloorPremium = (floorSize * premiumPerSqft)
            var parkingPremium = (carPlotSize * parkingPremium)
            var totalPremium = groundFloorPremium + eachFloorPremium + parkingPremium

            $("#packageDisplay").html(
                `
                <h1 class="Your_Cost_Estimate" id="">Your Cost Estimate</h1>

				<div class="row mt-5">


				<div class="col-lg-3 col-md-6 col-12">
				<div class="card card_estimator">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Basic</h2>
				<small class="small_estimator">${location==="Chennai" ? "₹ 1,849/sqft (incl, GST)" : "₹ 1,499/sqft (excl, GST)"}</small>
				</div>
		
				<div class="card-body">

				<div class="d-flex justify-content-between align-items-center">

				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorBasic.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
			

				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Total Floor Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ floorCount + ` - ` + floorText + `Size &nbsp;|&nbsp;`+ floorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ eachFloorBasic.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingBasic.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalBasic.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>


				

				<div class="col-lg-3 col-md-6 col-12">
				<div class="card card_estimator1">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Standard</h2>
				 <small class="small_estimator">${location==="Chennai" ? "₹ 2,149/sqft (incl, GST)" : "₹ 1,799/sqft (excl, GST)"}</small>
				</div>
				<div class="card-body">


				<div class="d-flex justify-content-between align-items-center">
				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorStandard.toLocaleString('en-IN', numberFormat) +`</p>
				</div>


				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Total Floor Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ floorCount + ` - ` + floorText + `Size &nbsp;|&nbsp; `+ floorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ eachFloorStandard.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingStandard.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalStandard.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>


				<div class="col-lg-3 col-md-6 col-12">
				<div class="card card_estimator2">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Deluxe</h2>
				 <small class="small_estimator">${location==="Chennai" ? "₹ 2,499/sqft (incl, GST)" :"₹ 2,149/sqft (excl, GST)" }</small>
				</div>
				<div class="card-body">


				<div class="d-flex justify-content-between align-items-center">
				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorDeluxe.toLocaleString('en-IN', numberFormat) +`</p>
				</div>


				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Total Floor Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ floorCount + ` - ` + floorText + `Size &nbsp;|&nbsp;`+ floorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ eachFloorDeluxe.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingDeluxe.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalDeluxe.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>


				<div class="col-lg-3 col-md-6 col-12">
				<div class="card card_estimator3">
				<div class="card-header mt-4">
                 <h2 class="header_estimator_head">Premium</h2>
				 <small class="small_estimator">${location==="Chennai" ? "₹ 2,949/sqft (incl, GST)" : "₹ 2,599/sqft (excl, GST)"}</small>
				</div>
				<div class="card-body">


				<div class="d-flex justify-content-between align-items-center">
				<p class="text-start estimate_floor_calculate"> Ground Floor  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Size - `+ groundFloorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ groundFloorPremium.toLocaleString('en-IN', numberFormat) +`</p>
				</div>


				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Total Floor Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ floorCount + ` - ` + floorText + `Size &nbsp;|&nbsp;`+ floorSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ eachFloorPremium.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3">
				<p class="text-start estimate_floor_calculate"> Parking Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">`+ carCount + ` - ` + carText + `Size &nbsp;|&nbsp; `+ carPlotSize +` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ parkingPremium.toLocaleString('en-IN', numberFormat) +`</p>
				</div>



				<div class="d-flex justify-content-between align-items-center mt-3 total_estimate_calculate pt-4">
				<p class="text-start estimate_floor_calculate "> Total Cost  <br>
                      <span class="fs-6 fw-light fst-italic size_para_span">Built-up Area - `+ builtUpSize + ` sqft</span>
												</p>
	<p class="text-end estimate_floor_calculate">`+ totalPremium.toLocaleString('en-IN', numberFormat) +`</p>
				</div>
				</div>
				</div>
				</div>

						</div>
                `
            )
        }
    }
})

function comparePackages(package) {
    var basicHTML = `
    <section class="accordion " id="accordionFlushExample">
    <section class="card card_estimator_choice">
        <h2 class="card_header collapsed" id="flush-headingTwo" data-toggle="collapse" data-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
          <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
              <span class="fw-semibold">Car Porch Area</span>
          </button>
        </h2>
        <section id="flush-collapseTwo" class="collapse " aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
          <section class="card-body card_estimate_calculte_body">
              <span class="fw-semibold subheading_calculate">Flooring</span>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Paver tiles up to Rs 80/sqft</li>
              </ul>
          </section>
          <section class="card-body card_estimate_calculte_body">
              <span class="fw-semibold subheading_calculate">Electrical And Plumbing</span>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">As per Architects plan</li>
              </ul>
          </section>
        </section>
      </section>


<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingThree" data-toggle="collapse" data-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Entrance Area</span>
        </button>
      </h2>
      <section id="flush-collapseThree" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item elevent_space_items">Polished granite flooring up to Rs 75/sqft</li>
            </ul>
        </section>
      </section>
    </section>


<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Verandah/Foyer</span>
        </button>
      </h2>
      <section id="flush-collapseFour" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Granite flooring up to Rs 110/ sqft</li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Door & window Unit</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Teak wood door with teak wood frame</li>
                <li class="list-group-item">Main door with tower bolts, handle, and lock
                    (size : 3' 6")
                    </li>
                <li class="list-group-item">White UPVC Shutter windows & frames
                </li>
              
            </ul>
        </section>
      </section>
    </section>


<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">living Room</span>
        </button>
      </h2>
      <section id="flush-collapseFive" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 110/ sqft</li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapsesix" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Dining & Courtyard</span>
        </button>
      </h2>
      <section id="flush-collapsesix" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 110/ sqft</li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapseseven" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Puja Room</span>
        </button>
      </h2>
      <section id="flush-collapseseven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 110/sq ft with 1 step of
                    vitrified finish 
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Pooja Area Door Unit</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Basic Teak Wood door with Basic Teak wood
                    Frame
                    </li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapseeight" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Kitchen</span>
        </button>
      </h2>
      <section id="flush-collapseeight" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Counter Top</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">20mm thick Black granite top up to Rs 120/sq ft
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Sink</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">SS Sink
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring Tiles</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 110/sq f
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Kitchen Wall Tile</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Dado wall tiles above kitchen slab up to Rs 45/sq ft
                    </li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapsenine" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Utility</span>
        </button>
      </h2>
      <section id="flush-collapsenine" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Counter Top</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">20mm thick Black granite top 
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Sink</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">SS Sink
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Tiles</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 110/sq ft and ceramic tiles
                    wall cladding up to Rs 45/ sq ft (for 5' height wall)
                    </li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapseten" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">G. Bedroom & WashRoom</span>
        </button>
      </h2>
      <section id="flush-collapseten" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 110/sq ft
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">BathRoom/Toilet</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to 7ft
                    height up to Rs 75/sqft                            
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">BathRoom Fixtures</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Bathroom fixtures worth Rs. 18000
                    </li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapseeleven" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Staircase</span>
        </button>
      </h2>
      <section id="flush-collapseeleven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Granite flooring up to Rs 120/sq ft
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Railing</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">MS Railings                           
                    </li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Master Bedroom & Washroom</span>
        </button>
      </h2>
      <section id="flush-collapseTwelve" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 115/sq ft
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Toilet</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to 7ft
                    height up to Rs 75/sqft                        
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Bathroom fixtures worth Rs. 18,000                      
                    </li>
              
            </ul>
        </section>
      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapse13" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Painting</span>
        </button>
      </h2>
      <section id="flush-collapse13" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Interior</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Tractor emulsion painting - Asian
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Exterior Paint</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ACE Exterior emulsion painting -Asian                        
                    </li>
              
            </ul>
        </section>

      </section>
    </section>

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapse14" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Study Room</span>
        </button>
      </h2>
      <section id="flush-collapse14" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item elevent_space_items">Vitrified flooring up to Rs 115/sq ft
                    </li>
              
            </ul>
        </section>

      </section>
    </section>

    

<section class="card card_estimator_choice">
      <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
       data-target="#flush-collapse15" aria-expanded="false" aria-controls="flush-collapseOne">
        <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
            <span class="fw-semibold">Bed Room 1 & Toilet</span>
        </button>
      </h2>
      <section id="flush-collapse15" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Flooring</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Vitrified flooring up to Rs 115/sq ft
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Toilet</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to 7ft
                    height up to Rs 75/sqft.                            
                    </li>
              
            </ul>
        </section>
        <section class="card-body card_estimate_calculte_body">
            <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Bathroom fixtures worth Rs. 18,000
                    </li>
              
            </ul>
        </section>

      </section>
    </section>
    
    
        
            <section class="card card_estimator_choice">
                  <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                   data-target="#flush-collapse16" aria-expanded="false" aria-controls="flush-collapseOne">
                    <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                        <span class="fw-semibold">Bed Room 2 & Toilet</span>
                    </button>
                  </h2>
                  <section id="flush-collapse16" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Flooring</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Vitrified flooring up to Rs 115/sq ft
                                </li>
                          
                        </ul>
                    </section>
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Toilet</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to 7ft
                                height up to Rs 75/sqft.                            
                                </li>
                          
                        </ul>
                    </section>
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Bathroom fixtures worth Rs. 18,000
                                </li>
                          
                        </ul>
                    </section>
            
                  </section>
                </section>
    
        
            <section class="card card_estimator_choice">
                  <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                   data-target="#flush-collapse17" aria-expanded="false" aria-controls="flush-collapseOne">
                    <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                        <span class="fw-semibold">Balcony</span>
                    </button>
                  </h2>
                  <section id="flush-collapse17" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Flooring</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Anti skid ceramic tiles for the flooring up to Rs 90/sq
                                ft.                                        
                                </li>
                          
                        </ul>
                    </section>
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Railing</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Basic M.S Railing                           
                                </li>
                          
                        </ul>
                    </section>
                  </section>
                </section>
    
        
            <section class="card card_estimator_choice">
                  <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                   data-target="#flush-collapse18" aria-expanded="false" aria-controls="flush-collapseOne">
                    <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                        <span class="fw-semibold">Terrace</span>
                    </button>
                  </h2>
                  <section id="flush-collapse18" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Tank</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">1 Overhead tank – Kaveri tank of 1000ltrs                         
                                </li>
                          
                        </ul>
                    </section>
                  </section>
                </section>
        
            <section class="card card_estimator_choice">
                  <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                   data-target="#flush-collapse19" aria-expanded="false" aria-controls="flush-collapseOne">
                    <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                        <span class="fw-semibold">Common</span>
                    </button>
                  </h2>
                  <section id="flush-collapse19" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Waterproofing</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Waterproofing – All terrace and all washrooms -
                                Fosrok / Dr.Fixit chemical                                                              
                                </li>
                          
                        </ul>
                    </section>
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Main & Pooja Door</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Teak wood up to Rs 2800/cft                                                           
                                </li>
                          
                        </ul>
                    </section>
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Other Doors</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">All other doors to have flush door with Paint finish
                                and frames to have Red Sal wood up to Rs 1550/cft                                                            
                                </li>
                          
                        </ul>
                    </section>
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Window Frames & Shutter</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Windows frame - White UPVC Window shutters -
                                White UPVC and glass as per the pattern                                                                                                    
                                </li>
                          
                        </ul>
                    </section>
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Grills</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Provided for Windows                                                             
                                </li>
                          
                        </ul>
                    </section>
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Ceiling</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">GF to FF Finish floor level 10'                                                              
                                </li>
                          
                        </ul>
                    </section>
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Structures</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Structure of house will be of RCC (M20) and Solid
                                Blocks                                                         
                                </li>
                          
                        </ul>
                    </section>
                  </section>
                </section>
        
            <section class="card card_estimator_choice">
                  <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                   data-target="#flush-collapse20" aria-expanded="false" aria-controls="flush-collapseOne">
                    <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                        <span class="fw-semibold">Sump Work</span>
                    </button>
                  </h2>
                  <section id="flush-collapse20" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Sump</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Sump with capacity - 5,000 liters                                                            
                                </li>
                          
                        </ul>
                    </section>
                  </section>
                </section>
        
            <section class="card card_estimator_choice">
                  <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                   data-target="#flush-collapse21" aria-expanded="false" aria-controls="flush-collapseOne">
                    <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                        <span class="fw-semibold">Electrical</span>
                    </button>
                  </h2>
                  <section id="flush-collapse21" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
               
                    <section class="card-body card_estimate_calculte_body">
              
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">All conduits and wiring.                                                         
                                </li>
                            <li class="list-group-item">Wires - Polycab / V-Guard                                                        
                                </li>
                            <li class="list-group-item">Switches & Switchboard
                                – Anchor / GM / Hi-Fi                                                                                               
                                </li>
                            <li class="list-group-item">Switches and switchboard
                                Connections, points provided for UPS/AC points
                                wherever required.                                                                                             
                                </li>
                        </ul>
                    </section>
                  </section>
                </section>
        
            <section class="card card_estimator_choice">
                  <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                   data-target="#flush-collapse22" aria-expanded="false" aria-controls="flush-collapseOne">
                    <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                        <span class="fw-semibold">Basement</span>
                    </button>
                  </h2>
                  <section id="flush-collapse22" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
               
                    <section class="card-body card_estimate_calculte_body">
                        <span class="fw-semibold subheading_calculate">Basement Construction</span>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Basement shall be charged at Rs 900/sqft                                                         
                                </li>
                        </ul>
                    </section>
                  </section>
                </section>

                    
<section class="card card_estimator_choice">
    <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
          <span class="fw-semibold">Design</span>
      </button>
    </h2>
    <section id="flush-collapseOne" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
      <section class="card-body card_estimate_calculte_body">
          <ul class="list-group list-group-flush">
              <li class="list-group-item">2D Drawings</li>
              <li class="list-group-item">Floor Plan</li>
              <li class="list-group-item"> Furniture Layout</li>
              <li class="list-group-item"> Electrical Drawings</li>
              <li class="list-group-item">  Plumbing Drawings</li>
              <li class="list-group-item">   Basic 3D Elevation</li>
              <li class="list-group-item">  Structural Drawings</li>
          </ul>
      </section>
    </section>
  </section>

                    
<section class="card card_estimator_choice">
    <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps23" aria-expanded="false" aria-controls="flush-collapseOne">
      <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
          <span class="fw-semibold">Architectural Details and Extra Charges</span>
      </button>
    </h2>
    <section id="flush-collaps23" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
      <section class="card-body card_estimate_calculte_body">
          <ul class="list-group list-group-flush">
              <li class="list-group-item">
                a) Circular/ helical staircase will be charged extra at
Rs 650/sqft.
              </li>
              <li class="list-group-item">b) All arches shall be made of 18mm
                ply with 1mm laminate as per the requirement
                places at additional cost.</li>
              <li class="list-group-item"> c) Tapered roof area will be charged additional</li>
              <li class="list-group-item"> d) Elevations with CNC cutting jalli/ RCC pergolas/
                MS pergolas will be charged extra.</li>
              <li class="list-group-item">  e) Wall niches shall be provided as
                per the Architects design & will be charged
                additional</li>
              <li class="list-group-item">  f) Lofts will be charged extra</li>
              <li class="list-group-item">  g) Cut lintels over doors and windows will be
                provided.</li>
              <li class="list-group-item"> h) Architect drawings to be provided
                in stages to the contracting company during
                construction, which will be a base line for design,
                material and finishing specifications.</li>
              <li class="list-group-item">  i) 5 Feet Compound wall will be charged
                additional @ Rs 1800/rft.</li>
              <li class="list-group-item"> j) All plumbing and electrical work will
                be done as per the drawing given by the Architect.</li>
              <li class="list-group-item"> k) Govt. Taxes Extra.</li>
              <li class="list-group-item"> l) Light Fittings Landscaping, Chimney Stove will be
                charged extra.</li>
              <li class="list-group-item">m) Any other specifications not exclusively
                mentioned here means it is additional cost</li>
              <li class="list-group-item"> n) Interior design will be as per
                agreed upon sizes/ materials as mentioned in the
                contract.</li>
          </ul>
      </section>
    </section>
  </section>

                    
<section class="card card_estimator_choice">
    <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps24" aria-expanded="false" aria-controls="flush-collapseOne">
      <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
          <span class="fw-semibold">Site Related Extra Charges</span>
      </button>
    </h2>
    <section id="flush-collaps24" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
      <section class="card-body card_estimate_calculte_body">
          <ul class="list-group list-group-flush">
              <li class="list-group-item">
                a) Rainwater sump, Percolation pit and site cleaning
                will be charged extra .
                
              </li>
              <li class="list-group-item"> b) Excavation will be charged extra when
                encountered with water/loose soil/stone</li>
              <li class="list-group-item"> c) Water ,Temprory Electricity connection including
                the plug points in the shed to be provided by the
                client.</li>
              <li class="list-group-item">d) All the neccesary approvals including Plan
                approval to be taken by the client.</li>
              <li class="list-group-item">      e) Incase of complete excavation of the site
                additinal charges will be applied.</li>
            
          </ul>
      </section>
    </section>
  </section>

                    
<section class="card card_estimator_choice">
    <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps25" aria-expanded="false" aria-controls="flush-collapseOne">
      <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
          <span class="fw-semibold">Structural Details and Extra Charges</span>
      </button>
    </h2>
    <section id="flush-collaps25" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
      <section class="card-body card_estimate_calculte_body">
          <ul class="list-group list-group-flush">
              <li class="list-group-item">
                a) Depth of the foundation more than 6’ feet will be
                charged additional.
              </li>
              <li class="list-group-item">b) Eccentric footing will be charged extra.</li>
              <li class="list-group-item">  c) Extra Reinforcement will be
                charged extra</li>
              <li class="list-group-item">  d) Slab thickness more than 6” will
                be charged.</li>
              <li class="list-group-item"> e) SSM below plinth beam will be charged extra.</li>
              <li class="list-group-item">  f) Lift concrete wall be charged extra.</li>
              <li class="list-group-item">   g) Double matt and strap beam for eccentric
                footings will be charged extra.</li>
              <li class="list-group-item">   h) Footings and column provision for
                additional floor will be charged extra.</li>
              <li class="list-group-item">     i) Additional charges will apply if Soil bearing
                capacity(SBC)</li>
              <li class="list-group-item">j) Elevation work not included in the price.</li>
              <li class="list-group-item"> k) Main gate of maximum size 15' x 5' or worth
                25000 included in the compound wall charges.</li>
              <li class="list-group-item"> l) Maximum of 2 toilets per 1000sqft of buildup will
                be given.</li>
              <li class="list-group-item"> m) Windows opening will be upto
                12 % of built up area.</li>
              <li class="list-group-item">n) Soil Test will be charged additional</li>
            
          </ul>
      </section>
    </section>
  </section>

                    
<section class="card card_estimator_choice">
    <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps26" aria-expanded="false" aria-controls="flush-collapseOne">
      <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
          <span class="fw-semibold">Brands</span>
      </button>
    </h2>
    <section id="flush-collaps26" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
      <section class="card-body card_estimate_calculte_body">
          <ul class="list-group list-group-flush">
              <li class="list-group-item">
                a) Steel brands –
                Gopala / Meenakshi/ Equivalent
              </li>
              <li class="list-group-item">   b) Cement - Penna / Mahagold / Priya
                Equivalent</li>
              <li class="list-group-item">    c) Plumbing Pipes- CPVC and PVC Pipe of
                Ashirwad & Supreme brand.</li>
          </ul>
      </section>
    </section>
  </section>

    </section>
    `
    var standardHTML = `
    <section class="accordion " id="accordionFlushExample3">
            <section class="card card_estimator_choice">
                <h2 class="card_header collapsed" id="flush-headingTwo" data-toggle="collapse" data-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                  <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                      <span class="fw-semibold">Car Porch Area</span>
                  </button>
                </h2>
                <section id="flush-collapseTwo" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                  <section class="card-body card_estimate_calculte_body">
                      <span class="fw-semibold subheading_calculate">Flooring</span>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">Paver tiles up to Rs 85/sqft</li>
                      </ul>
                  </section>
                  <section class="card-body card_estimate_calculte_body">
                      <span class="fw-semibold subheading_calculate">Electrical And Plumbing</span>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">As per Architects plan</li>
                      </ul>
                  </section>
                </section>
              </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingThree" data-toggle="collapse" data-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Entrance Area</span>
                </button>
              </h2>
              <section id="flush-collapseThree" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item elevent_space_items">Polished granite flooring up to Rs 125/sqft</li>
                    </ul>
                </section>
              </section>
            </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Verandah/Foyer</span>
                </button>
              </h2>
              <section id="flush-collapseFour" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Granite flooring up to Rs 125/ sqft</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Shoe Rack</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Matte/Gloss Finish with
                            Ebco hardware/fittings.(Size : 4.5' x 2’)
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Door & window Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Teak Wood door with teak wood frame with
                            Basic carvings</li>
                        <li class="list-group-item">Main door with tower bolts, handle, and lock
                            to have bronze (size : 3' 6")
                            </li>
                        <li class="list-group-item">Red Sal/White UPVC shutter windows & frames
                        </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Living Room</span>
                </button>
              </h2>
              <section id="flush-collapseFive" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 135/ sqft</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Wallpaper by Asian Paints (Size: 10’ x 10’)</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Designer TV Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Matte/Gloss finish up to Rs
                            45/sq ft with Ebco hardware (Size:6’x6’)</li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapsesix" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Dining & Courtyard</span>
                </button>
              </h2>
              <section id="flush-collapsesix" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 135/ sqft</li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseseven" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Puja Room</span>
                </button>
              </h2>
              <section id="flush-collapseseven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Granite flooring up to Rs 125/sqft with 1 step of
                            granite for the Puja area
                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Pooja Area Door Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Teak Wood door with teak wood frame with
                            Basic carvings                             
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseeight" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Kitchen</span>
                </button>
              </h2>
              <section id="flush-collapseeight" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Modular Kitchen</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Modular kitchen with BWP ply with Matte / Gloss
                            finish at Rs 55/sq ft with Ebco fittings                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accessories</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">1 cutlery, 1 bottle pullout and 2 plain baskets
                            (Size: up to 60 sq ft)
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Counter Top</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">20mm thick Black color granite top up to Rs
                            140/sq ft                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Sink</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">SS Sink
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring Tiles</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 135/ sqft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Kitchen Wall Tile</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Dado wall tiles above kitchen slab up to Rs 55/sq
                            ft                            
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapsenine" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Utility</span>
                </button>
              </h2>
              <section id="flush-collapsenine" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Counter Top</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">20mm thick Black granite top 
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Sink</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">SS Sink
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Tiles</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 120/ sqft & ceramic tiles
                            wall cladding upto Rs 55/sq ft
                            (for 5' height wall)                            
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseten" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">G. Bedroom & WashRoom</span>
                </button>
              </h2>
              <section id="flush-collapseten" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 135/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Matte / Gloss finishe up to
                            Rs 45/sq ft with Ebco hardware (Size: 6’x7’ +
                            6’x3’ loft)                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">BathRoom/Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to 7ft
                            height up to 85/sq ft.                                                       
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">BathRoom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 23000
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseeleven" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Staircase</span>
                </button>
              </h2>
              <section id="flush-collapseeleven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Granite flooring up to Rs 130/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Railing</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">SS Railings                           
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    

    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Master Bedroom & Washroom</span>
                </button>
              </h2>
              <section id="flush-collapseTwelve" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 135/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Matte / Gloss finish up to Rs
                            45/sq ft with Ebco hardware (Size: 7’x7’ + 7’x3’
                            loft)
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Wallpaper (Size: 10’ x 10’)
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Ceramic wall tiles up to Rs 85/sq ft for floor and
                            wall tiles upto 7' height.                                               
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 23,000                     
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse13" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Painting</span>
                </button>
              </h2>
              <section id="flush-collapse13" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Interior</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Premium emulsion painting - Asian 
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Exterior Paint</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">APEX Exterior emulsion painting - Asian                       
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse14" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Study Room</span>
                </button>
              </h2>
              <section id="flush-collapse14" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item elevent_space_items">Vitrified flooring up to Rs 135/sq ft
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>

            
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse15" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Bed Room 1 & Toilet</span>
                </button>
              </h2>
              <section id="flush-collapse15" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 135/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Matte / Gloss finishe up to
                            Rs 45/sq ft with Ebco hardware (Size: 6’x7’ +
                            6’x3’ loft)                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to 7ft
                            height up to 85/sq ft.                                                        
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 23,000
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>
            
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse16" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Bed Room 2 & Toilet</span>
                            </button>
                          </h2>
                          <section id="flush-collapse16" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Vitrified flooring up to Rs 135/sq ft
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Wardrobes</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Commercial ply with Matte / Gloss finishe up to
                                        Rs 45/sq ft with Ebco hardware (Size: 6’x7’ +
                                        6’x3’ loft)                                        
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Toilet</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to 7ft
                                        height up to 85/sq ft.                                                                  
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Bathroom fixtures worth Rs. 23,000
                                        </li>
                                  
                                </ul>
                            </section>
                    
                          </section>
                        </section>
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse17" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Balcony</span>
                            </button>
                          </h2>
                          <section id="flush-collapse17" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Anti skid ceramic tiles for the flooring up to Rs
                                        105/sq ft.                                                                             
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Railing</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">S.S Railing                           
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse18" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Terrace</span>
                            </button>
                          </h2>
                          <section id="flush-collapse18" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Tank</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">1 Overhead tank –3 layers of Kaveri tank of
                                        1000 ltrs                        
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse19" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Common</span>
                            </button>
                          </h2>
                          <section id="flush-collapse19" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Waterproofing</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Waterproofing – All terrace and all washrooms -
                                        Fosrok / Dr.Fixit chemical                                                                                                    
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Main & Pooja Door</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Teak wood up to Rs 3250/cft                                                         
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Other Doors</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All other doors to have flush door with Laminate
                                        finish and frames to have Red Sal wood up to Rs
                                        1750/cft                                                                                                   
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Window Frames & Shutter</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Windows frame - White UPVC / Red Sal Wood
                                        upto Rs 1750/cft                                                                                                  
                                        </li>
                                    <li class="list-group-item">Window shutters - White UPVC / Teak wood
                                        upto Rs 2800 /cft and glass as per the pattern                                                                                                   
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Grills</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Provided for Windows                                                             
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Ceiling</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">GF to FF Finish floor level 10'                                                              
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Structures</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Structure of house will be of RCC (M20) and
                                        Solid Blocks                                                                                                
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse20" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Sump Work</span>
                            </button>
                          </h2>
                          <section id="flush-collapse20" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Sump</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Sump with capacity - 7,000 liters                                                            
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse21" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Electrical</span>
                            </button>
                          </h2>
                          <section id="flush-collapse21" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                       
                            <section class="card-body card_estimate_calculte_body">
                      
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All conduits and wiring.                                                         
                                        </li>
                                    <li class="list-group-item">Wires - Polycab / V-Guard                                                        
                                        </li>
                                    <li class="list-group-item">Switches & Switchboard
                                        – Anchor / GM / Hi-Fi                                                                                               
                                        </li>
                                    <li class="list-group-item">Switches and switchboard
                                        Connections, points provided for UPS/AC points
                                        wherever required.                                                                                       
                                        </li>
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse22" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Basement</span>
                            </button>
                          </h2>
                          <section id="flush-collapse22" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Basement Construction</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Basement shall be charged at Rs 900/sqft                                                         
                                        </li>
                                </ul>
                            </section>
                          </section>
                        </section>

                     
                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Design</span>
              </button>
            </h2>
            <section id="flush-collapseOne" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">2D Drawings</li>
                      <li class="list-group-item">Floor Plan</li>
                      <li class="list-group-item"> Furniture Layout</li>
                      <li class="list-group-item"> Electrical Drawings</li>
                      <li class="list-group-item">  Plumbing Drawings</li>
                      <li class="list-group-item">   Basic 3D Elevation</li>
                      <li class="list-group-item">   Interior Designing - 2D & Model</li>
                      <li class="list-group-item">  Structural Drawings</li>
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps23" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Architectural Details and Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps23" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Circular/ helical staircase will be charged extra
                        at Rs 650/sqft.
                      </li>
                      <li class="list-group-item">   b) All arches shall be made of 18mm
                        ply with 1mm laminate as per the requirement
                        places at additional cost.</li>
                      <li class="list-group-item">  c) Tapered roof area will be charged additional</li>
                      <li class="list-group-item">d) Elevations with CNC cutting jalli/ RCC
                        pergolas/ MS pergolas will be charged extra.</li>
                      <li class="list-group-item"> e) Wall niches shall be provided as
                        per the Architects design & will be charged
                        additional</li>
                      <li class="list-group-item">   f) Lofts will be charged extra</li>
                      <li class="list-group-item">     g) Cut lintels over doors and windows will be
                        provided.</li>
                      <li class="list-group-item"> h) Architect drawings to be provided
                        in stages to the contracting company during
                        construction, which will be a base line for design,
                        material and finishing specifications.</li>
                      <li class="list-group-item">  i) 5 Feet Compound wall will be charged
                        additional @ Rs 1800/rft.</li>
                      <li class="list-group-item"> j) All plumbing and electrical work will
                        be done as per the drawing given by the
                        Architect.</li>
                      <li class="list-group-item"> k) Govt. Taxes Extra.</li>
                      <li class="list-group-item"> l) Light Fittings Landscaping, Chimney Stove will be
                        charged extra.</li>
                      <li class="list-group-item">m) Any other specifications not exclusively
                        mentioned here means it is additional cost</li>
                      <li class="list-group-item"> n) Interior design will be as per
                        agreed upon sizes/ materials as mentioned in the
                        contract.</li>
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps24" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Site Related Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps24" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Rainwater sump, Percolation pit and site cleaning
                        will be charged extra .
                        
                      </li>
                      <li class="list-group-item"> b) Excavation will be charged extra when
                        encountered with water/loose soil/stone</li>
                      <li class="list-group-item"> c) Water ,Temprory Electricity connection including
                        the plug points in the shed to be provided by the
                        client.</li>
                      <li class="list-group-item">d) All the neccesary approvals including Plan
                        approval to be taken by the client.</li>
                      <li class="list-group-item">      e) Incase of complete excavation of the site
                        additinal charges will be applied.</li>
                    
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps25" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Structural Details and Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps25" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Depth of the foundation more than 6’ feet will be
                        charged additional.
                      </li>
                      <li class="list-group-item">b) Eccentric footing will be charged extra.</li>
                      <li class="list-group-item">  c) Extra Reinforcement will be
                        charged extra</li>
                      <li class="list-group-item">  d) Slab thickness more than 6” will
                        be charged.</li>
                      <li class="list-group-item"> e) SSM below plinth beam will be charged extra.</li>
                      <li class="list-group-item">  f) Lift concrete wall be charged extra.</li>
                      <li class="list-group-item">   g) Double matt and strap beam for eccentric
                        footings will be charged extra.</li>
                      <li class="list-group-item">   h) Footings and column provision for
                        additional floor will be charged extra.</li>
                      <li class="list-group-item">     i) Additional charges will apply if Soil bearing
                        capacity(SBC)</li>
                      <li class="list-group-item">j) Elevation work not included in the price.</li>
                      <li class="list-group-item"> k) Main gate of maximum size 15' x 5' or worth
                        25000 included in the compound wall charges.</li>
                      <li class="list-group-item"> l) Maximum of 2 toilets per 1000sqft of buildup will
                        be given.</li>
                      <li class="list-group-item"> m) Windows opening will be upto
                        12 % of built up area.</li>
                      <li class="list-group-item">n) Soil Test will be charged additional</li>
                    
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps26" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Brands</span>
              </button>
            </h2>
            <section id="flush-collaps26" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Steel brands –
                        Gopala / Meenakshi/ Equivalent
                      </li>
                      <li class="list-group-item">   b) Cement - Penna / Mahagold / Priya
                        Equivalent</li>
                      <li class="list-group-item">    c) Plumbing Pipes- CPVC and PVC Pipe of
                        Ashirwad & Supreme brand.</li>
                  </ul>
              </section>
            </section>
          </section>


          <section class="card card_estimator_choice">
          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
           data-target="#flush-collapdiffer1" aria-expanded="false" aria-controls="flush-collapseOne">
            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                <span class="fw-semibold">Family Living Room</span>
            </button>
          </h2>
          <section id="flush-collapdiffer1" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample3">
            <section class="card-body card_estimate_calculte_body">
                <span class="fw-semibold subheading_calculate">Flooring</span>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Vitrified flooring up to Rs 135/ sqft
                        </li>
                  
                </ul>
            </section>

          </section>
        </section>

            </section>
    `
    var deluxeHTML = `
    <section class="accordion " id="accordionFlushExample2">
            <section class="card card_estimator_choice">
                <h2 class="card_header collapsed" id="flush-headingTwo" data-toggle="collapse" data-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                  <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                      <span class="fw-semibold">Car Porch Area</span>
                  </button>
                </h2>
                <section id="flush-collapseTwo" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                  <section class="card-body card_estimate_calculte_body">
                      <span class="fw-semibold subheading_calculate">Flooring</span>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">Paver tiles up to Rs 100/sqft</li>
                      </ul>
                  </section>
                  <section class="card-body card_estimate_calculte_body">
                      <span class="fw-semibold subheading_calculate">Electrical And Plumbing</span>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">As per Architects plan</li>
                      </ul>
                  </section>
                </section>
              </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingThree" data-toggle="collapse" data-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Entrance Area</span>
                </button>
              </h2>
              <section id="flush-collapseThree" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item elevent_space_items">Polished granite flooring up to Rs 145/sqft</li>
                    </ul>
                </section>
              </section>
            </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Verandah/Foyer</span>
                </button>
              </h2>
              <section id="flush-collapseFour" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Granite flooring up to Rs 145/ sqft</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size - 10' x 10')</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Shoe Rack</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Textured/Gloss Finish with Ebco
                            hardware with soft close. (Size : 5' 0 x 2’)                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Door & window Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Teak Wood door with teak wood frame with carvings</li>
                        <li class="list-group-item">Main door with tower bolts, handle, and lock to have Antique finish
                            /bronze (size : 3' 6")
                            </li>
                        <li class="list-group-item">Red Sal/White UPVC shutter windows & frames
                        </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Living Room</span>
                </button>
              </h2>
              <section id="flush-collapseFive" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 165/ sqft</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">False Ceiling</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Designer gypsum false ceiling with basic designs</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper by Asian Paints (Size: 10’ x 10’)</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Designer TV Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Textured/Gloss finish up to Rs 55/sq ft with Ebco
                            hardware with soft close (Size:7’x6’)</li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapsesix" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Dining & Courtyard</span>
                </button>
              </h2>
              <section id="flush-collapsesix" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 165/ sqft</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Crockery Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Textured/Gloss finish up to Rs 55/sq ft with Ebco
                            hardware with soft close (Size:4’x5’)
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseseven" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Puja Room</span>
                </button>
              </h2>
              <section id="flush-collapseseven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Granite flooring up to Rs165/sqft with 2 step of granite for the Puja area
                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Pooja Area Door Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Teak Wood door with teak wood frame with carvings                            
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseeight" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Kitchen</span>
                </button>
              </h2>
              <section id="flush-collapseeight" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Modular Kitchen</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Modular kitchen with BWP ply with High Gloss / Acrylic Finish at Rs.135
                            /sq ft with soft closing Ebco hardware                                                        
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accessories</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">1 cutlery, 2 Tandem boxes, 1 bottle pullout and 2 plain baskets
                            (Size: up to 70 sq ft)                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Counter Top</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">20mm thick Black color granite top up to Rs 155/sq ft with 40mm nosing                          
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Gas Piping</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Copper gas piping                       
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Sink</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">SS double dipper sink
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring Tiles</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 165/sqft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Kitchen Wall Tile</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Dado wall tiles above kitchen slab up to Rs 65/sq ft                         
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Breakfast Counter</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Black leather finish granite                        
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapsenine" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Utility</span>
                </button>
              </h2>
              <section id="flush-collapsenine" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Counter Top</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">20mm thick Black granite top 
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Sink</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">SS Sink
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Tiles</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 125/sqft & ceramic tiles wall cladding upto Rs
                            65/ sq ft
                            (for 7' height wall)                                                     
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseten" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">G. Bedroom & WashRoom</span>
                </button>
              </h2>
              <section id="flush-collapseten" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 165/sqft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Textured/Gloss finish up to Rs 55/sq ft with Ebco
                            hardware with soft close (Size: 7’x7’ and 7’x3’ loft)                           
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">BathRoom/Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to ceiling height up to Rs 95/sq
                            ft.                                                                                   
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">BathRoom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 28000
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Gas Partition</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Glass partition for wet and dry area
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    

        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseeleven" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Staircase</span>
                </button>
              </h2>
              <section id="flush-collapseeleven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Granite flooring up to Rs 210/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Railing</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">SS Railings with glass                           
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
       
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Master Bedroom & Washroom</span>
                </button>
              </h2>
              <section id="flush-collapseTwelve" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Laminated Wooden/Vitrified flooring up to Rs 165/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with High Gloss / PVC finish up to Rs 75/sq ft with Ebco
                            hardware with soft close (Size: 8’x7’ and 8’x3’ loft)                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size: 10’ x 10’)
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">False Ceiling</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Basic Designer gypsum false ceiling
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Ceramic wall tiles up to Rs 95/sq ft for floor and wall tiles upto ceiling                                           
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathtub</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathtub up to Rs 16,000/-                                         
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Glass Partiton</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Glass Partition for Dry and Wet Area                                        
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 28,000                     
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse13" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Painting</span>
                </button>
              </h2>
              <section id="flush-collapse13" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Interior</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal emulsion painting - Asian
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Exterior Paint</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">APEX Exterior emulsion painting - Asian                      
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse14" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Study Room</span>
                </button>
              </h2>
              <section id="flush-collapse14" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item elevent_space_items">Vitrified flooring up to Rs 165/sq ft
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>

            
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse15" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Bed Room 1 & Toilet</span>
                </button>
              </h2>
              <section id="flush-collapse15" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 165/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Textured/Gloss finish up to Rs 55/sq ft with Ebco
                            hardware with soft close (Size: 7’x7’ and 7’x3’ loft)                           
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size : 10’ x 10’)                        
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to ceiling height up to Rs 95/sq
                            ft                                                                                    
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Glass Partition</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Glass Partition for wet & Dry area                                                                                 
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 28,000
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>
            
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse16" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Bed Room 2 & Toilet</span>
                            </button>
                          </h2>
                          <section id="flush-collapse16" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Vitrified flooring up to Rs 165/sq ft
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Wardrobes</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Commercial ply with Textured/Gloss finish up to Rs 55/sq ft with Ebco
                                        hardware with soft close (Size: 7’x7’ and 7’x3’ loft)                                                                              
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Accent Wall</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size : 10’ x 10’)                                                                             
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Toilet</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to ceiling height up to Rs 95/sq
                                        ft                                                                                                        
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Glass Partition</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Glass Partition for wet & Dry area                                                                                                      
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Bathroom fixtures worth Rs. 28,000
                                        </li>
                                  
                                </ul>
                            </section>
                    
                          </section>
                        </section>
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse17" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Balcony</span>
                            </button>
                          </h2>
                          <section id="flush-collapse17" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Anti skid ceramic tiles for the flooring up to 115/sq ft                                                                             
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Railing</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">S.S Railing with glass                       
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse18" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Terrace</span>
                            </button>
                          </h2>
                          <section id="flush-collapse18" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Paver tiles for flooring up to Rs 90/sq ft                       
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Tank</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">1 Overhead tanks – Sintex tanks of 1000 ltrs, MS stairs for the tank                        
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse19" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Common</span>
                            </button>
                          </h2>
                          <section id="flush-collapse19" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Waterproofing</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Waterproofing – All terrace and all washrooms - Fosrok / Dr.Fixit
                                        chemical                                                                                                                                            
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Main & Pooja Door</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Teak wood up to Rs 3950/cft with carving                                                        
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Other Doors</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All other doors to have flush door with Premium Laminate finish and
                                        frames to have Red Sal wood up to Rs 1950/cft                                                                                                                                          
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Window Frames & Shutter</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Windows frame - White UPVC / Red Sal Wood upto Rs 1950/cft                                                                                                  
                                        </li>
                                    <li class="list-group-item">Window shutters - White UPVC / Teak wood upto Rs 2800 /cft and shall
                                        have glass as per the pattern                                                                                                                                          
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Grills</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Provided for Windows & Ventilators                                                            
                                        </li>
                                  
                                </ul>
                            </section>

                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Setback Area</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Setback area to have Paver Tiles                                                           
                                        </li>
                                  
                                </ul>
                            </section>

                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Cladding</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Cera stone cladding for the elevation up to Rs 155/sq ft
                                        (Size: Upto 150 sq ft)                                                                                                 
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Ceiling</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">GF to FF Finish floor level 10' 6"                                                            
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Structures</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Structure of house will be of RCC (M20) and Solid Blocks                                                                                               
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse20" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Sump Work</span>
                            </button>
                          </h2>
                          <section id="flush-collapse20" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Sump</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Sump with capacity - 10,000 liters                                                            
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse21" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Electrical</span>
                            </button>
                          </h2>
                          <section id="flush-collapse21" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                       
                            <section class="card-body card_estimate_calculte_body">
                      
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All conduits and wiring.                                                         
                                        </li>
                                    <li class="list-group-item">Wires - Finolex / V-Guard / Polycab                                                        
                                        </li>
                                    <li class="list-group-item">Switches & Switchboard
                                        – Anchor / Legrand / GM                                                                                                                                       
                                        </li>
                                    <li class="list-group-item">Switches and switchboard
                                        Connections, points provided for UPS/AC points wherever required.                                                                                                                               
                                        </li>
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse22" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Basement</span>
                            </button>
                          </h2>
                          <section id="flush-collapse22" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Basement Construction</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Basement shall be charged at Rs 900/sqft                                                         
                                        </li>
                                </ul>
                            </section>
                          </section>
                        </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Design</span>
              </button>
            </h2>
            <section id="flush-collapseOne" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">2D Drawings</li>
                      <li class="list-group-item">Floor Plan</li>
                      <li class="list-group-item"> Furniture Layout</li>
                      <li class="list-group-item"> Electrical Drawings</li>
                      <li class="list-group-item">  Plumbing Drawings</li>
                      <li class="list-group-item">   3D Elevation-Renders</li>
                      <li class="list-group-item">   Interior Designing - 2D & Renders</li>
                      <li class="list-group-item">   False ceiling Drawings</li>
                      <li class="list-group-item">  Structural Drawings</li>
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps23" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Architectural Details and Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps23" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Circular/ helical staircase will be charged extra at Rs 650/sqft.
                        
                      </li>
                      <li class="list-group-item"> b) All arches shall be made of 18mm
                        ply with 1mm laminate as per the requirement places at additional cost.</li>
                      <li class="list-group-item"> c) Tapered roof area will be charged additional</li>
                      <li class="list-group-item">d) Elevations with CNC cutting jalli/ RCC pergolas/ MS pergolas will be
                        charged extra.</li>
                      <li class="list-group-item">e) Wall niches shall be provided as
                        per the Architects design & will be charged additional
                        additional</li>
                      <li class="list-group-item">   f) Lofts will be charged extra</li>
                      <li class="list-group-item">     g) Cut lintels over doors and windows will be provided.</li>
                      <li class="list-group-item"> h) Architect drawings to be provided
                        in stages to the contracting company during construction, which will be a
                        base line for design, material and finishing specifications.
                        i) 5 Feet Compound wall will be charged
                        additional @ Rs 1800/rft.</li>
                      <li class="list-group-item">  i) 5 Feet Compound wall will be charged
                        additional @ Rs 1800/rft.
                        </li>
                      <li class="list-group-item"> j) All plumbing and electrical work will
                        be done as per the drawing given by the Architect.
                        </li>
                      <li class="list-group-item"> k) Govt. Taxes Extra.</li>
                      <li class="list-group-item"> l) Light Fittings Landscaping, Chimney Stove will be charged extra.
                    </li>
                      <li class="list-group-item">m) Any other specifications not exclusively mentioned here means it is
                        additional cost</li>
                      <li class="list-group-item">n) Interior design will be as per
                        agreed upon sizes/ materials as mentioned in the contract.
                        </li>
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps24" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Site Related Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps24" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Rainwater sump, Percolation pit and site cleaning will be charged extra.
                      </li>
                      <li class="list-group-item">   b) Excavation will be charged extra when encountered with water/loose
                        soil/stone</li>
                      <li class="list-group-item"> c) Water ,Temprory Electricity connection including the plug points in the
                        shed to be provided by the client.</li>
                      <li class="list-group-item">d) All the neccesary approvals including Plan approval to be taken by the
                        client.</li>
                      <li class="list-group-item"> e) Incase of complete excavation of the site additinal charges will be
                        applied.</li>
                    
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps25" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Structural Details and Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps25" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Depth of the foundation more than 6’ feet will be charged additional.
                      </li>
                      <li class="list-group-item">     b) Eccentric footing will be charged extra.</li>
                      <li class="list-group-item"> c) Extra Reinforcement will be
                        charged extra</li>
                      <li class="list-group-item"> d) Slab thickness more than 6” will
                        be charged</li>
                      <li class="list-group-item">e) SSM below plinth beam will be charged extra.</li>
                      <li class="list-group-item"> f) Lift concrete wall be charged extra.</li>
                      <li class="list-group-item">   g) Double matt and strap beam for eccentric footings will be charged
                        extra.</li>
                      <li class="list-group-item"> h) Footings and column provision for
                        additional floor will be charged extra.</li>
                      <li class="list-group-item">  i) Additional charges will apply if Soil bearing capacity(SBC) 160.</li>
                      <li class="list-group-item">  j) Elevation work not included in the price.</li>
                      <li class="list-group-item"> k) Main gate of maximum size 15' x 5' or worth 25000 included in the
                        compound wall charges.</li>
                      <li class="list-group-item">l) Maximum of 2 toilets per 1000sqft of buildup will be given.</li>
                      <li class="list-group-item"> m) Windows opening will be upto
                        12 % of built up area.</li>
                      <li class="list-group-item">n) Soil Test will be charged additional</li>
                    
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps26" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Brands</span>
              </button>
            </h2>
            <section id="flush-collaps26" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Steel brands - Meenakshi / Kamadhenu / Jindal /
                        Equivalent
                      </li>
                      <li class="list-group-item">  b) Cement brands – ACC / Birla /Ramco / Ultratech
                        /Equivalent</li>
                      <li class="list-group-item"> c) Plumbing Pipes- CPVC, PVC Pipe of Ashirwad & Supreme
                        brand.</li>
                  </ul>
              </section>
            </section>
          </section>


          <section class="card card_estimator_choice">
          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
           data-target="#flush-collapdiffer1" aria-expanded="false" aria-controls="flush-collapseOne">
            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                <span class="fw-semibold">Family Living Room</span>
            </button>
          </h2>
          <section id="flush-collapdiffer1" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
            <section class="card-body card_estimate_calculte_body">
                <span class="fw-semibold subheading_calculate">Flooring</span>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Vitrified flooring up to Rs 165/ sqft
                        </li>
                  
                </ul>
            </section>
            <section class="card-body card_estimate_calculte_body">
                <span class="fw-semibold subheading_calculate">Accent Wall</span>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Royal play or wallpaper from Asian
                        Paints (Size: 10’x10’)
                        </li>
                  
                </ul>
            </section>

          </section>
        </section>


        <section class="card card_estimator_choice">
        <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
         data-target="#flush-collapsdiffer2" aria-expanded="false" aria-controls="flush-collapseOne">
          <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
              <span class="fw-semibold">Powder Room</span>
          </button>
        </h2>
        <section id="flush-collapsdiffer2" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample2">
          <section class="card-body card_estimate_calculte_body">
              <span class="fw-semibold subheading_calculate">Flooring</span>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Ceramic tiles for floor and wall up to ceiling height up to Rs 95/sq ft
                      </li>
                
              </ul>
          </section>
          <section class="card-body card_estimate_calculte_body">
              <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Bathroom fixtures worth Rs. 15000
                   
                      </li>
                
              </ul>
          </section>
        </section>
      </section>

            </section>

    `
    var premiumHTML = `
    <section class="accordion " id="accordionFlushExample1">
            <section class="card card_estimator_choice">
                <h2 class="card_header collapsed" id="flush-headingTwo" data-toggle="collapse" data-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                  <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                      <span class="fw-semibold">Car Porch Area</span>
                  </button>
                </h2>
                <section id="flush-collapseTwo" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                  <section class="card-body card_estimate_calculte_body">
                      <span class="fw-semibold subheading_calculate">Flooring</span>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">Paver tiles up to Rs 105/sqft</li>
                      </ul>
                  </section>
                  <section class="card-body card_estimate_calculte_body">
                      <span class="fw-semibold subheading_calculate">Electrical And Plumbing</span>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">As per Architects plan</li>
                      </ul>
                  </section>
                </section>
              </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingThree" data-toggle="collapse" data-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Entrance Area</span>
                </button>
              </h2>
              <section id="flush-collapseThree" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item elevent_space_items">Polished granite flooring up to Rs 185/sqft</li>
                    </ul>
                </section>
              </section>
            </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Verandah/Foyer</span>
                </button>
              </h2>
              <section id="flush-collapseFour" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Italian marble flooring up to Rs 460/sqft
                        </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size - 10' x
                            10')</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Shoe Rack</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Metallic/High Gloss Finish with
                            Hettich hardware with soft close (Size : 6' 0" x 2’)
                            Teak Wood door with teak wood frame with carvings                          
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Door & window Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Teak wood / Wooden Color UPVC shutter windows &
                            frames</li>
                        <li class="list-group-item">Main door with tower bolts, handle, and lock to have
                            Antique finish /bronze (size : 3' 6")
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Living Room</span>
                </button>
              </h2>
              <section id="flush-collapseFive" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Italian marble flooring up to Rs 460/sqft
                        </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">False Ceiling</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Designer gypsum false ceiling with upto 2 drop designs
                        </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper by Asian Paints (Size: 12’ x 10’)</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Designer TV Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Metallic / High Gloss / PVC finish up
                            to Rs 65/sq ft with Hettich hardware with soft close
                            (Size:8’x6’)
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapsesix" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Dining & Courtyard</span>
                </button>
              </h2>
              <section id="flush-collapsesix" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Italian marble flooring up to Rs 460/sqft</li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Crockery Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Metallic / High Gloss / PVC /Acrylic
                            with Hettich hardware with soft close (Size:5’x5’)
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseseven" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Puja Room</span>
                </button>
              </h2>
              <section id="flush-collapseseven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Italian marble flooring up to Rs 460/sqft
                            with 2 step of Italian Marble for the Puja area
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Pooja Area Door Unit</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Teak Wood door with teak wood frame with carvings                           
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseeight" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Kitchen</span>
                </button>
              </h2>
              <section id="flush-collapseeight" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Modular Kitchen</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Modular kitchen with BWP ply with Acrylic finish at
                            Rs.165 /sq ft with soft closing Hettich hardware
                                                                                   
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accessories</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">1 cutlery, 2 Tandem boxes, 1 bottle pullout, 2 plain
                            baskets, dust bin and 1 corner unit.(Size: up to 90sqft)                           
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Counter Top</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">20mm thick Quartz stone top up to Rs 500/sq ft with
                            40mm nosing                          
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Gas Piping</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Copper gas piping                     
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Sink</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Quartz sink
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring Tiles</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Italian marble flooring up to Rs 460/sqft

                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Kitchen Wall Tile</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Dado wall tiles above kitchen slab up to Rs 75/sqft
                      
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Breakfast Counter</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Black leather finish granite
                       
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapsenine" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Utility</span>
                </button>
              </h2>
              <section id="flush-collapsenine" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Counter Top</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">20mm thick Black granite top
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Sink</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">SS double dipper sink
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Tiles</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified tiles upto Rs 130/sq ft & ceramic tiles wall
                            cladding upto Rs 75/ sq ft
                            (Upto Ceiling height )                                                   
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseten" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">G. Bedroom & WashRoom</span>
                </button>
              </h2>
              <section id="flush-collapseten" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Laminated Wooden/Vitrified flooring up to Rs 195/sqft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Acrylic finish up to Rs 135/sq ft with
                            Hettich hardware with soft close (Size: 7’x7’ and 7’x3’ loft)                          
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">BathRoom/Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to ceiling height
                            up to Rs 105/sq ft
                                                                                                               
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">BathRoom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 35000
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Gas Partition</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Glass partition for wet and dry area
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        


        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseeleven" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Staircase</span>
                </button>
              </h2>
              <section id="flush-collapseeleven" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Granite flooring up to Rs 260/sq ft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Railing</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Railing of Teakwood or SS 304 railing with glass                         
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
    
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Master Bedroom & Washroom</span>
                </button>
              </h2>
              <section id="flush-collapseTwelve" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Laminated Wooden/Vitrified flooring up to Rs 195/sqft
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Aristo Wardrobe (Size: 8’ x 10')                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size: 12’ x
                            10’)                            
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">False Ceiling</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Designer gypsum false ceiling
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Ceramic wall tiles up to Rs 105/sqft for floor and wall tiles
                            upto ceiling.                                                                      
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathtub</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathtub up to Rs 20,000/-                                          
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Glass Partiton</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Glass Partition for Dry and Wet Area                                       
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 40,000                   
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse13" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Painting</span>
                </button>
              </h2>
              <section id="flush-collapse13" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Interior</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal emulsion painting - Asian 

                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Exterior Paint</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">APEX UTLIMA Exterior emulsion painting - Asian
                     
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse14" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Study Room</span>
                </button>
              </h2>
              <section id="flush-collapse14" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item elevent_space_items">Laminated Wooden/Vitrified flooring up to Rs 195/sq ft

                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>

            
    
        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapse15" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Bed Room 1 & Toilet</span>
                </button>
              </h2>
              <section id="flush-collapse15" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Vitrified flooring up to Rs 195/sq ft

                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Wardrobes</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Commercial ply with Acrylic finish up to Rs 135/sq ft with
                            Hettich hardware with soft close (Size: 8’x7’ and 8’x3’ loft)                        
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Accent Wall</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size : 12’ x
                            10’)
                                                  
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Toilet</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to ceiling height
                            up to Rs 105/sq ft
                                                                                                                
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Glass Partition</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Shower glass cubicle                                                                               
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 35,000
                            </li>
                      
                    </ul>
                </section>
        
              </section>
            </section>
            
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse16" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Bed Room 2 & Toilet</span>
                            </button>
                          </h2>
                          <section id="flush-collapse16" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Vitrified flooring up to Rs 195/sq ft
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Wardrobes</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Commercial ply with Acrylic finish up to Rs 135/sq ft with
                                        Hettich hardware with soft close (Size: 8’x7’ and 8’x3’ loft)                                                                             
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Accent Wall</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Royal Play or wallpaper from Asian Paints (Size : 12’ x
                                        10’)
                                                                                                                    
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Toilet</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Toilet - Ceramic tiles for floor and wall up to ceiling height
                                        up to Rs 105/sq ft                                                                                                       
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Glass Partition</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Shower glass cubicle                                                                                                     
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Bathroom fixtures worth Rs. 35,000
                                        </li>
                                  
                                </ul>
                            </section>
                    
                          </section>
                        </section>
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse17" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Balcony</span>
                            </button>
                          </h2>
                          <section id="flush-collapse17" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Anti skid ceramic tiles for the flooring up to Rs 125/sq ft                                                                           
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Railing</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">SS Railing with glass                       
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
            
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse18" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Terrace</span>
                            </button>
                          </h2>
                          <section id="flush-collapse18" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Flooring</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Paver tiles for flooring up to Rs 100/sq ft                       
                                        </li>
                                  
                                </ul>
                            </section>
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Tank</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">2 Overhead tanks – Sintex tanks each of 1000ltrs, MS
                                        stairs for the tank                       
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse19" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Common</span>
                            </button>
                          </h2>
                          <section id="flush-collapse19" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Waterproofing</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Waterproofing – All terrace and all washrooms - Fosrok /
                                        Dr.Fixit chemical                                                                                                                                         
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Main & Pooja Door</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Teak wood up to Rs 4400/cft with carving
                                                       
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Other Doors</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All other doors to have flush door with Premium
                                        Laminate/ Veneer finish and frames to have teak wood up
                                        to Rs 2800/cft
                                                                                                                                                                                
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Window Frames & Shutter</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Windows frame - Teak wood up to Rs 3250/cft                                                                                                 
                                        </li>
                                    <li class="list-group-item">Window
                                        shutters - Teak wood Upto Rs 3250/cft & glass as per the
                                        pattern
                                        
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Grills</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All Windows, Ventilators & Main Door
                                                          
                                        </li>
                                  
                                </ul>
                            </section>

                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Setback Area</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Setback area to have Paver Tiles
                                  
                                </ul>
                            </section>

                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Cladding</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Cera stone cladding for the elevation up to Rs 185/sq ft
                                        (Size: Upto 250 sq ft)
                                                                                                                                      
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Ceiling</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">GF to FF Finish floor level 10' 6"
                                                            
                                        </li>
                                  
                                </ul>
                            </section>
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Structures</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Structure of house will be of RCC (M20) and Solid Blocks                                                                                             
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse20" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Sump Work</span>
                            </button>
                          </h2>
                          <section id="flush-collapse20" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Sump</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Sump with capacity - 12,000 liters                                                          
                                        </li>
                                  
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse21" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Electrical</span>
                            </button>
                          </h2>
                          <section id="flush-collapse21" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                       
                            <section class="card-body card_estimate_calculte_body">
                      
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All conduits and wiring.                                                         
                                        </li>
                                    <li class="list-group-item">Wires - Finolex / V-Guard / Polycab                                                        
                                        </li>
                                    <li class="list-group-item">Switches & Switchboard
                                        – Anchor / Legrand / GM                                                                                                                                       
                                        </li>
                                    <li class="list-group-item">Switches and switchboard
                                        Connections, points provided for UPS/AC points wherever
                                        required.                                                                                                                               
                                        </li>
                                </ul>
                            </section>
                          </section>
                        </section>
                
                    <section class="card card_estimator_choice">
                          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
                           data-target="#flush-collapse22" aria-expanded="false" aria-controls="flush-collapseOne">
                            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                                <span class="fw-semibold">Basement</span>
                            </button>
                          </h2>
                          <section id="flush-collapse22" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                       
                            <section class="card-body card_estimate_calculte_body">
                                <span class="fw-semibold subheading_calculate">Basement Construction</span>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Basement shall be charged at Rs 900/sqft                                                         
                                        </li>
                                </ul>
                            </section>
                          </section>
                        </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Design</span>
              </button>
            </h2>
            <section id="flush-collapseOne" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">2D Drawings</li>
                      <li class="list-group-item">Floor Plan</li>
                      <li class="list-group-item"> Furniture Layout</li>
                      <li class="list-group-item"> Electrical Drawings</li>
                      <li class="list-group-item">  Plumbing Drawings</li>
                      <li class="list-group-item">   3D Elevation-Renders</li>
                      <li class="list-group-item">   Interior Designing - 2D & Renders</li>
                      <li class="list-group-item">   False ceiling Drawings</li>
                      <li class="list-group-item">  Structural Drawings</li>
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps23" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Architectural Details and Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps23" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Circular/ helical staircase will be charged extra at Rs
                        650/sqft.
                      </li>
                      <li class="list-group-item"> b) All arches shall be made of 18mm
                        ply with 1mm laminate as per the requirement places at
                        additional cost.</li>
                      <li class="list-group-item">  c) Tapered roof area will be charged additional</li>
                      <li class="list-group-item">d) Elevations with CNC cutting jalli/ RCC pergolas/ MS
                        pergolas will be charged extra.</li>
                      <li class="list-group-item">  e) Wall niches shall be provided as
                        per the Architects design & will be charged additional</li>
                      <li class="list-group-item">   f) Lofts will be charged extra</li>
                      <li class="list-group-item">     g) Cut lintels over doors and windows will be provided.</li>
                      <li class="list-group-item"> h) Architect drawings to be provided
                        in stages to the contracting company during construction, which will be a
                        base line for design, material and finishing specifications.
                        i) 5 Feet Compound wall will be charged
                        additional @ Rs 1800/rft.</li>
                      <li class="list-group-item">  i) 5 Feet Compound wall will be charged
                        additional @ Rs 1800/rft.
                        </li>
                      <li class="list-group-item"> j) All plumbing and electrical work will
                        be done as per the drawing given by the Architect.
                        </li>
                      <li class="list-group-item"> k) Govt. Taxes Extra.</li>
                      <li class="list-group-item"> l) Light Fittings Landscaping, Chimney Stove will be charged extra.
                    </li>
                      <li class="list-group-item">m) Any other specifications not exclusively mentioned here means it is
                        additional cost</li>
                      <li class="list-group-item">n) Interior design will be as per
                        agreed upon sizes/ materials as mentioned in the contract.
                        </li>
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps24" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Site Related Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps24" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Rainwater sump, Percolation pit and site cleaning will
                        be charged extra .
                        
                      </li>
                      <li class="list-group-item"> b) Excavation will be charged extra when encountered
                        with water/loose soil/stone</li>
                      <li class="list-group-item">  c) Water ,Temprory Electricity connection including the
                        plug points in the shed to be provided by the client.</li>
                      <li class="list-group-item"> d) All the neccesary approvals including Plan approval to
                        be taken by the client.</li>
                      <li class="list-group-item">e) Incase of complete excavation of the site additinal
                        charges will be applied.</li>
                    
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps25" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Structural Details and Extra Charges</span>
              </button>
            </h2>
            <section id="flush-collaps25" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Depth of the foundation more than 6’ feet will be charged additional.
                      </li>
                      <li class="list-group-item">     b) Eccentric footing will be charged extra.</li>
                      <li class="list-group-item"> c) Extra Reinforcement will be
                        charged extra</li>
                      <li class="list-group-item"> d) Slab thickness more than 6” will
                        be charged</li>
                      <li class="list-group-item">e) SSM below plinth beam will be charged extra.</li>
                      <li class="list-group-item"> f) Lift concrete wall be charged extra.</li>
                      <li class="list-group-item">   g) Double matt and strap beam for eccentric footings will be charged
                        extra.</li>
                      <li class="list-group-item"> h) Footings and column provision for
                        additional floor will be charged extra.</li>
                      <li class="list-group-item">  i) Additional charges will apply if Soil bearing capacity(SBC) 160.</li>
                      <li class="list-group-item">  j) Elevation work not included in the price.</li>
                      <li class="list-group-item"> k) Main gate of maximum size 15' x 5' or worth 25000 included in the
                        compound wall charges.</li>
                      <li class="list-group-item">l) Maximum of 2 toilets per 1000sqft of buildup will be given.</li>
                      <li class="list-group-item"> m) Windows opening will be upto
                        12 % of built up area.</li>
                      <li class="list-group-item">n) Soil Test will be charged additional</li>
                    
                  </ul>
              </section>
            </section>
          </section>

                            
        <section class="card card_estimator_choice">
            <h2 class="card_header  collapsed" id="flush-headingOne" data-toggle="collapse" data-target="#flush-collaps26" aria-expanded="false" aria-controls="flush-collapseOne">
              <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                  <span class="fw-semibold">Brands</span>
              </button>
            </h2>
            <section id="flush-collaps26" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
              <section class="card-body card_estimate_calculte_body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        a) Steel brands - Meenakshi / Jindal / JSW /
                        Indus / Equivalent
                      </li>
                      <li class="list-group-item">  b) Cement brands – ACC / Birla /Ramco /
                        Ultratech /Equivalent</li>
                      <li class="list-group-item">  c) Plumbing Pipes- CPVC and PVC Pipe of
                        Ashirwad and Supreme brand.</li>
                  </ul>
              </section>
            </section>
          </section>
          

          <section class="card card_estimator_choice">
          <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
           data-target="#flush-collapdiffer1" aria-expanded="false" aria-controls="flush-collapseOne">
            <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                <span class="fw-semibold">Family Living Room</span>
            </button>
          </h2>
          <section id="flush-collapdiffer1" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
            <section class="card-body card_estimate_calculte_body">
                <span class="fw-semibold subheading_calculate">Flooring</span>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Vitrified flooring up to Rs 195/sq ft
                        </li>
                  
                </ul>
            </section>
            <section class="card-body card_estimate_calculte_body">
                <span class="fw-semibold subheading_calculate">Accent Wall</span>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Royal play or wallpaper from Asian
                        paints (Size: 12’x10’)
                        </li>
                  
                </ul>
            </section>

          </section>
        </section>


        <section class="card card_estimator_choice">
              <h2 class="card_header collapsed" id="flush-headingFour" data-toggle="collapse"
               data-target="#flush-collapsdiffer2" aria-expanded="false" aria-controls="flush-collapseOne">
                <button class=" btn_career_estimator_purpose btn-block text-left" type="button" >
                    <span class="fw-semibold">Powder Room</span>
                </button>
              </h2>
              <section id="flush-collapsdiffer2" class=" collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample1">
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Flooring</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Ceramic tiles for floor and wall up to ceiling height up to
                            Rs 105/sq ft    
                            </li>
                      
                    </ul>
                </section>
                <section class="card-body card_estimate_calculte_body">
                    <span class="fw-semibold subheading_calculate">Bathroom Fixtures</span>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bathroom fixtures worth Rs. 20000
                         
                            </li>
                      
                    </ul>
                </section>
              </section>
            </section>

            </section>
    `

    if (package === 'Basic'){
        return basicHTML ;
    }
    else if (package === 'Standard'){
        return standardHTML ;
    }
    else if (package === 'Deluxe'){
        return deluxeHTML ;
    }
    else if (package === 'Premium'){
        return premiumHTML ;
    }
    else{
        return '';
    }
  }

$(function () {
    $("#dropdownPackage1").html(comparePackages('Basic'));
    $("#dropdownPackage2").html(comparePackages('Standard'));
    $("#package1").change(function () {
        $("#package2 option").prop('disabled', false);

        var selectedValue1 = $(this).val();
        $("#package2 option[value="+ selectedValue1 +"]").prop("disabled", true);

        if (selectedValue1 === 'Standard'){
            $('#package2 option[value="Basic"]').prop('selected', true)    
            $("#dropdownPackage2").html(comparePackages('Basic'));
        }
        else {
            $('#package2').val(function () {
                return $(this).find('option').filter(function () {
                    return $(this).prop('defaultSelected');
                }).val();
            });
            $("#dropdownPackage2").html(comparePackages('Standard'));
        }
        $("#dropdownPackage1").html(comparePackages(selectedValue1))
    });
    $("#package2").change(function () {
        $("#package1 option").prop('disabled', false);

        var selectedValue2 = $(this).val();
        $("#package1 option[value="+ selectedValue2 +"]").prop("disabled", true);
        
        $("#dropdownPackage2").html(comparePackages(selectedValue2))
    });
});