document.getElementById('fitnessForm').addEventListener('submit', function(e) {

  e.preventDefault();

  const name = document.getElementById('name').value;

  const height = parseFloat(document.getElementById('height').value) / 100;

  const weight = parseFloat(document.getElementById('weight').value);

  const level = document.getElementById('level').value;

  const bmi = (weight / (height * height)).toFixed(1);

  const water = (weight * 0.033).toFixed(2);

  let bmiStatus = '';

  if (bmi < 18.5) bmiStatus = 'نحيف';

  else if (bmi < 25) bmiStatus = 'وزن طبيعي';

  else if (bmi < 30) bmiStatus = 'وزن زائد';

  else bmiStatus = 'سمنة';

  let workoutPlan = '';

  let weeklyPlan = '';

  if (level === 'beginner') {

    workoutPlan = 'تمارين خفيفة 3 مرات في الأسبوع.';

    weeklyPlan = `

      السبت: مشي 30 دقيقة

      الاثنين: مقاومة خفيفة

      الأربعاء: يوجا

    `;

  } else if (level === 'intermediate') {

    workoutPlan = 'تمارين متوسطة 4-5 مرات تشمل كارديو + مقاومة.';

    weeklyPlan = `

      السبت: كارديو

      الأحد: مقاومة علوي

      الثلاثاء: مقاومة سفلي

      الخميس: تمارين شاملة

    `;

  } else {

    workoutPlan = 'تمارين مكثفة 5-6 أيام.';

    weeklyPlan = `

      السبت: HIIT

      الأحد: ظهر وأكتاف

      الثلاثاء: أرجل

      الخميس: جسم كامل

    `;

  }

  let diet = '';

  if (bmi > 25) diet = 'نظام غذائي قليل السعرات وغني بالبروتين.';

  else if (bmi < 18.5) diet = 'نظام لزيادة الوزن غني بالكربوهيدرات والبروتين.';

  else diet = 'نظام متوازن يحتوي على جميع العناصر الغذائية.';

  document.getElementById('result').innerHTML = `

    <h2>مرحباً ${name}</h2>

    <p><strong>مؤشر كتلة الجسم:</strong> ${bmi} (${bmiStatus})</p>

    <p><strong>احتياجك اليومي من الماء:</strong> ${water} لتر</p>

    <p><strong>خطة التمارين:</strong> ${workoutPlan}</p>

    <p><strong>النظام الغذائي المناسب:</strong> ${diet}</p>

    <h3>خطة التمارين الأسبوعية:</h3>

    <pre>${weeklyPlan}</pre>

    <a href="exercises.html?level=${level}" target="_blank">شوف التمارين بالصور</a>

    <button onclick="downloadPDF()">تحميل PDF</button>

  `;

  window.userPlan = {

    name, bmi, bmiStatus, water, workoutPlan, diet, weeklyPlan

  };

});

function downloadPDF() {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  const { name, bmi, bmiStatus, water, workoutPlan, diet, weeklyPlan } = window.userPlan;

  doc.setFont('Arial');

  doc.text(`Apdo Tarek Fit - تقرير`, 10, 10);

  doc.text(`الاسم: ${name}`, 10, 20);

  doc.text(`BMI: ${bmi} (${bmiStatus})`, 10, 30);

  doc.text(`المياه اليومية: ${water} لتر`, 10, 40);

  doc.text(`خطة التمارين: ${workoutPlan}`, 10, 50);

  doc.text(`النظام الغذائي: ${diet}`, 10, 60);

  doc.text(`الجدول الأسبوعي:`, 10, 70);

  doc.text(weeklyPlan, 10, 80);

  doc.save(`${name}_apdo_plan.pdf`);

}