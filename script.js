/* =========================================================
   HELPER 5.0
   LOCAL MVP ENGINE
   NO EXTERNAL API REQUIRED
   ========================================================= */


/* =========================================================
   DATA
   ========================================================= */

const CATEGORIES = [

    {name:"Plumber",icon:"🔧"},
    {name:"Electrician",icon:"⚡"},
    {name:"Carpenter",icon:"🪚"},
    {name:"AC Technician",icon:"❄️"},
    {name:"Cleaner",icon:"🧹"},
    {name:"Painter",icon:"🎨"},
    {name:"Mechanic",icon:"🚗"},
    {name:"Gardener",icon:"🌱"},
    {name:"Tutor",icon:"📚"},
    {name:"Mason",icon:"🧱"},
    {name:"Appliance Repair",icon:"🔌"},
    {name:"Other",icon:"✦"}

];


const SAMPLE_HELPERS = [

{
id:"h1",
name:"Rajesh Kumar",
category:"Plumber",
phone:"+91 98765 43210",
whatsapp:"+91 98765 43210",
area:"Aliganj",
rating:4.7,
time:"9 AM – 6 PM",
price:"₹300 onwards",
services:"Tap repair, leakage, bathroom fittings",
source:"Family recommendation",
notes:"Reliable for plumbing work.",
available:true,
distance:1.2,
favourite:true,
reviews:38,
experience:"8 years",
trust:94,
created:Date.now()-10000
},

{
id:"h2",
name:"Amit Sharma",
category:"Electrician",
phone:"+91 91234 56789",
whatsapp:"+91 91234 56789",
area:"Mahanagar",
rating:4.8,
time:"8 AM – 8 PM",
price:"₹250 onwards",
services:"Wiring, switches, fans and lights",
source:"Neighbour recommendation",
notes:"Good response time.",
available:true,
distance:2.1,
favourite:false,
reviews:62,
experience:"10 years",
trust:96,
created:Date.now()-20000
},

{
id:"h3",
name:"Mohan Verma",
category:"Carpenter",
phone:"+91 99887 66554",
whatsapp:"",
area:"Sector C",
rating:4.5,
time:"10 AM – 7 PM",
price:"₹400 onwards",
services:"Furniture repair, shelves and doors",
source:"Friend",
notes:"",
available:false,
distance:3.4,
favourite:false,
reviews:24,
experience:"7 years",
trust:88,
created:Date.now()-30000
},

{
id:"h4",
name:"Imran Khan",
category:"AC Technician",
phone:"+91 90123 45678",
whatsapp:"+91 90123 45678",
area:"Aliganj",
rating:4.9,
time:"9 AM – 9 PM",
price:"₹350 onwards",
services:"AC service, cooling issue and installation",
source:"Local recommendation",
notes:"Excellent service.",
available:true,
distance:1.8,
favourite:true,
reviews:87,
experience:"12 years",
trust:98,
created:Date.now()-40000
},

{
id:"h5",
name:"Sanjay Singh",
category:"Mechanic",
phone:"+91 93333 22222",
whatsapp:"+91 93333 22222",
area:"Mahanagar",
rating:4.6,
time:"8 AM – 8 PM",
price:"₹300 onwards",
services:"Bike repair, servicing and diagnostics",
source:"Friend",
notes:"",
available:true,
distance:2.8,
favourite:false,
reviews:43,
experience:"9 years",
trust:91,
created:Date.now()-50000
}

];


const PROFESSIONALS = [

{
id:"p1",
name:"Imran Khan",
category:"AC Technician",
area:"Aliganj",
phone:"+91 90123 45678",
services:"AC repair, installation, servicing",
experience:"12 years",
price:"₹350 onwards",
time:"9 AM – 9 PM",
rating:4.9,
reviews:187,
distance:1.8,
trust:98,
verified:true,
emergency:true
},

{
id:"p2",
name:"Amit Sharma",
category:"Electrician",
area:"Mahanagar",
phone:"+91 91234 56789",
services:"Electrical wiring, fans, lights",
experience:"10 years",
price:"₹250 onwards",
time:"8 AM – 8 PM",
rating:4.8,
reviews:126,
distance:2.1,
trust:96,
verified:true,
emergency:true
},

{
id:"p3",
name:"Rajesh Kumar",
category:"Plumber",
area:"Aliganj",
phone:"+91 98765 43210",
services:"Plumbing, leakage, fittings",
experience:"8 years",
price:"₹300 onwards",
time:"9 AM – 6 PM",
rating:4.7,
reviews:91,
distance:1.2,
trust:94,
verified:true,
emergency:false
},

{
id:"p4",
name:"Neeraj Gupta",
category:"Painter",
area:"Indira Nagar",
phone:"+91 90000 11111",
services:"Interior painting, exterior painting",
experience:"11 years",
price:"₹500 onwards",
time:"8 AM – 7 PM",
rating:4.6,
reviews:74,
distance:4.2,
trust:90,
verified:false,
emergency:false
}

];


let helpers =
JSON.parse(localStorage.getItem("helper_helpers")) ||
SAMPLE_HELPERS;

let reminders =
JSON.parse(localStorage.getItem("helper_reminders")) ||
[];

