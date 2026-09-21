import React, { useEffect, useRef, useState } from 'react';
import {
  AirVent, ArrowLeft, ArrowRight, CalendarDays, Car, ChevronLeft, ChevronRight,
  Globe, Heart, KeyRound, MapPin, Menu, Search, Share, ShieldCheck, Star,
  Tv, UserRound, Utensils, Waves, Wifi, X
} from 'lucide-react';
import { amenities, hero, photos, ratingBreakdown, reviews, sleepCards, BASE } from './data';

const fallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.dataset.fallback === '1') return;
  img.dataset.fallback = '1';
  const local = img.getAttribute('src') || '';
  img.src = local.startsWith('/assets/images/')
    ? `${BASE}/${local.slice('/assets/images/'.length)}`
    : BASE + local;
};

function IconButton({ children, label, onClick, className = '' }: { children: React.ReactNode, label: string, onClick?: () => void, className?: string }) {
  return (
    <button aria-label={label} title={label} onClick={onClick} className={`icon-btn ${className}`}>
      {children}
    </button>
  );
}

function Header() {
  return (
    <header className="site-header" id="siteHeader">
      <div className="header-inner">
        <a className="brand" href="#" aria-label="Airbnb homepage">
          <svg className="brand-logo" viewBox="0 0 3490 1080" aria-hidden="true">
            <path fill="currentColor" d="M1494.71 456.953C1458.28 412.178 1408.46 389.892 1349.68 389.892C1233.51 389.892 1146.18 481.906 1146.18 605.892C1146.18 729.877 1233.51 821.892 1349.68 821.892C1408.46 821.892 1458.28 799.605 1494.71 754.83L1500.95 810.195H1589.84V401.588H1500.95L1494.71 456.953ZM1369.18 736.895C1295.33 736.895 1242.08 683.41 1242.08 605.892C1242.08 528.373 1295.33 474.888 1369.18 474.888C1443.02 474.888 1495.49 529.153 1495.49 605.892C1495.49 682.63 1443.8 736.895 1369.18 736.895ZM1656.11 810.195H1750.46V401.588H1656.11V810.195ZM948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902ZM3285.71 389.892C3226.91 389.892 3175.97 413.098 3139.91 456.953V226.917H3045.56V810.195H3134.45L3140.69 754.83C3177.12 799.605 3226.94 821.892 3285.71 821.892C3401.89 821.892 3489.22 729.877 3489.22 605.892C3489.22 481.906 3401.89 389.892 3285.71 389.892ZM3266.22 736.895C3191.6 736.895 3139.91 682.63 3139.91 605.892C3139.91 529.153 3191.6 474.888 3266.22 474.888C3340.85 474.888 3393.32 528.373 3393.32 605.892C3393.32 683.41 3340.07 736.895 3266.22 736.895ZM2827.24 389.892C2766.15 389.892 2723.56 418.182 2699.37 456.953L2693.13 401.588H2604.24V810.195H2698.59V573.921C2698.59 516.217 2741.47 474.888 2800.73 474.888C2856.87 474.888 2888.84 513.097 2888.84 578.599V810.195H2983.19V566.903C2983.19 457.733 2923.15 389.892 2827.24 389.892ZM1911.86 460.072L1905.62 401.588H1816.73V810.195H1911.08V604.332C1911.08 532.592 1954.74 486.585 2027.26 486.585C2042.85 486.585 2058.44 488.144 2070.92 492.043V401.588C2059.22 396.91 2044.41 395.35 2028.04 395.35C1978.58 395.35 1936.66 421.177 1911.86 460.072ZM2353.96 389.892C2295.15 389.892 2244.21 413.098 2208.15 456.953V226.917H2113.8V810.195H2202.69L2208.93 754.83C2245.36 799.605 2295.18 821.892 2353.96 821.892C2470.13 821.892 2557.46 729.877 2557.46 605.892C2557.46 481.906 2470.13 389.892 2353.96 389.892ZM2334.46 736.895C2259.84 736.895 2208.15 682.63 2208.15 605.892C2208.15 529.153 2259.84 474.888 2334.46 474.888C2409.09 474.888 2461.56 528.373 2461.56 605.892C2461.56 683.41 2408.31 736.895 2334.46 736.895ZM1703.28 226.917C1669.48 226.917 1642.08 254.326 1642.08 288.13C1642.08 321.934 1669.48 349.343 1703.28 349.343C1737.09 349.343 1764.49 321.934 1764.49 288.13C1764.49 254.326 1737.09 226.917 1703.28 226.917Z" />
          </svg>
        </a>
        <div className="searchbar" role="search">
          <button type="button">
            <img className="searchbar-house-icon" src="/assets/images/ui/searchbar-house.png" onError={fallback} alt="" />
            Anywhere
          </button>
          <span className="searchbar-divider" />
          <button type="button">Anytime</button>
          <span className="searchbar-divider" />
          <button type="button" className="guests">Add guests</button>
          <button type="button" className="search-go" aria-label="Search">
            <Search size={16} />
          </button>
        </div>
        <div className="header-actions">
          <button type="button" className="host-link">Become a host</button>
          <IconButton label="Choose language">
            <Globe size={18} />
          </IconButton>
          <IconButton label="Account menu" className="account">
            <Menu size={16} />
            <UserRound size={18} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 520);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-subnav">
      <div className="sticky-subnav-inner">
        <nav className="subnav-links" aria-label="Listing sections">
          <a href="#photos">Photos</a>
          <a href="#amenities">Amenities</a>
          <a href="#reviews">Reviews</a>
          <a href="#location">Location</a>
        </nav>
        <div className="sticky-subnav-right">
          <div className="sticky-price-block">
            <b>₹28,499</b> <span>for 5 nights</span>
            <div className="sticky-rating"><Star size={12} fill="currentColor" /> 4.95 · <u>19 reviews</u></div>
          </div>
          <button className="reserve-btn-sm" type="button">Reserve</button>
        </div>
      </div>
    </div>
  );
}

