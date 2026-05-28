// =========================================
// VALIDAR LOGIN
// =========================================

const currentPage =
window.location.pathname.split("/").pop();

// SI NO ESTA LOGUEADO

if(
localStorage.getItem("scada_login") !== "true"
){

// PAGINAS PROTEGIDAS

if(
currentPage !== "index.html" &&
currentPage !== ""
){

window.location.href = "index.html";

}

}

// =========================================
// LAMPARAS
// =========================================

let lamps = {

L1:false,
L2:false,
L3:false,
L4:false

};

// =========================================
// ACTUALIZAR UI
// =========================================

function updateUI(){

for(let id in lamps){

const lamp =
document.getElementById(id);

if(!lamp) continue;

// ENCENDIDA

if(lamps[id]){

lamp.classList.add("on");

// APAGADA

}else{

lamp.classList.remove("on");

}

}

}

// =========================================
// ENCENDER TODO
// =========================================

function allOn(){

lamps.L1 = true;
lamps.L2 = true;
lamps.L3 = true;
lamps.L4 = true;

updateUI();

}

// =========================================
// APAGAR TODO
// =========================================

function allOff(){

lamps.L1 = false;
lamps.L2 = false;
lamps.L3 = false;
lamps.L4 = false;

updateUI();

}

// =========================================
// ZONA OESTE
// =========================================

function zonaOeste(){

allOff();

lamps.L3 = true;
lamps.L4 = true;

updateUI();

}

// =========================================
// ZONA ESTE
// =========================================

function zonaEste(){

allOff();

lamps.L1 = true;
lamps.L2 = true;

updateUI();

}

// =========================================
// PLC
// =========================================

let plcOnline = false;

function togglePLC(){

plcOnline = !plcOnline;

const plcStatus =
document.getElementById("plcStatus");

const plcButton =
document.getElementById("plcButton");

if(plcOnline){

if(plcStatus){

plcStatus.innerHTML =
"🟢 PLC CONECTADO";

}

if(plcButton){

plcButton.innerHTML =
"Desconectar PLC";

}

}else{

if(plcStatus){

plcStatus.innerHTML =
"🔴 PLC DESCONECTADO";

}

if(plcButton){

plcButton.innerHTML =
"Conectar PLC";

}

}

}

// =========================================
// REPORTES
// =========================================

function saveReport(){

const title =
document.getElementById("reportTitle");

const comment =
document.getElementById("reportComment");

// VALIDAR

if(!title || !comment){

return;

}

if(
title.value.trim()==="" ||
comment.value.trim()===""
){

alert("Complete todos los campos");

return;

}

// CREAR REPORTE

const report = {

title:title.value,
comment:comment.value,
date:new Date().toLocaleString()

};

// OBTENER

let reports =
JSON.parse(
localStorage.getItem("scada_reports")
) || [];

// AGREGAR

reports.unshift(report);

// GUARDAR

localStorage.setItem(
"scada_reports",
JSON.stringify(reports)
);

// LIMPIAR

title.value="";
comment.value="";

// RECARGAR

loadReports();

}

// =========================================
// CARGAR REPORTES
// =========================================

function loadReports(){

const container =
document.getElementById("reportsList");

if(!container) return;

let reports =
JSON.parse(
localStorage.getItem("scada_reports")
) || [];

container.innerHTML = "";

// VACIO

if(reports.length === 0){

container.innerHTML =
"<p>No hay reportes guardados.</p>";

return;

}

// MOSTRAR

reports.forEach((report,index)=>{

container.innerHTML += `

<div class="saved-report">

<h3>${report.title}</h3>

<p>${report.comment}</p>

<span>📅 ${report.date}</span>

<br><br>

<button
class="delete-btn"
onclick="deleteReport(${index})">

Eliminar

</button>

</div>

`;

});

}

// =========================================
// ELIMINAR REPORTE
// =========================================

function deleteReport(index){

let reports =
JSON.parse(
localStorage.getItem("scada_reports")
) || [];

reports.splice(index,1);

localStorage.setItem(
"scada_reports",
JSON.stringify(reports)
);

loadReports();

}

// =========================================
// LOGOUT
// =========================================

function logout(){

localStorage.removeItem("scada_login");

window.location.href = "index.html";

}

// =========================================
// INICIAR
// =========================================

window.addEventListener("load",()=>{

updateUI();

loadReports();

});