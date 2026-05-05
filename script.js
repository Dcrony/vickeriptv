function scrollToPricing(){document.getElementById("pricing").scrollIntoView({behavior:"smooth"})}

let selectedServer='ULTRA8K';
function selectServer(el,name){
  document.querySelectorAll('.server-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  selectedServer=name;
}

function buyPlan(plan,price){
  const msg=encodeURIComponent("Hi! I'm interested in the "+plan+" plan ("+price+") on the "+selectedServer+" server. Can you help me get started?");
  window.open("https://wa.me/234XXXXXXXXXX?text="+msg,"_blank");
}

function contact(){window.location.href="https://wa.me/234XXXXXXXXXX"}

function toggleFaq(btn){
  const item=btn.parentElement;
  const isActive=item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
  if(!isActive)item.classList.add('active');
}

function toggleMobileMenu(){document.getElementById('mainNav').classList.toggle('active')}

const slides=document.querySelectorAll('.hero-slide');
let currentSlide=0;
function nextSlide(){
  slides[currentSlide].classList.remove('active');
  currentSlide=(currentSlide+1)%slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(nextSlide,5000);

const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

window.addEventListener('scroll',()=>{
  const header=document.getElementById('header');
  if(window.scrollY>50)header.style.background='rgba(5,5,5,0.98)';
  else header.style.background='rgba(5,5,5,0.9)';
});

function switchTab(tab) {
  const subBtn = document.getElementById('subBtn');
  const resBtn = document.getElementById('resBtn');
  const subPlans = document.getElementById('subscriptionPlans');
  const resPlans = document.getElementById('resellerPlans');

  if (tab === 'subscription') {
    subBtn.classList.add('active');
    resBtn.classList.remove('active');
    subPlans.classList.remove('hidden');
    resPlans.classList.add('hidden');
  } else {
    resBtn.classList.add('active');
    subBtn.classList.remove('active');
    resPlans.classList.remove('hidden');
    subPlans.classList.add('hidden');
  }
}