function HeroGallery({ openTour }: { openTour: () => void }) {
  return (
    <section className="hero-wrap" id="photos">
      <div
        className="hero-grid"
        onClick={openTour}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openTour(); }}
      >
        <img className="hero-main" src={hero[0].url} onError={fallback} alt={hero[0].alt} />
        {hero.slice(1).map((p, i) => (
          <img key={p.file} src={p.url} onError={fallback} alt={p.alt} className={`hero-side side-${i}`} />
        ))}
      </div>
      <button className="show-all" onClick={openTour} type="button">
        <span>⊞</span> Show all photos
      </button>
    </section>
  );
}

function GuestFavouriteBadge() {
  return (
    <div className="guest-favourite-card">
      <div className="laurel-frame">
        <svg className="laurel-svg" viewBox="0 0 20 32">
          <path fill="currentColor" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" />
        </svg>
        <span className="badge-text">Guest<br />favourite</span>
        <svg className="laurel-svg mirror" viewBox="0 0 20 32">
          <path fill="currentColor" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" />
        </svg>
      </div>
      <p className="favourite-desc">One of the most loved homes on Airbnb, according to guests</p>
      <div className="favourite-stats">
        <div className="stat-score">
          <b>4.95</b>
          <div className="stat-stars">★★★★★</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-reviews">
          <b>19</b>
          <span>Reviews</span>
        </div>
      </div>
    </div>
  );
}

