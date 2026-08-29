const weddingDate = new Date('2027-02-14T15:00:00+05:30');

function updateCountdown(){
  const diff = weddingDate - Date.now();
  const values = diff > 0 ? {
    days: Math.floor(diff/86400000),
    hours: Math.floor(diff/3600000)%24,
    minutes: Math.floor(diff/60000)%60,
    seconds: Math.floor(diff/1000)%60
  } : {days:0,hours:0,minutes:0,seconds:0};
  for(const [id,value] of Object.entries(values)) document.getElementById(id).textContent=String(value).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

const form=document.getElementById('rsvp-form');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  const saved=JSON.parse(localStorage.getItem('wedding-rsvps')||'[]');
  saved.push({...data,submittedAt:new Date().toISOString()});
  localStorage.setItem('wedding-rsvps',JSON.stringify(saved));
  form.hidden=true;
  document.getElementById('success').hidden=false;
});