let userProfessionals =
JSON.parse(localStorage.getItem("helper_professionals")) ||
[];

let currentPage="home";
let helperCategoryFilter="all";
let discoverView="map";
let mapScale=1;
let selectedReviewRating=0;


/* =========================================================
   STORAGE
   ========================================================= */

function saveHelpers(){

    localStorage.setItem(
        "helper_helpers",
        JSON.stringify(helpers)
    );

}

function saveReminders(){

    localStorage.setItem(
        "helper_reminders",
        JSON.stringify(reminders)
    );

}

function saveProfessionals(){

    localStorage.setItem(
        "helper_professionals",
        JSON.stringify(userProfessionals)
    );

}


/* =========================================================
   SECURITY / HTML
   ========================================================= */

function escapeHTML(value){

    if(value===undefined || value===null){
        return "";
    }

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


function getCategory(name){

    return CATEGORIES.find(c=>c.name===name) ||
        {name:"Other",icon:"✦"};

}


function getInitials(name){

    return name
        .split(" ")
        .map(x=>x[0])
        .slice(0,2)
        .join("")
        .toUpperCase();

}


function stars(rating){

    const r=Math.round(Number(rating));

    return "★".repeat(r)+"☆".repeat(5-r);

}


function showToast(message){

    const toast=document.getElementById("toast");

    toast.textContent=message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


/* =========================================================
   NAVIGATION
   ========================================================= */

document.querySelectorAll(".nav-btn")
.forEach(button=>{

    button.addEventListener("click",()=>{

        showPage(button.dataset.page);

    });

});


function showPage(page){

    currentPage=page;

    document.querySelectorAll(".page")
    .forEach(p=>p.classList.remove("active"));

    const target=document.getElementById("page-"+page);

    if(target){
        target.classList.add("active");
    }

    document.querySelectorAll(".nav-btn")
    .forEach(button=>{

        button.classList.toggle(
            "active",
            button.dataset.page===page
        );

    });


    if(page==="home"){
        renderHome();
    }

    if(page==="discover"){
        renderDiscover();
    }

    if(page==="helpers"){
        renderHelpers();
    }

    if(page==="marketplace"){
        renderMarketplace();
    }

    if(page==="bookings"){
        renderReminders();
    }

    if(page==="profile"){
        renderProfile();
    }


    closeSidebar();

}


/* =========================================================
   HOME
   ========================================================= */

function renderHome(){

    document.getElementById("statHelpers")
        .textContent=helpers.length;

    document.getElementById("statFav")
        .textContent=
        helpers.filter(h=>h.favourite).length;

    document.getElementById("statMarketplace")
        .textContent=
        PROFESSIONALS.length+
        userProfessionals.length;


    if(helpers.length){

        const avg=
            helpers.reduce(
                (sum,h)=>sum+Number(h.rating),
                0
            )/helpers.length;

        document.getElementById("statRating")
            .textContent=avg.toFixed(1);

    }else{

        document.getElementById("statRating")
            .textContent="—";

    }


    renderQuickCategories();


    const recent=[...helpers]
        .sort((a,b)=>b.created-a.created)
        .slice(0,6);


    document.getElementById("homeHelpers")
        .innerHTML=
        recent.length
        ?recent.map(helperCard).join("")
        :emptyState(
            "No helpers yet",
            "Add your first trusted helper."
        );

}


function renderQuickCategories(){

    document.getElementById("quickCategories")
        .innerHTML=
        CATEGORIES.slice(0,6)
        .map(c=>`

            <button class="category-card"
                onclick="searchCategory('${escapeHTML(c.name)}')">

                <div class="cat-icon">
                    ${c.icon}
                </div>

                <span>
                    ${escapeHTML(c.name)}
                </span>

            </button>

        `)
        .join("");

}


function searchCategory(category){

    showPage("discover");

    setTimeout(()=>{

        document.getElementById("filterCategory")
            .value=category;

        renderDiscover();

    },50);

}


/* =========================================================
   HELPER CARD
   ========================================================= */

function helperCard(h){

    const category=getCategory(h.category);

    return `

    <article class="helper-card">

        <div class="card-top">

            <div class="helper-avatar">
                ${escapeHTML(getInitials(h.name))}
            </div>

            <div>

                <h3>
                    ${escapeHTML(h.name)}
                </h3>

                <p>
                    ${category.icon}
                    ${escapeHTML(h.category)}
                </p>

            </div>

            <button
                class="fav ${h.favourite?"active":""}"
                onclick="toggleFavourite('${h.id}')">

                ${h.favourite?"★":"☆"}

            </button>

        </div>


        <div class="helper-meta">

            <span class="rating">
                ${stars(h.rating)}
                ${Number(h.rating).toFixed(1)}
            </span>

            <span class="meta-pill">
                ⌖ ${escapeHTML(h.area||"Area")}
            </span>

            <span class="meta-pill">
                ${h.distance} km
            </span>

            ${
                h.available
                ?`
                <span class="meta-pill">
                    ● Available
                </span>
                `
                :""
            }

        </div>


        <div class="card-services">
            ${escapeHTML(
                h.services||"Services not added"
            )}
        </div>


        <div class="card-actions">

            <button onclick="callHelper('${h.id}')">
                ☎ Call
            </button>

            <button class="view"
                    onclick="openDetails('${h.id}')">
                VIEW PROFILE →
            </button>

        </div>

    </article>

    `;

}


function emptyState(title,text){

    return `

        <div class="empty">

            <strong>
                ${escapeHTML(title)}
            </strong>

            ${escapeHTML(text)}

        </div>

    `;

}


/* =========================================================
   SELECTS
   ========================================================= */

function setupSelects(){

    const options=
        CATEGORIES.map(c=>`

            <option value="${escapeHTML(c.name)}">
                ${c.icon} ${escapeHTML(c.name)}
            </option>

        `).join("");


    document.getElementById("helperCategory")
        .innerHTML=
        `<option value="">Select category</option>${options}`;


    document.getElementById("proCategory")
        .innerHTML=
        `<option value="">Select category</option>${options}`;


    document.getElementById("filterCategory")
        .innerHTML=
        `<option value="all">All categories</option>${options}`;


    document.getElementById("emergencyCategories")
        .innerHTML=
        CATEGORIES.slice(0,10)
        .map(c=>`

            <button class="emergency-category"
                onclick="emergencySearch('${escapeHTML(c.name)}')">

                ${c.icon}
                ${escapeHTML(c.name)}

            </button>

        `)
        .join("");

}


/* =========================================================
   ADD HELPER
   ========================================================= */

function openAddHelper(){

    document.getElementById("helperForm").reset();

    document.getElementById("editId").value="";

    document.getElementById("modalTitle")
        .textContent="Add Helper";

    document.getElementById("modalEyebrow")
        .textContent="NEW CONTACT";

    document.getElementById("formAvatar")
        .textContent="+";

    document.getElementById("helperModal")
        .classList.add("open");

}


function openEditHelper(id){

    const h=helpers.find(x=>x.id===id);

    if(!h)return;


    document.getElementById("editId").value=h.id;

    document.getElementById("helperName").value=h.name;

    document.getElementById("helperCategory").value=h.category;

    document.getElementById("helperPhone").value=h.phone||"";

    document.getElementById("helperWhatsapp").value=h.whatsapp||"";

    document.getElementById("helperArea").value=h.area||"";

    document.getElementById("helperRating").value=h.rating;

    document.getElementById("helperTime").value=h.time||"";

    document.getElementById("helperPrice").value=h.price||"";

    document.getElementById("helperServices").value=h.services||"";

    document.getElementById("helperSource").value=h.source||"";

    document.getElementById("helperNotes").value=h.notes||"";

    document.getElementById("helperAvailable").checked=
        !!h.available;


    document.getElementById("modalTitle")
        .textContent="Edit Helper";

    document.getElementById("modalEyebrow")
        .textContent="UPDATE PROFILE";

    document.getElementById("formAvatar")
        .textContent=getInitials(h.name);


    document.getElementById("helperModal")
        .classList.add("open");

}


function saveHelper(event){

    event.preventDefault();


    const id=
        document.getElementById("editId").value;


    const data={

        id:id||"helper_"+Date.now(),

        name:
        document.getElementById("helperName")
        .value.trim(),

        category:
        document.getElementById("helperCategory")
        .value,

        phone:
        document.getElementById("helperPhone")
        .value.trim(),

        whatsapp:
        document.getElementById("helperWhatsapp")
        .value.trim(),

        area:
        document.getElementById("helperArea")
        .value.trim(),

        rating:
        Number(
            document.getElementById("helperRating")
            .value
        ),

        time:
        document.getElementById("helperTime")
        .value.trim(),

        price:
        document.getElementById("helperPrice")
        .value.trim(),

        services:
        document.getElementById("helperServices")
        .value.trim(),

        source:
        document.getElementById("helperSource")
        .value.trim(),

        notes:
        document.getElementById("helperNotes")
        .value.trim(),

        available:
        document.getElementById("helperAvailable")
        .checked,

        distance:
        Math.round(
            (.5+Math.random()*6)*10
        )/10,

        favourite:false,

        reviews:0,

        trust:70,

        experience:"Not specified",

        created:Date.now()

    };


    if(id){

        const index=
            helpers.findIndex(h=>h.id===id);

        if(index!==-1){

            data.favourite=
                helpers[index].favourite;

            data.created=
                helpers[index].created;

            data.distance=
                helpers[index].distance;

            data.reviews=
                helpers[index].reviews||0;

            data.trust=
                helpers[index].trust||70;

            data.experience=
                helpers[index].experience||"Not specified";

            helpers[index]=data;

        }

        showToast("Helper updated.");

    }else{

        helpers.unshift(data);

        showToast("Helper saved.");

    }


    saveHelpers();

    closeModal("helperModal");

    renderHome();
    renderHelpers();
    renderDiscover();
    updateReminderHelperOptions();

}


/* =========================================================
   DETAILS
   ========================================================= */

function openDetails(id){

    const h=helpers.find(x=>x.id===id);

    if(!h)return;


    const category=getCategory(h.category);


    document.getElementById("detailName")
        .textContent=h.name;


    document.getElementById("detailContent")
        .innerHTML=`

        <div class="detail-hero">

            <div class="detail-avatar">
                ${escapeHTML(getInitials(h.name))}
            </div>

            <div>

                <h3>
                    ${escapeHTML(h.name)}
                </h3>

                <p>
                    ${category.icon}
                    ${escapeHTML(h.category)}
                </p>

                <div class="rating detail-rating">
                    ${stars(h.rating)}
                    ${Number(h.rating).toFixed(1)}
                </div>

            </div>

        </div>


        <div class="detail-grid">

            <div class="detail-item">
                <span>PHONE</span>
                <strong>
                    ${escapeHTML(h.phone||"Not added")}
                </strong>
            </div>

            <div class="detail-item">
                <span>WHATSAPP</span>
                <strong>
                    ${escapeHTML(h.whatsapp||"Not added")}
                </strong>
            </div>

            <div class="detail-item">
                <span>AREA</span>
                <strong>
                    ⌖ ${escapeHTML(h.area||"Not added")}
                </strong>
            </div>

            <div class="detail-item">
                <span>DISTANCE</span>
                <strong>
                    ${h.distance} km
                </strong>
            </div>

            <div class="detail-item">
                <span>WORKING TIME</span>
                <strong>
                    ${escapeHTML(h.time||"Not added")}
                </strong>
            </div>

            <div class="detail-item">
                <span>APPROX. CHARGES</span>
                <strong>
                    ${escapeHTML(h.price||"Not added")}
                </strong>
            </div>

            <div class="detail-item">
                <span>EXPERIENCE</span>
                <strong>
                    ${escapeHTML(h.experience||"Not specified")}
                </strong>
            </div>

            <div class="detail-item">
                <span>TRUST SCORE</span>
                <strong>
                    ${h.trust||70}/100
                </strong>
            </div>

        </div>


        <div class="detail-notes">

            <strong>Services</strong><br>

            ${escapeHTML(
                h.services||"No services added."
            )}

            <br><br>

            <strong>Private notes</strong><br>

            ${escapeHTML(
                h.notes||"No private notes."
            )}

        </div>


        <div class="detail-actions">

            <button class="call"
                    onclick="callHelper('${h.id}')">
                ☎ Call
            </button>

            <button onclick="messageHelper('${h.id}')">
                ◉ WhatsApp
            </button>

            <button onclick="openEditHelper('${h.id}')">
                ✎ Edit
            </button>

            <button onclick="openReview('${h.id}')">
                ★ Rate
            </button>

            <button onclick="shareHelper('${h.id}')">
                ↗ Share
            </button>

            <button onclick="toggleFavourite('${h.id}')">
                ${h.favourite?"★ Favourite":"☆ Favourite"}
            </button>

            <button onclick="deleteHelper('${h.id}')">
                Delete
            </button>

        </div>

        `;


    document.getElementById("detailsModal")
        .classList.add("open");

}


/* =========================================================
   FAVOURITES
   ========================================================= */

function toggleFavourite(id){

    const h=helpers.find(x=>x.id===id);

    if(!h)return;

    h.favourite=!h.favourite;

    saveHelpers();

    showToast(
        h.favourite
        ?"Added to favourites."
        :"Removed from favourites."
    );

    renderHome();
    renderHelpers();
    renderDiscover();

}


/* =========================================================
   CONTACT
   ========================================================= */

function callHelper(id){

    const h=helpers.find(x=>x.id===id);

    if(!h)return;

    if(!h.phone){

        showToast("No phone number saved.");

        return;

    }

    window.location.href=
        "tel:"+h.phone.replace(/\s/g,"");

}


function messageHelper(id){

    const h=helpers.find(x=>x.id===id);

    if(!h)return;

    const number=
        (h.whatsapp||h.phone||"")
        .replace(/[^\d]/g,"");

    if(!number){

        showToast("No WhatsApp number.");

        return;

    }

    window.open(
        "https://wa.me/"+number,
        "_blank"
    );

}


function shareHelper(id){

    const h=helpers.find(x=>x.id===id);

    if(!h)return;

    const text=
        `${h.name} — ${h.category}\n`+
        `⭐ ${h.rating}\n`+
        `📍 ${h.area||"Area not added"}\n`+
        `☎ ${h.phone||"No number"}`;


    if(navigator.share){

        navigator.share({

            title:h.name,
            text:text

        }).catch(()=>{});

    }else{

        if(navigator.clipboard){

            navigator.clipboard
                .writeText(text);

        }

        showToast("Helper information copied.");

    }

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteHelper(id){

    const h=helpers.find(x=>x.id===id);

    if(!h)return;

    if(!confirm(
        `Delete ${h.name} from your helpers?`
    ))return;


    helpers=
        helpers.filter(x=>x.id!==id);

    saveHelpers();

    closeModal("detailsModal");

    renderHome();
    renderHelpers();
    renderDiscover();

    showToast("Helper deleted.");

}


/* =========================================================
   MY HELPERS
   ========================================================= */

function renderHelpers(){

    const search=
        document.getElementById("helperSearch")
        ?.value
        .toLowerCase()
        .trim()||"";


    const sort=
        document.getElementById("helperSort")
        ?.value||"recent";


    let list=helpers.filter(h=>{

        const text=
            `${h.name} ${h.category} ${h.area} ${h.services}`
            .toLowerCase();

        return(
            text.includes(search)&&
            (
                helperCategoryFilter==="all"||
                h.category===helperCategoryFilter
            )
        );

    });


    if(sort==="rating"){
        list.sort((a,b)=>b.rating-a.rating);
    }

    if(sort==="name"){
        list.sort((a,b)=>
            a.name.localeCompare(b.name)
        );
    }

    if(sort==="category"){
        list.sort((a,b)=>
            a.category.localeCompare(b.category)
        );
    }

    if(sort==="recent"){
        list.sort((a,b)=>b.created-a.created);
    }


    renderHelperTabs();


    document.getElementById("helpersGrid")
        .innerHTML=
        list.length
        ?list.map(helperCard).join("")
        :emptyState(
            "No helpers found",
            "Try another search."
        );

}


function renderHelperTabs(){

    const categories=
        ["all",...new Set(
            helpers.map(h=>h.category)
        )];


    document.getElementById("helperCategoryTabs")
        .innerHTML=
        categories.map(cat=>`

            <button
                class="category-tab
                ${helperCategoryFilter===cat?"active":""}"
                onclick="setHelperCategory('${escapeHTML(cat)}')">

                ${escapeHTML(
                    cat==="all"?"All":cat
                )}

            </button>

        `).join("");

}


function setHelperCategory(category){

    helperCategoryFilter=category;

    renderHelpers();

}


/* =========================================================
   DISCOVER
   ========================================================= */

function renderDiscover(){

    const category=
        document.getElementById("filterCategory")
        .value;


    const minRating=
        Number(
            document.getElementById("filterRating")
            .value
        );


    const maxDistance=
        Number(
            document.getElementById("filterDistance")
            .value
        );


    const availability=
        document.getElementById("filterAvailability")
        .value;


    const search=
        document.getElementById("discoverSearch")
        .value
        .toLowerCase()
        .trim();


    let list=helpers.filter(h=>{

        const text=
            `${h.name} ${h.category} ${h.area} ${h.services}`
            .toLowerCase();


        return(

            (
                category==="all"||
                h.category===category
            )

            &&

            Number(h.rating)>=minRating

            &&

            Number(h.distance||99)<=maxDistance

            &&

            (
                availability==="all"||
                (
                    availability==="now"&&
                    h.available
                )||
                availability==="today"
            )

            &&

            text.includes(search)

        );

    });


    list.sort(
        (a,b)=>
        Number(a.distance)-Number(b.distance)
    );


    document.getElementById("resultCount")
        .textContent=
        `${list.length} helper${list.length===1?"":"s"}`;


    renderMapPins(list);


    document.getElementById("discoverList")
        .innerHTML=
        list.length
        ?list.map(helperCard).join("")
        :emptyState(
            "No nearby helpers",
            "Try widening your filters."
        );


    if(discoverView==="map"){

        document.getElementById("mapView")
            .classList.remove("hidden");

        document.getElementById("discoverList")
            .classList.add("hidden");

    }else{

        document.getElementById("mapView")
            .classList.add("hidden");

        document.getElementById("discoverList")
            .classList.remove("hidden");

    }

}


/* =========================================================
   MAP
   ========================================================= */

function renderMapPins(list){

    const container=
        document.getElementById("mapPins");


    container.innerHTML="";


    const positions=[

        [21,30],
        [61,24],
        [37,64],
        [78,56],
        [19,70],
        [57,76],
        [82,34],
        [46,18]

    ];


    list.slice(0,8).forEach((h,index)=>{

        const pin=
            document.createElement("button");


        pin.className="map-pin";


        const pos=
            positions[index%positions.length];


        pin.style.left=pos[0]+"%";
        pin.style.top=pos[1]+"%";


        pin.innerHTML=
            `<span>${getCategory(h.category).icon}</span>`;


        pin.title=
            `${h.name} • ${h.category} • ${h.distance} km`;


        pin.onclick=()=>{
            openDetails(h.id);
        };


        container.appendChild(pin);

    });

}


function setDiscoverView(view){

    discoverView=view;

    document.getElementById("mapBtn")
        .classList.toggle("active",view==="map");

    document.getElementById("listBtn")
        .classList.toggle("active",view==="list");

    renderDiscover();

}


function mapZoom(direction){

    mapScale+=direction*.08;

    mapScale=
        Math.max(
            .85,
            Math.min(1.35,mapScale)
        );


    document.getElementById("mapBackground")
        .style.transform=
        `scale(${mapScale})`;

}


function resetMap(){

    mapScale=1;

    document.getElementById("mapBackground")
        .style.transform="scale(1)";

}


/* =========================================================
   MARKETPLACE
   ========================================================= */

function getAllProfessionals(){

    return[
        ...PROFESSIONALS,
        ...userProfessionals
    ];

}


function renderMarketplace(){

    const search=
        document.getElementById("marketSearch")
        .value
        .toLowerCase()
        .trim();


    const sort=
        document.getElementById("marketSort")
        .value;


    let list=
        getAllProfessionals()
        .filter(p=>{

            const text=
                `${p.name} ${p.category} ${p.area} ${p.services}`
                .toLowerCase();

            return text.includes(search);

        });


    if(sort==="rating"){
        list.sort((a,b)=>b.rating-a.rating);
    }

    if(sort==="distance"){
        list.sort((a,b)=>a.distance-b.distance);
    }

    if(sort==="reviews"){
        list.sort((a,b)=>b.reviews-a.reviews);
    }


    document.getElementById("marketplaceGrid")
        .innerHTML=
        list.length
        ?list.map(professionalCard).join("")
        :emptyState(
            "No professional helpers found",
            "Try another search."
        );

}


function professionalCard(p){

    const category=
        getCategory(p.category);


    return`

    <article class="professional-card">

        <div class="pro-header">

            <div class="helper-avatar">
                ${escapeHTML(getInitials(p.name))}
            </div>

            <div>

                <h3>
                    ${escapeHTML(p.name)}
                </h3>

                <p>
                    ${category.icon}
                    ${escapeHTML(p.category)}
                </p>

            </div>

        </div>


        <div class="helper-meta">

            ${
                p.verified
                ?`
                <span class="pro-badge">
                    ✓ VERIFIED
                </span>
                `
                :""
            }

            ${
                p.emergency
                ?`
                <span class="meta-pill">
                    ⚡ Emergency
                </span>
                `
                :""
            }

            <span class="meta-pill">
                ⌖ ${escapeHTML(p.area)}
            </span>

        </div>


        <div class="pro-trust">

            <div>
                <strong>${p.rating}</strong>
                <span> ★ rating</span>
            </div>

            <div>
                <strong>${p.trust}</strong>
                <span>/100 trust</span>
            </div>

        </div>


        <div class="pro-details">

            <div class="pro-detail">
                <small>REVIEWS</small>
                <strong>${p.reviews}</strong>
            </div>

            <div class="pro-detail">
                <small>DISTANCE</small>
                <strong>${p.distance} km</strong>
            </div>

            <div class="pro-detail">
                <small>EXPERIENCE</small>
                <strong>${escapeHTML(p.experience)}</strong>
            </div>

            <div class="pro-detail">
                <small>STARTING</small>
                <strong>${escapeHTML(p.price)}</strong>
            </div>

        </div>


        <div class="card-services">
            ${escapeHTML(p.services)}
        </div>


        <div class="card-actions">

            <button onclick="callProfessional('${p.id}')">
                ☎ CALL
            </button>

            <button class="view"
                    onclick="viewProfessional('${p.id}')">
                VIEW PROFILE
            </button>

        </div>

    </article>

    `;

}


function openProfessionalForm(){

    document.getElementById("professionalModal")
        .classList.add("open");

}


function createProfessional(event){

    event.preventDefault();


    const professional={

        id:"pro_"+Date.now(),

        name:
        document.getElementById("proName").value.trim(),

        category:
        document.getElementById("proCategory").value,

        phone:
        document.getElementById("proPhone").value.trim(),

        area:
        document.getElementById("proArea").value.trim(),

        services:
        document.getElementById("proServices").value.trim(),

        experience:
        document.getElementById("proExperience").value.trim(),

        price:
        document.getElementById("proPrice").value.trim(),

        time:
        document.getElementById("proTime").value.trim(),

        emergency:
        document.getElementById("proEmergency").value==="yes",

        rating:5,

        reviews:0,

        distance:1.5,

        trust:80,

        verified:false

    };


    userProfessionals.push(professional);

    saveProfessionals();

    closeModal("professionalModal");

    document.querySelector("#professionalModal form")
        .reset();

    renderMarketplace();
    renderHome();

    showToast(
        "Professional profile created."
    );

}


function findProfessional(id){

    return getAllProfessionals()
        .find(p=>p.id===id);

}


function callProfessional(id){

    const p=findProfessional(id);

    if(!p)return;

    if(!p.phone){

        showToast("No phone number.");

        return;

    }

    window.location.href=
        "tel:"+p.phone.replace(/\s/g,"");

}


function viewProfessional(id){

    const p=findProfessional(id);

    if(!p)return;


    alert(

        `${p.name}\n\n`+
        `${p.category}\n`+
        `⭐ ${p.rating}\n`+
        `Trust: ${p.trust}/100\n`+
        `📍 ${p.area}\n`+
        `Distance: ${p.distance} km\n\n`+
        `${p.services}\n\n`+
        `Experience: ${p.experience}\n`+
        `Starting: ${p.price}\n`+
        `Hours: ${p.time}`

    );

}


/* =========================================================
   REVIEWS
   ========================================================= */

function openReview(id){

    document.getElementById("reviewHelperId")
        .value=id;

    selectedReviewRating=0;

    document.getElementById("reviewText")
        .value="";

    document.querySelectorAll(".rating-picker button")
        .forEach(b=>b.classList.remove("selected"));

    document.getElementById("reviewModal")
        .classList.add("open");

}


function selectRating(number){

    selectedReviewRating=number;

    document.querySelectorAll(".rating-picker button")
        .forEach((button,index)=>{

            button.classList.toggle(
                "selected",
                index<number
            );

        });

}


function submitReview(){

    const id=
        document.getElementById("reviewHelperId")
        .value;


    const h=helpers.find(x=>x.id===id);


    if(!h)return;


    if(!selectedReviewRating){

        showToast("Choose a rating first.");

        return;

    }


    const text=
        document.getElementById("reviewText")
        .value.trim();


    const oldReviews=
        Number(h.reviews||0);


    const oldRating=
        Number(h.rating);


    h.rating=
        (
            (
                oldRating*oldReviews+
                selectedReviewRating
            )/
            (oldReviews+1)
        ).toFixed(1);


    h.reviews=oldReviews+1;


    if(selectedReviewRating>=4){

        h.trust=
            Math.min(
                100,
                Number(h.trust||70)+1
            );

    }


    saveHelpers();

    closeModal("reviewModal");

    renderHome();
    renderHelpers();
    renderDiscover();

    showToast(
        text
        ?"Review saved."
        :"Rating saved."
    );

}


/* =========================================================
   EMERGENCY
   ========================================================= */

function openEmergency(){

    document.getElementById("emergencyModal")
        .classList.add("open");

}


function emergencySearch(category){

    closeModal("emergencyModal");

    showPage("discover");


    setTimeout(()=>{

        document.getElementById("filterCategory")
            .value=category;

        document.getElementById("filterAvailability")
            .value="now";

        renderDiscover();

        showToast(
            `Searching available ${category.toLowerCase()} helpers.`
        );

    },50);

}


/* =========================================================
   BOOKINGS
   ========================================================= */

function updateReminderHelperOptions(){

    const select=
        document.getElementById("reminderHelper");


    select.innerHTML=
        `<option value="">Select helper</option>`+
        helpers.map(h=>`

            <option value="${h.id}">
                ${escapeHTML(h.name)}
                —
                ${escapeHTML(h.category)}
            </option>

        `).join("");

}


function addReminder(){

    const title=
        document.getElementById("reminderTitle")
        .value.trim();


    const date=
        document.getElementById("reminderDate")
        .value;


    const time=
        document.getElementById("reminderTime")
        .value;


    const helper=
        document.getElementById("reminderHelper")
        .value;


    if(!title||!date){

        showToast(
            "Add a title and date."
        );

        return;

    }


    reminders.push({

        id:"rem_"+Date.now(),

        title:title,

        date:date,

        time:time,

        helper:helper,

        created:Date.now()

    });


    saveReminders();


    document.getElementById("reminderTitle")
        .value="";

    document.getElementById("reminderDate")
        .value="";

    document.getElementById("reminderTime")
        .value="";

    document.getElementById("reminderHelper")
        .value="";


    renderReminders();

    showToast("Reminder added.");

}


function renderReminders(){

    updateReminderHelperOptions();


    const container=
        document.getElementById("remindersList");


    const sorted=
        [...reminders]
        .sort(
            (a,b)=>
            new Date(a.date)-
            new Date(b.date)
        );


    if(!sorted.length){

        container.innerHTML=
            emptyState(
                "No reminders",
                "Your appointments will appear here."
            );

        return;

    }


    container.innerHTML=
        sorted.map(r=>{

            const d=
                new Date(r.date+"T00:00");


            const helper=
                helpers.find(
                    h=>h.id===r.helper
                );


            return`

                <div class="reminder">

                    <div class="reminder-date">

                        <strong>
                            ${d.getDate()}
                        </strong>

                        <small>
                            ${d.toLocaleString(
                                "en",
                                {month:"short"}
                            ).toUpperCase()}
                        </small>

                    </div>

                    <div class="reminder-info">

                        <strong>
                            ${escapeHTML(r.title)}
                        </strong>

                        <small>

                            ${
                                r.time
                                ?escapeHTML(r.time)+" • "
                                :""
                            }

                            ${
                                helper
                                ?escapeHTML(helper.name)
                                :"No helper selected"
                            }

                        </small>

                    </div>

                    <button
                        class="delete-reminder"
                        onclick="deleteReminder('${r.id}')">
                        ×
                    </button>

                </div>

            `;

        }).join("");

}


function deleteReminder(id){

    reminders=
        reminders.filter(
            r=>r.id!==id
        );

    saveReminders();

    renderReminders();

    showToast("Reminder deleted.");

}


/* =========================================================
   PROFILE / SETTINGS
   ========================================================= */

function renderProfile(){

    const name=
        localStorage.getItem(
            "helper_profile_name"
        );


    if(name){

        document.getElementById("profileName")
            .textContent=name;

    }


    const locked=
        localStorage.getItem(
            "helper_app_lock"
        )==="1";


    document.getElementById("appLockToggle")
        .checked=locked;

}


function editProfile(){

    const current=
        localStorage.getItem(
            "helper_profile_name"
        )||
        "My Helper Network";


    const name=
        prompt(
            "Enter your profile name:",
            current
        );


    if(name&&name.trim()){

        localStorage.setItem(
            "helper_profile_name",
            name.trim()
        );

        renderProfile();

        showToast("Profile updated.");

    }

}


function changeArea(){

    const current=
        localStorage.getItem(
            "helper_area"
        )||
        "Aliganj, Lucknow";


    const area=
        prompt(
            "Enter your discovery area:",
            current
        );


    if(area&&area.trim()){

        localStorage.setItem(
            "helper_area",
            area.trim()
        );

        document.getElementById("areaName")
            .textContent=area.trim();

        showToast("Discovery area updated.");

    }

}


function loadArea(){

    const area=
        localStorage.getItem(
            "helper_area"
        );


    if(area){

        document.getElementById("areaName")
            .textContent=area;

    }

}


/* =========================================================
   THEME
   ========================================================= */

function toggleTheme(){

    document.body.classList.toggle("light");


    const light=
        document.body.classList
        .contains("light");


    localStorage.setItem(
        "helper_light_mode",
        light?"1":"0"
    );


    showToast(
        light
        ?"Light mode enabled."
        :"Dark mode enabled."
    );

}


/* =========================================================
   APP LOCK
   ========================================================= */

function toggleAppLock(){

    const enabled=
        document.getElementById("appLockToggle")
        .checked;


    if(enabled){

        let existing=
            localStorage.getItem(
                "helper_pin"
            );


        if(existing){

            localStorage.setItem(
                "helper_app_lock",
                "1"
            );

            showToast("App Lock enabled.");

            return;

        }


        const pin=
            prompt(
                "Create a 4-digit PIN:"
            );


        if(!pin||!/^\d{4}$/.test(pin)){

            document.getElementById(
                "appLockToggle"
            ).checked=false;

            showToast(
                "PIN must contain exactly 4 numbers."
            );

            return;

        }


        const confirmPin=
            prompt(
                "Enter the PIN again:"
            );


        if(pin!==confirmPin){

            document.getElementById(
                "appLockToggle"
            ).checked=false;

            showToast("PINs do not match.");

            return;

        }


        localStorage.setItem(
            "helper_pin",
            pin
        );


        localStorage.setItem(
            "helper_app_lock",
            "1"
        );


        showToast(
            "App Lock enabled."
        );

    }else{

        localStorage.removeItem(
            "helper_app_lock"
        );

        showToast(
            "App Lock disabled."
        );

    }

}


function checkAppLock(){

    const enabled=
        localStorage.getItem(
            "helper_app_lock"
        )==="1";


    const pin=
        localStorage.getItem(
            "helper_pin"
        );


    if(enabled&&pin){

        document.getElementById("lockScreen")
            .classList.remove("hidden");

    }

}


function unlockApp(){

    const entered=
        document.getElementById("unlockPin")
        .value;


    const correct=
        localStorage.getItem(
            "helper_pin"
        );


    if(entered===correct){

        document.getElementById("lockScreen")
            .classList.add("hidden");

        document.getElementById("unlockPin")
            .value="";

        document.getElementById("lockError")
            .textContent="";

    }else{

        document.getElementById("lockError")
            .textContent="Incorrect PIN.";

        document.getElementById("unlockPin")
            .value="";

    }

}


document.getElementById("unlockPin")
?.addEventListener(
    "input",
    function(){

        const dots=
            document.querySelectorAll(
                "#pinDots span"
            );


        dots.forEach(
            (dot,index)=>{

                dot.classList.toggle(
                    "active",
                    index<this.value.length
                );

            }
        );


        if(this.value.length===4){

            unlockApp();

        }

    }
);


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function openNotifications(){

    document.getElementById(
        "notificationModal"
    ).classList.add("open");

}


/* =========================================================
   MODALS
   ========================================================= */

function closeModal(id){

    document.getElementById(id)
        ?.classList.remove("open");

}


document.querySelectorAll(".modal-overlay")
.forEach(overlay=>{

    overlay.addEventListener(
        "click",
        event=>{

            if(event.target===overlay){

                overlay.classList.remove("open");

            }

        }
    );

});


/* =========================================================
   MOBILE
   ========================================================= */

function toggleSidebar(){

    document.querySelector(".sidebar")
        .classList.toggle("open");

}


function closeSidebar(){

    document.querySelector(".sidebar")
        .classList.remove("open");

}


/* =========================================================
   DELETE ALL
   ========================================================= */

function clearAllData(){

    if(!confirm(
        "Delete all local HELPER data?"
    ))return;


    localStorage.removeItem(
        "helper_helpers"
    );

    localStorage.removeItem(
        "helper_reminders"
    );

    localStorage.removeItem(
        "helper_professionals"
    );

    helpers=[];

    reminders=[];

    userProfessionals=[];


    renderHome();
    renderHelpers();
    renderDiscover();
    renderMarketplace();
    renderReminders();


    showToast(
        "All local data deleted."
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initialize(){

    setupSelects();

    loadArea();

    renderHome();

    renderHelpers();

    renderDiscover();

    renderMarketplace();

    renderReminders();

    renderProfile();


    document.getElementById("reminderDate")
        .min=
        new Date()
        .toISOString()
        .split("T")[0];


    if(
        localStorage.getItem(
            "helper_light_mode"
        )==="1"
    ){

        document.body.classList.add("light");

    }


    checkAppLock();

}


initialize();
// =============================
// HELPER REAL OPENSTREETMAP
// =============================

let helperRealMap;

function initRealMap() {
    const mapElement = document.getElementById("mapView");

    if (!mapElement || typeof L === "undefined") return;

    // Don't create the map twice
    if (helperRealMap) {
        helperRealMap.invalidateSize();
        return;
    }

    helperRealMap = L.map("mapView").setView([26.8467, 80.9462], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(helperRealMap);
}
initRealMap();