function ListingInfo() {
  return (
    <>
      <div className="title-row">
        <div>
          <h1>Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1>
          <div className="title-meta">Entire serviced apartment in Candolim, India</div>
        </div>
        <div className="title-actions">
          <button type="button"><Share size={15} /> Share</button>
          <button type="button"><Heart size={15} /> Save</button>
        </div>
      </div>
      <div className="under-gallery">
        <div>
          <b>Entire serviced apartment in Candolim, India</b>
          <span>3 guests · 1 bedroom · 1 bed · 1 bathroom</span>
        </div>
      </div>
      <GuestFavouriteBadge />
      <div className="host-line">
        <img src="/assets/images/avatars/host.jpeg" onError={fallback} alt="Mirashya Homes" />
        <div>
          <b>Hosted by Mirashya Homes</b>
          <span>2 years hosting</span>
        </div>
      </div>
    </>
  );
}

function Highlights() {
  return (
    <section className="section divider">
      <h2>What makes this place special</h2>
      <div className="highlight-grid">
        <div>
          <span>◒</span>
          <div>
            <b>Outdoor entertainment</b>
            <p>The pool and alfresco dining are great for summer trips.</p>
          </div>
        </div>
        <div>
          <span>❄</span>
          <div>
            <b>Designed for staying cool</b>
            <p>Beat the heat with the A/C and ceiling fan.</p>
          </div>
        </div>
        <div>
          <span>⌂</span>
          <div>
            <b>Self check-in</b>
            <p>You can check in with the building staff.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Description() {
  return (
    <section className="section divider">
      <div className="translated-badge">
        <span>Some info has been automatically translated. <a href="#">Show original</a></span>
      </div>
      <h2>About this place</h2>
      <p className="desc">
        🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴
      </p>
      <button className="text-btn" type="button">Show more <ArrowRight size={14} /></button>
    </section>
  );
}

function SleepSection() {
  return (
    <section className="section divider">
      <h2>Where you'll sleep</h2>
      <div className="sleep-grid">
        {sleepCards.map(c => (
          <div key={c.title} className="sleep-card">
            <img src={c.image} onError={fallback} alt={c.title} />
            <b>{c.title}</b>
            <span>{c.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Amenities() {
  return (
    <section className="section divider" id="amenities">
      <h2>What this place offers</h2>
      <div className="amenity-grid">
        {amenities.map((a, i) => (
          <div key={a}>
            <span>
              {i === 0 ? <Utensils size={20} /> :
               i === 1 ? <Wifi size={20} /> :
               i === 3 ? <Car size={20} /> :
               i === 4 ? <Waves size={20} /> :
               i === 7 ? <ShieldCheck size={20} /> :
               i === 8 ? <ShieldCheck size={20} /> :
               i === 9 ? <ShieldCheck size={20} /> :
               i === 6 ? <UserRound size={20} /> :
               <KeyRound size={20} />}
            </span>
            {a}
          </div>
        ))}
      </div>
      <button className="outline-btn" type="button">Show all 50 amenities</button>
    </section>
  );
}

function Calendar() {
  const [month, setMonth] = useState(9);
  const [year] = useState(2026);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const first = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const nums = Array.from({ length: first + count }, (_, i) => i < first ? null : i - first + 1);

  return (
    <section className="section divider calendar-section">
      <h2>5 nights in Candolim</h2>
      <p>18 Oct 2026 - 23 Oct 2026</p>
      <div className="calendar">
        <div className="cal-head">
          <button type="button" onClick={() => setMonth(Math.max(0, month - 1))} aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <b>{months[month]} {year}</b>
          <button type="button" onClick={() => setMonth(Math.min(11, month + 1))} aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="week">{days.map(d => <b key={d}>{d}</b>)}</div>
        <div className="dates">
          {nums.map((n, i) => (
            <span className={n === 18 || n === 23 ? 'selected' : ''} key={i}>
              {n || ''}
            </span>
          ))}
        </div>
      </div>
      <button className="text-btn" type="button">Clear dates</button>
    </section>
  );
}

function BookingCard() {
  return (
    <aside className="booking-card">
      <div className="discount">
        <span>◈</span>
        <div>
          <b>Get 10% off your next stay.</b>
          <small>Terms apply</small>
        </div>
        <button type="button">Claim</button>
      </div>
      <div className="price">
        <b>₹28,499</b> <span>for 5 nights</span>
      </div>
      <div className="booking-fields">
        <div>
          <small>CHECK-IN</small>
          <b>10/18/2026</b>
        </div>
        <div>
          <small>CHECKOUT</small>
          <b>10/23/2026</b>
        </div>
        <div>
          <small>GUESTS</small>
          <b>2 guests</b>
        </div>
      </div>
      <p className="cancel">Free cancellation before 17 October</p>
      <button className="reserve" type="button">Reserve</button>
      <div className="not-charged">You won't be charged yet</div>
    </aside>
  );
}

function Reviews() {
  return (
    <section className="section divider reviews" id="reviews">
      <div className="review-heading">
        <h2><Star size={18} fill="currentColor" /> 4.95 · <u>19 reviews</u></h2>
        <span className="badge-pill">Guest favourite</span>
      </div>
      <div className="rating-summary">
        <div className="overall">
          <b>4.95</b>
          <div className="stars">★★★★★</div>
        </div>
        <div className="bars">
          {ratingBreakdown.map(item => (
            <div key={item.name}>
              <span>{item.name}</span>
              <div>
                <i style={{ width: item.pct }} />
              </div>
              <b>{item.rating}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="review-grid">
        {reviews.map(r => (
          <article key={r.name}>
            <div className="reviewer">
              <img src={r.avatar} onError={fallback} alt={r.name} />
              <div>
                <b>{r.name}</b>
                <span>{r.years}</span>
              </div>
            </div>
            <small>{r.date}</small>
            <p>{r.text}</p>
            <button className="text-btn" type="button">Show more</button>
          </article>
        ))}
      </div>
      <button className="outline-btn" type="button">Show all 19 reviews</button>
    </section>
  );
}

function Location() {
  return (
    <section className="section divider" id="location">
      <h2>Where you’ll be</h2>
      <div className="map">
        <div className="map-grid" />
        <div className="map-pin">
          <MapPin size={32} fill="#ff385c" />
        </div>
        <div className="map-label">Candolim, Goa</div>
      </div>
      <h3>Candolim, Goa, India</h3>
      <p>Exact location will be provided after booking.</p>
      <h3>Neighbourhood highlights</h3>
      <p>Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</p>
      <button className="text-btn" type="button">Show more</button>
    </section>
  );
}

function Host() {
  return (
    <section className="section divider host-section">
      <h2>Meet your host</h2>
      <div className="host-card">
        <img src="/assets/images/avatars/host.jpeg" onError={fallback} alt="Mirashya Homes" />
        <div>
          <h3>Mirashya Homes</h3>
          <span>Host</span>
          <div className="host-stats">
            <b>1,463 <small>Reviews</small></b>
            <b>4.68★ <small>Rating</small></b>
            <b>2 <small>Years hosting</small></b>
          </div>
        </div>
      </div>
      <div className="host-details">
        <div>
          <b>Born in the 80s</b>
          <p>Where I went to school: NICMAR GOA</p>
        </div>
        <div>
          <b>Response rate: 100%</b>
          <p>Responds within an hour</p>
        </div>
        <button className="outline-btn" type="button">Message host</button>
      </div>
    </section>
  );
}

function Things() {
  return (
    <section className="section things">
      <h2>Things to know</h2>
      <div className="three-cols">
        <div>
          <h3>Cancellation policy</h3>
          <p>Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.</p>
          <button className="text-btn" type="button">Learn more</button>
        </div>
        <div>
          <h3>House rules</h3>
          <p>Check-in after 2:00 pm · Checkout before 11:00 am · 3 guests maximum</p>
        </div>
        <div>
          <h3>Safety & property</h3>
          <p>Exterior security cameras on property · Carbon monoxide alarm · Smoke alarm</p>
        </div>
      </div>
    </section>
  );
}

function PhotoTour({ close, onOpen }: { close: () => void, onOpen: (i: number) => void }) {
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Living room', 'Bedrooms', 'Full bathroom', 'Kitchen', 'Dining & kitchen', 'Exterior', 'Views'];
  
  const list = cat === 'All'
    ? photos
    : photos.filter(x =>
        x.category.toLowerCase().includes(cat.toLowerCase()) ||
        (cat === 'Bedrooms' && x.category === 'Bedroom') ||
        (cat === 'Full bathroom' && x.category === 'Bathroom') ||
        (cat === 'Kitchen' && x.category === 'Dining & kitchen')
      );

  return (
    <div className="tour" role="dialog" aria-modal="true" aria-label="Photo tour">
      <button className="tour-close" onClick={close} aria-label="Close photo tour" type="button">
        <X size={20} />
      </button>
      <div className="tour-top">
        <div className="tour-tabs">
          {cats.map(c => (
            <button key={c} type="button" className={cat === c ? 'active' : ''} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="tour-content">
        <h2>{cat === 'All' ? 'Photo tour' : cat}</h2>
        <p>{list.length} photos</p>
        <div className="tour-grid">
          {list.map(p => {
            const i = photos.findIndex(x => x.file === p.file);
            return (
              <button key={p.file} type="button" className="tour-card" onClick={() => onOpen(i)}>
                <img src={p.url} onError={fallback} alt={p.alt} />
                <span>{p.alt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Lightbox({ index, setIndex, close }: { index: number, setIndex: (n: number) => void, close: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((index - 1 + photos.length) % photos.length);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((index + 1) % photos.length);
      }
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const nodes = [...root.querySelectorAll<HTMLElement>('button')].filter(x => !x.hasAttribute('disabled'));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = oldOverflow;
    };
  }, [index, close, setIndex]);

  const p = photos[index];

  return (
    <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button ref={closeRef} className="lb-close" onClick={close} aria-label="Close viewer" type="button">
        <X size={20} />
      </button>
      <div className="lb-count">{index + 1} / {photos.length}</div>
      <button className="lb-arrow left" onClick={() => setIndex((index - 1 + photos.length) % photos.length)} aria-label="Previous photo" type="button">
        <ChevronLeft size={22} />
      </button>
      <img src={p.url} onError={fallback} alt={p.alt} />
      <button className="lb-arrow right" onClick={() => setIndex((index + 1) % photos.length)} aria-label="Next photo" type="button">
        <ChevronRight size={22} />
      </button>
      <div className="lb-caption">{p.alt}</div>
    </div>
  );
}

export function App() {
  const [tour, setTour] = useState(false);
  const [light, setLight] = useState<number | null>(null);

  const open = (i: number) => {
    setLight(i);
    setTour(false);
  };

  useEffect(() => {
    if (!tour && light === null) {
      document.body.style.overflow = '';
    }
  }, [tour, light]);

  return (
    <div>
      <Header />
      <StickyNav />
      <main className="page" id="main">
        <div className="breadcrumb">Airbnb homes / India / Goa / Candolim</div>
        <ListingInfo />
        <HeroGallery openTour={() => setTour(true)} />
        <div className="content-grid">
          <div className="left">
            <Highlights />
            <Description />
            <SleepSection />
            <Amenities />
            <Calendar />
          </div>
          <div className="right">
            <BookingCard />
          </div>
        </div>
        <Reviews />
        <Location />
        <Host />
        <Things />
      </main>
      <footer className="footer">
        <div>© 2026 Airbnb Clone · Privacy · Terms · Sitemap</div>
        <div>English (IN) · ₹ INR</div>
      </footer>
      {tour && <PhotoTour close={() => setTour(false)} onOpen={open} />}
      {light !== null && <Lightbox index={light} setIndex={n => setLight(n)} close={() => setLight(null)} />}
    </div>
  );
}
