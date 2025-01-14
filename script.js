// script.js
const metricRadio = document.querySelector('input[value="metric"]');
const imperialRadio = document.querySelector('input[value="imperial"]');
const metricInputs = document.querySelector('.metric-inputs');
const imperialInputs = document.querySelector('.imperial-inputs');
const heightMetricInput = document.getElementById('metric-height');
const weightMetricInput = document.getElementById('metric-weight');
const heightImperialFtInput = document.getElementById('imperial-height-ft');
const heightImperialInInput = document.getElementById('imperial-height-in');
const weightImperialStInput = document.getElementById('imperial-weight-st');
const weightImperialLbsInput = document.getElementById('imperial-weight-lbs');
const bmiValueDisplay = document.querySelector('.bmi-result .bmi-value');
const weightClassificationDisplay = document.querySelector('.bmi-result .weight-classification');
const healthyWeightRangeDisplay = document.querySelector('.bmi-result .healthy-weight-range');

function calculateBmi() {
    let height, weight, bmi;

    if (metricRadio.checked) {
        height = parseFloat(heightMetricInput.value) / 100; // Convert cm to meters
        weight = parseFloat(weightMetricInput.value);
    } else if (imperialRadio.checked) {
        const heightFt = parseFloat(heightImperialFtInput.value) || 0;
        const heightIn = parseFloat(heightImperialInInput.value) || 0;
        const weightSt = parseFloat(weightImperialStInput.value) || 0;
        const weightLbs = parseFloat(weightImperialLbsInput.value) || 0;

        height = (heightFt * 12 + heightIn) * 0.0254; // Convert feet and inches to meters
        weight = (weightSt * 14 + weightLbs) * 0.453592; // Convert stone and pounds to kilograms
    }

    if (height && weight) {
        bmi = weight / (height * height);
        displayBmi(bmi);
    } else {
        bmiValueDisplay.textContent = '--';
        weightClassificationDisplay.textContent = '';
        healthyWeightRangeDisplay.textContent = '';
    }
}

function displayBmi(bmi) {
    const roundedBmi = bmi.toFixed(1);
    bmiValueDisplay.textContent = roundedBmi;

    let classification = '';
    if (bmi < 18.5) {
        classification = 'underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        classification = 'healthy weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
        classification = 'overweight';
    } else {
        classification = 'obese';
    }
    weightClassificationDisplay.textContent = classification;

    calculateAndDisplayHealthyWeightRange();
}

function calculateAndDisplayHealthyWeightRange() {
    let minHeight, maxHeight;
    if (metricRadio.checked) {
        minHeight = parseFloat(heightMetricInput.value) / 100;
        maxHeight = parseFloat(heightMetricInput.value) / 100;
    } else {
        const heightFt = parseFloat(heightImperialFtInput.value) || 0;
        const heightIn = parseFloat(heightImperialInInput.value) || 0;
        minHeight = (heightFt * 12 + heightIn) * 0.0254;
        maxHeight = (heightFt * 12 + heightIn) * 0.0254;
    }

    if (minHeight) {
        const minWeightKg = (18.5 * minHeight * minHeight).toFixed(1);
        const maxWeightKg = (24.9 * maxHeight * maxHeight).toFixed(1);

        if (metricRadio.checked) {
            healthyWeightRangeDisplay.textContent = `${minWeightKg}kgs - ${maxWeightKg}kgs`;
        } else {
            const minWeightSt = Math.floor(minWeightKg / 6.35029);
            const minWeightLbs = Math.round(minWeightKg * 2.20462);
            const maxWeightSt = Math.floor(maxWeightKg / 6.35029);
            const maxWeightLbs = Math.round(maxWeightKg * 2.20462);

            healthyWeightRangeDisplay.textContent = `${Math.floor(minWeightLbs / 14)}st ${minWeightLbs % 14}lbs - ${Math.floor(maxWeightLbs / 14)}st ${maxWeightLbs % 14}lbs`;
        }

    } else {
        healthyWeightRangeDisplay.textContent = '';
    }
}

metricRadio.addEventListener('change', () => {
    metricInputs.style.display = 'block';
    imperialInputs.style.display = 'none';
    calculateBmi();
});

imperialRadio.addEventListener('change', () => {
    imperialInputs.style.display = 'block';
    metricInputs.style.display = 'none';
    calculateBmi();
});

heightMetricInput.addEventListener('input', calculateBmi);
weightMetricInput.addEventListener('input', calculateBmi);
heightImperialFtInput.addEventListener('input', calculateBmi);
heightImperialInInput.addEventListener('input', calculateBmi);
weightImperialStInput.addEventListener('input', calculateBmi);
weightImperialLbsInput.addEventListener('input', calculateBmi);

// Initial calculation if values are pre-filled (optional)
calculateBmi();