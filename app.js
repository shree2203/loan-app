document.getElementById('loan-form').addEventListener('submit',function(e){
   //hide the results
   document.getElementById('result').style.display = 'none';
   //hide the loader
   document.getElementById('loading').style.display = 'block';

  setTimeout(calculate,2000);
   e.preventDefault();
});

function calculate(e) {
   const amount = document.getElementById('amount');
   const interests = document.getElementById('interest');
   const year = document.getElementById('years');
   const monthelyPayment = document.getElementById('monthely-payment');
   const totalPayment = document.getElementById('total-payment');
   const totalInterest = document.getElementById('total-interest');
   
   const principal = parseFloat(amount.value);
   const calcInterest = parseFloat(interests.value) / 100 / 12;
   const calcYears = parseFloat(year.value) * 12;

   const x = Math.pow(1 + calcInterest , calcYears);
   const monthly = (principal*x*calcInterest)/(x-1);

   if(isFinite(monthly)){
      monthelyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calcYears).toFixed(2);
      totalInterest.value = ((monthly * calcYears)-principal).toFixed(2);

      document.getElementById('loading').style.display = 'none';
      document.getElementById('result').style.display = 'block'; 
   }else{
      showError('Please check your number');
   }
   
}

function showError(error){
   const errorDiv = document.createElement('div');
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');

   errorDiv.className = 'alert alert-danger';
   errorDiv.appendChild(document.createTextNode(error));
   card.insertBefore(errorDiv,heading);
   document.getElementById('loading').style.display = 'none';
   setTimeout(clearDiv,2000);
}

function clearDiv(){
   document.querySelector('.alert').remove();
}