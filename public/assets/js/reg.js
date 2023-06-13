const prevBtn = document.querySelectorAll(".btn-pre");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");

let formStepNum = 0;
console.log(
  nextBtns.forEach((btn) => {
    btn;
  })
);

nextBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    formStepNum++;
    console.log(formStepNum);
    updateFormStep();
  });
});

function updateFormStep() {
  formSteps(formStepNum).classList.add("form-active");
  console.log(formStepNum);
}
