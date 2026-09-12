(() => {
  const data=window.MOTION;
  const $=id=>document.getElementById(id);
  const image=$('frame'),view=$('view'),speed=$('speed'),scrub=$('scrub'),play=$('play'),load=$('load');
  const buttons=[play,$('prev'),$('next'),$('first')];
  const cache=new Map();let current=1,playing=false,ready=false,raf=0,start=0,startFrame=1,request=0;
  const path=(v,f)=>`frames/${v}/${String(f).padStart(3,'0')}.png`;
  function stop(){playing=false;cancelAnimationFrame(raf);play.textContent='재생';play.setAttribute('aria-pressed','false')}
  function paint(frame){
    current=(frame-1+data.frames)%data.frames+1;
    image.src=path(view.value,current);image.alt=`래브라도 달리기 ${view.selectedOptions[0].text} ${current}프레임`;
    $('counter').textContent=`${current} / ${data.frames}`;$('caption').textContent=`${view.selectedOptions[0].text} · ${current} / ${data.frames}`;scrub.value=String(current);
    $('body-phase').textContent=data.poses[current-1].body_phase;
    for(const [name,label] of Object.entries(data.poses[current-1].limbs)){
      const row=$(name);row.querySelector('b').textContent=label;row.dataset.state=label.startsWith('지지')?'stance':label.startsWith('착지')?'landing':'swing';
    }
  }
  function prepare(v){
    if(!cache.has(v))cache.set(v,Promise.all(Array.from({length:data.frames},(_,i)=>new Promise((resolve,reject)=>{
      const img=new Image();img.onload=()=>{const p=typeof img.decode==='function'?img.decode():Promise.resolve();p.then(()=>resolve(img),reject)};img.onerror=()=>reject(new Error(path(v,i+1)));img.src=path(v,i+1);
    }))));
    return cache.get(v);
  }
  async function changeView(){
    stop();ready=false;const token=++request;buttons.forEach(b=>b.disabled=true);scrub.disabled=true;
    document.querySelectorAll('[data-frame]').forEach(b=>b.disabled=true);load.textContent=`${view.selectedOptions[0].text} 프레임을 준비하고 있습니다.`;
    try{
      await prepare(view.value);if(token!==request)return;
      ready=true;paint(current);buttons.forEach(b=>b.disabled=false);scrub.disabled=false;document.querySelectorAll('[data-frame]').forEach(b=>b.disabled=false);load.textContent=`${data.frames}프레임 준비됨 · 재생하거나 한 장씩 넘겨보세요.`;
    }catch(error){if(token===request)load.textContent=`프레임을 불러오지 못했습니다. 파일 위치를 확인해주세요: ${error.message}`}
  }
  function tick(now){
    if(!playing)return;
    const elapsed=Math.floor((now-start)*data.fps*Number(speed.value)/1000);const next=(startFrame-1+elapsed)%data.frames+1;
    if(next!==current)paint(next);raf=requestAnimationFrame(tick);
  }
  function toggle(){
    if(!ready)return;if(playing){stop();return}
    playing=true;start=performance.now();startFrame=current;play.textContent='정지';play.setAttribute('aria-pressed','true');raf=requestAnimationFrame(tick);
  }
  function seek(frame){stop();if(ready)paint(frame)}
  play.addEventListener('click',toggle);$('prev').addEventListener('click',()=>seek(current-1));$('next').addEventListener('click',()=>seek(current+1));$('first').addEventListener('click',()=>seek(1));
  scrub.addEventListener('input',()=>seek(Number(scrub.value)));view.addEventListener('change',changeView);
  speed.addEventListener('change',()=>{if(playing){start=performance.now();startFrame=current}});
  document.querySelectorAll('[data-frame]').forEach(b=>b.addEventListener('click',()=>seek(Number(b.dataset.frame))));
  document.addEventListener('keydown',e=>{
    if(e.target.matches('input,select,button,a,summary')||e.ctrlKey||e.metaKey||e.altKey)return;
    if(e.key==='ArrowLeft'){e.preventDefault();seek(current-1)}else if(e.key==='ArrowRight'){e.preventDefault();seek(current+1)}else if(e.code==='Space'){e.preventDefault();toggle()}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop()}).observe(image);
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');motion.addEventListener('change',()=>stop());
  window.addEventListener('pagehide',stop);changeView();
})();
