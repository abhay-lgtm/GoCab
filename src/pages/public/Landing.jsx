import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck, Mic, MapPin, Star, ChevronRight,
  CheckCircle, Zap, Clock, Navigation, ArrowRight, Sparkles,
} from "lucide-react";
import { RideSphereLogoMark } from "../../components/layout/Navbar";
import { useAuth } from "../../context/AuthContext";

/* --- Inline Nav --- */
function LandingNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardLink =
    user?.role === "driver" ? "/driver/dashboard" :
    user?.role === "admin"  ? "/admin/dashboard"  :
    "/customer/dashboard";

  return (
    <header style={{
      position:"fixed",top:0,left:0,right:0,zIndex:50,
      background:"rgba(5,9,26,0.75)",
      backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 2rem",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link to="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <RideSphereLogoMark size={30}/>
          <span style={{fontSize:18,fontWeight:800,color:"#fff",letterSpacing:"-0.02em"}}>Ride<span style={{color:"#5b8eff"}}>Sphere</span></span>
        </Link>
        <nav style={{display:"flex",alignItems:"center",gap:8}}>
          {user ? (
            <>
              <Link to={dashboardLink}><button style={gBtn}>Dashboard</button></Link>
              <button onClick={()=>{logout();navigate("/");}} style={pBtn}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login"><button style={gBtn}>Sign in</button></Link>
              <Link to="/register"><button style={pBtn}>Get Started <ArrowRight size={13}/></button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

const gBtn={background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:10,padding:"8px 18px",fontSize:14,fontWeight:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6};
const pBtn={background:"linear-gradient(135deg,#4f7eff 0%,#3b5ce4 100%)",border:"none",color:"#fff",borderRadius:10,padding:"8px 20px",fontSize:14,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,boxShadow:"0 4px 24px rgba(75,126,255,0.35)"};

const features=[
  {icon:Zap,title:"Instant Booking",desc:"Book a reliable cab in under 30 seconds. No waiting, no hassle.",accent:"#4f7eff",glow:"rgba(79,126,255,0.15)"},
  {icon:ShieldCheck,title:"SafeRide Mode",desc:"Verified drivers, live trip sharing, and one-tap SOS.",accent:"#10b981",glow:"rgba(16,185,129,0.15)"},
  {icon:Mic,title:"Voice Booking",desc:"Just speak your destination — our AI handles the rest.",accent:"#a78bfa",glow:"rgba(167,139,250,0.15)"},
  {icon:Clock,title:"Real-Time Tracking",desc:"Track your ride live and share your trip with loved ones.",accent:"#f59e0b",glow:"rgba(245,158,11,0.15)"},
];

const stats=[
  {label:"Happy Riders",value:"50K+"},
  {label:"Verified Drivers",value:"1,200+"},
  {label:"Cities Covered",value:"24"},
  {label:"Avg. Rating",value:"4.8\u2605"},
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{minHeight:"100vh",background:"#05091a",fontFamily:"Inter, system-ui, sans-serif"}}>
      <LandingNav/>

      {/* --- Hero --- */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"100px 2rem 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-200,left:-200,width:700,height:700,background:"radial-gradient(circle,rgba(79,126,255,0.12) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-150,right:-150,width:600,height:600,background:"radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(79,126,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(79,126,255,0.03) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>

        <div style={{maxWidth:1280,margin:"0 auto",width:"100%",position:"relative"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>

            {/* Left – Copy */}
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(79,126,255,0.12)",border:"1px solid rgba(79,126,255,0.25)",borderRadius:100,padding:"6px 16px",marginBottom:28}}>
                <Sparkles size={13} color="#5b8eff"/>
                <span style={{color:"#5b8eff",fontSize:13,fontWeight:600}}>Smart rides. Safer journeys.</span>
              </div>
              <h1 style={{fontSize:"clamp(42px,5vw,72px)",fontWeight:800,lineHeight:1.08,letterSpacing:"-0.03em",color:"#fff",marginBottom:24}}>
                Your journey,{" "}
                <span style={{background:"linear-gradient(135deg,#5b8eff 0%,#a78bfa 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>simplified.</span>
              </h1>
              <p style={{fontSize:18,lineHeight:1.7,color:"rgba(255,255,255,0.55)",marginBottom:40,maxWidth:480}}>
                Book reliable rides in seconds, travel with confidence, and stay connected every step of the way.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:48}}>
                <button
                  onClick={()=>navigate("/login")}
                  style={{background:"linear-gradient(135deg,#4f7eff 0%,#3b5ce4 100%)",border:"none",color:"#fff",borderRadius:14,padding:"14px 28px",fontSize:16,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 32px rgba(75,126,255,0.4)",transition:"transform 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}
                >
                  Book a Ride <ChevronRight size={18}/>
                </button>
                <button
                  onClick={()=>navigate("/customer/saferide")}
                  style={{background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",color:"#10b981",borderRadius:14,padding:"14px 28px",fontSize:16,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"background 0.2s,transform 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(16,185,129,0.18)";e.currentTarget.style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(16,185,129,0.1)";e.currentTarget.style.transform=""}}
                >
                  <ShieldCheck size={18}/> Explore SafeRide
                </button>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{display:"flex"}}>
                  {["A","P","R","S"].map((l,i)=>(
                    <div key={i} style={{width:34,height:34,borderRadius:"50%",border:"2px solid #05091a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff",marginLeft:i===0?0:-10,background:["#4f7eff","#10b981","#a78bfa","#f59e0b"][i]}}>{l}</div>
                  ))}
                </div>
                <div>
                  <span style={{color:"#fff",fontWeight:700,fontSize:14}}>50,000+</span>
                  <span style={{color:"rgba(255,255,255,0.45)",fontSize:14}}> happy riders</span>
                </div>
                <div style={{display:"flex",gap:2}}>
                  {[1,2,3,4,5].map(s=><Star key={s} size={13} fill="#f59e0b" color="#f59e0b"/>)}
                </div>
              </div>
            </div>

            {/* Right – App Card */}
            <div style={{display:"flex",justifyContent:"center"}}>
              <div style={{width:"100%",maxWidth:420,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:28,padding:24,backdropFilter:"blur(12px)",boxShadow:"0 40px 80px rgba(0,0,0,0.5),0 0 60px rgba(79,126,255,0.08)"}}>
                {/* Map */}
                <div style={{borderRadius:18,background:"#0d1829",height:200,marginBottom:20,position:"relative",overflow:"hidden",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(79,126,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(79,126,255,0.06) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
                  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 420 200" preserveAspectRatio="xMidYMid slice">
                    <path d="M60 170 Q150 130 210 100 Q270 70 360 30" stroke="rgba(79,126,255,0.3)" strokeWidth="8" fill="none" strokeLinecap="round" filter="url(#glow)"/>
                    <path d="M60 170 Q150 130 210 100 Q270 70 360 30" stroke="#4f7eff" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M60 170 Q150 130 210 100 Q270 70 360 30" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="8 12" strokeLinecap="round"/>
                    <circle cx="200" cy="105" r="5" fill="#4f7eff"/>
                    <circle cx="200" cy="105" r="12" fill="rgba(79,126,255,0.2)"/>
                  </svg>
                  <div style={{position:"absolute",top:12,right:12,display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.08)",backdropFilter:"blur(8px)",borderRadius:10,padding:"6px 10px",border:"1px solid rgba(255,255,255,0.1)"}}>
                    <Navigation size={11} color="#4f7eff"/><span style={{color:"#fff",fontSize:11,fontWeight:500}}>Kottayam Stn.</span>
                  </div>
                  <div style={{position:"absolute",bottom:12,left:12,display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.08)",backdropFilter:"blur(8px)",borderRadius:10,padding:"6px 10px",border:"1px solid rgba(255,255,255,0.1)"}}>
                    <MapPin size={11} color="#10b981"/><span style={{color:"#fff",fontSize:11,fontWeight:500}}>IIIT Kottayam</span>
                  </div>
                  <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"rgba(79,126,255,0.9)",borderRadius:8,padding:"4px 10px"}}>
                    <span style={{color:"#fff",fontSize:11,fontWeight:700}}>5 min</span>
                  </div>
                </div>
                {/* Driver */}
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16,padding:"14px 16px",background:"rgba(255,255,255,0.04)",borderRadius:16,border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#4f7eff,#3b5ce4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff",flexShrink:0}}>R</div>
                  <div style={{flex:1}}>
                    <p style={{color:"#fff",fontSize:14,fontWeight:700,margin:0}}>Rajesh Kumar</p>
                    <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,margin:0}}>Hyundai i20 &middot; KL 07 AX 4521</p>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end"}}>
                      <Star size={12} fill="#f59e0b" color="#f59e0b"/>
                      <span style={{color:"#fff",fontSize:13,fontWeight:700}}>4.8</span>
                    </div>
                    <p style={{color:"rgba(255,255,255,0.35)",fontSize:11,margin:0}}>5 min away</p>
                  </div>
                </div>
                {/* SafeRide badge */}
                <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:12,padding:"10px 14px"}}>
                  <ShieldCheck size={16} color="#10b981"/>
                  <span style={{color:"#10b981",fontSize:13,fontWeight:600,flex:1}}>SafeRide Active</span>
                  <CheckCircle size={14} color="#10b981"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Stats Bar --- */}
      <section style={{borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"48px 2rem",background:"rgba(255,255,255,0.02)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2rem",textAlign:"center"}}>
            {stats.map(({label,value})=>(
              <div key={label}>
                <p style={{fontSize:"clamp(32px,4vw,48px)",fontWeight:800,color:"#fff",letterSpacing:"-0.03em",lineHeight:1,margin:0}}>{value}</p>
                <p style={{color:"rgba(255,255,255,0.4)",fontSize:14,marginTop:8,fontWeight:500,margin:"8px 0 0"}}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Features --- */}
      <section id="features" style={{padding:"100px 2rem"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:64}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(79,126,255,0.1)",border:"1px solid rgba(79,126,255,0.2)",borderRadius:100,padding:"6px 16px",marginBottom:20}}>
              <Sparkles size={13} color="#5b8eff"/>
              <span style={{color:"#5b8eff",fontSize:13,fontWeight:600}}>Platform Features</span>
            </div>
            <h2 style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:800,color:"#fff",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:16}}>
              Everything you need,<br/>nothing you don&apos;t.
            </h2>
            <p style={{color:"rgba(255,255,255,0.45)",fontSize:18,maxWidth:520,margin:"0 auto"}}>
              RideSphere is designed around what matters &mdash; your safety, comfort, and time.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.5rem"}}>
            {features.map(({icon:Icon,title,desc,accent,glow})=>(
              <div key={title}
                style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:24,padding:28,cursor:"default",transition:"border-color 0.2s,transform 0.2s,box-shadow 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=accent+"44";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 20px 40px ${glow}`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}
              >
                <div style={{width:48,height:48,borderRadius:14,background:`${accent}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,border:`1px solid ${accent}30`}}>
                  <Icon size={22} color={accent}/>
                </div>
                <h3 style={{color:"#fff",fontSize:16,fontWeight:700,marginBottom:10}}>{title}</h3>
                <p style={{color:"rgba(255,255,255,0.45)",fontSize:14,lineHeight:1.6,margin:0}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SafeRide --- */}
      <section id="safety" style={{padding:"100px 2rem",background:"linear-gradient(135deg,rgba(16,185,129,0.04) 0%,rgba(5,9,26,0) 60%)",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:100,padding:"6px 16px",marginBottom:24}}>
                <ShieldCheck size={13} color="#10b981"/>
                <span style={{color:"#10b981",fontSize:13,fontWeight:600}}>SafeRide</span>
              </div>
              <h2 style={{fontSize:"clamp(30px,3.5vw,48px)",fontWeight:800,color:"#fff",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:20}}>
                Travel with an extra<br/>layer of protection.
              </h2>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:17,lineHeight:1.7,marginBottom:36}}>
                Enable SafeRide Mode and ride with confidence. Our intelligent safety system connects you with verified drivers, shares your trip in real time, and keeps emergency help one tap away.
              </p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:14,marginBottom:40,padding:0}}>
                {["Verified driver matching","Live trip sharing with emergency contacts","One-tap SOS with location broadcast","Instant admin and contact notification"].map(item=>(
                  <li key={item} style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(16,185,129,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><CheckCircle size={14} color="#10b981"/></div>
                    <span style={{color:"rgba(255,255,255,0.8)",fontSize:15}}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <button style={{background:"linear-gradient(135deg,#10b981 0%,#059669 100%)",border:"none",color:"#fff",borderRadius:14,padding:"14px 28px",fontSize:16,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 32px rgba(16,185,129,0.35)",transition:"transform 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}
                >
                  Get Started with SafeRide <ArrowRight size={18}/>
                </button>
              </Link>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <div style={{width:"100%",maxWidth:380,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(16,185,129,0.15)",borderRadius:28,padding:28,boxShadow:"0 30px 60px rgba(0,0,0,0.4),0 0 60px rgba(16,185,129,0.06)"}}>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24,padding:"16px 18px",background:"rgba(16,185,129,0.1)",borderRadius:16,border:"1px solid rgba(16,185,129,0.2)"}}>
                  <div style={{width:46,height:46,borderRadius:14,background:"linear-gradient(135deg,#10b981,#059669)",display:"flex",alignItems:"center",justifyContent:"center"}}><ShieldCheck size={22} color="#fff"/></div>
                  <div>
                    <p style={{color:"#fff",fontSize:15,fontWeight:700,margin:0}}>SafeRide Active</p>
                    <p style={{color:"#10b981",fontSize:13,margin:"2px 0 0"}}>All protections enabled</p>
                  </div>
                </div>
                {["Rajesh Kumar \u2014 Verified \u2713","Mom notified \u00b7 +91 98765 43210","SOS ready \u00b7 Admin monitoring"].map((text,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:i<2?"1px solid rgba(255,255,255,0.05)":"none"}}>
                    <CheckCircle size={15} color="#10b981"/>
                    <span style={{color:"rgba(255,255,255,0.7)",fontSize:14}}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Voice Booking --- */}
      <section style={{padding:"100px 2rem"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
            {/* Card */}
            <div style={{display:"flex",justifyContent:"flex-start"}}>
              <div style={{width:"100%",maxWidth:380,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(167,139,250,0.15)",borderRadius:28,padding:32,textAlign:"center",boxShadow:"0 30px 60px rgba(0,0,0,0.4),0 0 60px rgba(167,139,250,0.06)"}}>
                <p style={{color:"rgba(255,255,255,0.4)",fontSize:14,marginBottom:28}}>Where would you like to go?</p>
                <div style={{position:"relative",width:96,height:96,margin:"0 auto 28px"}}>
                  <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"rgba(167,139,250,0.15)",animation:"pulse-ring 1.5s ease-out infinite"}}/>
                  <div style={{position:"absolute",inset:10,borderRadius:"50%",background:"rgba(167,139,250,0.2)"}}/>
                  <div style={{position:"absolute",inset:20,borderRadius:"50%",background:"linear-gradient(135deg,#a78bfa,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(167,139,250,0.4)"}}><Mic size={24} color="#fff"/></div>
                </div>
                <p style={{color:"rgba(255,255,255,0.25)",fontSize:12,marginBottom:20}}>Tap to speak</p>
                <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"16px 20px",textAlign:"left"}}>
                  <div style={{marginBottom:16}}>
                    <p style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 4px"}}>Pickup</p>
                    <p style={{color:"#fff",fontSize:14,fontWeight:600,margin:0}}>IIIT Kottayam</p>
                  </div>
                  <div>
                    <p style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 4px"}}>Destination</p>
                    <p style={{color:"#fff",fontSize:14,fontWeight:600,margin:0}}>Kottayam Railway Station</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.25)",borderRadius:100,padding:"6px 16px",marginBottom:24}}>
                <Mic size={13} color="#a78bfa"/>
                <span style={{color:"#a78bfa",fontSize:13,fontWeight:600}}>Voice Booking</span>
              </div>
              <h2 style={{fontSize:"clamp(30px,3.5vw,48px)",fontWeight:800,color:"#fff",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:20}}>
                Book a ride<br/>with your voice.
              </h2>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:17,lineHeight:1.7,marginBottom:36}}>
                Just say where you&apos;re going. RideSphere understands your destination and books a ride &mdash; no typing, no tapping, just speak.
              </p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:14,marginBottom:40,padding:0}}>
                {["Say \"Kottayam Railway Station\" to book instantly","Automatic pickup detection","Edit or confirm with one tap","Works in English and regional accents"].map(item=>(
                  <li key={item} style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(167,139,250,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><CheckCircle size={14} color="#a78bfa"/></div>
                    <span style={{color:"rgba(255,255,255,0.8)",fontSize:15}}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/customer/voice-booking">
                <button style={{background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.3)",color:"#a78bfa",borderRadius:14,padding:"14px 28px",fontSize:16,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"background 0.2s,transform 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(167,139,250,0.18)";e.currentTarget.style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(167,139,250,0.1)";e.currentTarget.style.transform=""}}
                >
                  <Mic size={18}/> Try Voice Booking
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section style={{padding:"100px 2rem",background:"linear-gradient(135deg,rgba(79,126,255,0.08) 0%,rgba(5,9,26,0) 60%)",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <div style={{maxWidth:780,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:28}}><RideSphereLogoMark size={52}/></div>
          <h2 style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:800,color:"#fff",letterSpacing:"-0.03em",lineHeight:1.08,marginBottom:20}}>Ready to ride smarter?</h2>
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:18,marginBottom:44}}>Join 50,000+ riders who trust RideSphere for every journey.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <Link to="/register">
              <button style={{background:"linear-gradient(135deg,#4f7eff 0%,#3b5ce4 100%)",border:"none",color:"#fff",borderRadius:14,padding:"16px 36px",fontSize:17,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 40px rgba(75,126,255,0.45)",transition:"transform 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.currentTarget.style.transform=""}
              >
                Create Your Account <ChevronRight size={20}/>
              </button>
            </Link>
            <Link to="/login">
              <button style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"#fff",borderRadius:14,padding:"16px 36px",fontSize:17,fontWeight:600,cursor:"pointer",transition:"background 0.2s,transform 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)";e.currentTarget.style.transform="translateY(-2px)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.transform=""}}
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"36px 2rem",background:"rgba(0,0,0,0.3)"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <RideSphereLogoMark size={22}/>
            <span style={{color:"rgba(255,255,255,0.6)",fontSize:14,fontWeight:700}}>Ride<span style={{color:"#5b8eff"}}>Sphere</span></span>
          </div>
          <p style={{color:"rgba(255,255,255,0.25)",fontSize:13,textAlign:"center",margin:0}}>&copy; 2024 RideSphere. Smart rides. Safer journeys. &middot; University Software Architecture Project</p>
          <div style={{display:"flex",gap:24}}>
            {["Safety","Privacy","Terms"].map(item=>(
              <button key={item} style={{background:"none",border:"none",color:"rgba(255,255,255,0.3)",fontSize:13,cursor:"pointer",transition:"color 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.65)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}
              >{item}</button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
