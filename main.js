// Travail avec Loris => (longueur à det. = nb cartes -1)*40
//	console.log("dans la TL",tabCartesDanslaTimeline)

// let hauteur = window.innerHeight/1.2 ou 600 ?
let hauteur = 600
let largeur = hauteur*2.55
// élargir avec easter egg des formats => 1.37 puis 
// en 1.66, 1,85 , et enfin 2,35 voir 2,55
let score = 0
let highscore = 0
let hauteurTimeline = 220
let largeurTimeline = largeur-30
let curDraggin = null
let positionDeckX = largeur*0.75
let compteurDeCartesDansLaTimeline = 0
let tabAleatoire = []
let tabAleatoire2 = []
let tabAleatoire3 = []
let tabCartesDanslaTimeline = []
let valeurGameOver = false
// Création d'une variable conservant le nombre de carte piochée, autrement
//dit, la position actuelle dans "tabAleatoire".
let compteurDeCartesPiochees = 0

d3.csv('filmsMysteresUnil.csv',function(d){
    return {
               nom : d.nomDuFilm,
               annee : +d.annee,
              // realisateur : d.realisateur,
			   imdb: d.imdb
               
            }
}).then(donnees =>{

kaboom({
    background: [114, 75, 21],
    width: largeur,
    height: hauteur,
    canvas: document.querySelector("#monCanvas"),
})
function chargerLesSprites(){
	//font
	loadFont("VCR","sprites/autres/VCR_OSD_MONO_1.001.ttf")
	//sons
	loadSound("sonGameOver","sounds/sonGameOver.wav")
	loadSound("sonVictoire","sounds/sonVictoire.mp3")
	// autres
	loadSprite("card back", "/sprites/autres/card-back.png")
	loadSprite("reset", "sprites/autres/arrow_reset.png")
	// affiches
	loadSprite("bones","sprites/affiches/bones.jpeg")
	loadSprite("docteur Dolittle","sprites/affiches/docteurDolittle.jpeg")
	loadSprite("docteur Patch","sprites/affiches/docteurPatch.jpeg")
	loadSprite("dr House","sprites/affiches/drHouse.jpeg")
	loadSprite("Grey s Anatomy","sprites/affiches/greyAnatomy.jpeg")
	loadSprite("il etait une fois la vie","sprites/affiches/ilEtaitUneFoisLaVie.jpeg")
	loadSprite("medecin de campagne","sprites/affiches/medecinDeCampagne.jpeg")
	loadSprite("urgences","sprites/affiches/rgences.jpeg")
	loadSprite("scrubs","sprites/affiches/scrubs.jpg")
	loadSprite("nip tuck","sprites/affiches/nip_tuck (1).jpg")
	loadSprite("private practice","sprites/affiches/private_practice.jpg")
	loadSprite("nurse jackie","sprites/affiches/nurse_jackie.jpg")
	loadSprite("chicago med","sprites/affiches/chicago_med.jpg")
	loadSprite("a young doctor","sprites/affiches/a_young_doctor_s_notebook.jpg")
	loadSprite("hippocrate","sprites/affiches/hippocrate.jpg")
	loadSprite("volNidDeCoucou","sprites/affiches/vol_au_dessus_d_un_nid_de_coucou (1).jpg")
	loadSprite("une vie démente","sprites/affiches/neVieDemente.jpg")
	loadSprite("shutter island","sprites/affiches/shutterIsland.jpg")
	loadSprite("horsNorme","sprites/affiches/horsNorme.jpg")
	loadSprite("leScaphandreEtLePapillon","sprites/affiches/18765089 (1).jpg")
	loadSprite("huitiemeJour","sprites/affiches/huitiemeJour.jpg")
	loadSprite("spellbound","sprites/affiches/Spellbound_original (1).jpg")
	loadSprite("l amour d'une femme","sprites/affiches/lAmourDUneFemme.jpg")
	loadSprite("la tribu","sprites/affiches/la tribu.jpg")
	loadSprite("what the health","sprites/affiches/what the health.jpg")
	loadSprite("intouchables","sprites/affiches/intouchables.jpg")
	loadSprite("nurse","sprites/affiches/nurse.jpg")
	loadSprite("the crimoson field","sprites/affiches/crimsonField (1).jpg")

}
chargerLesSprites()

function drag() {
	// The displacement between object pos and mouse pos
	let offset = vec2(0)
	return {
		// Name of the component
		id: "drag",
		// This component requires the "pos" and "area" component to work
		require: [ "pos", "area", ],
		// "add" is a lifecycle method gets called when the obj is added to scene
		add() {
			// TODO: these need to be checked in reverse order
			// "this" in all methods refer to the obj
			this.onClick(() => {
				if (curDraggin) {
					return}
				curDraggin = this
				offset = mousePos().sub(this.pos)
				
				
		})
		},
		// "update" is a lifecycle method gets called every frame the obj is in scene
		update() {
			if (curDraggin === this && curDraggin.class !== "set" && valeurGameOver == false) {
				setCursor("grabbing")
				this.pos = mousePos().sub(offset)
			}
		},
	}

}


// drop
onMouseRelease(() => {
	// si quelque chose est en train d'être déplacé, la classe set est données aux cartes posées dans la timeline
	if(curDraggin && curDraggin.class !== "set"){
// et si la pos en Y est dans la timeline
		if(curDraggin.pos.y > 350){

console.log("curDraggin", curDraggin)

			if(compteurDeCartesDansLaTimeline == 0){
				curDraggin.pos.y = 468;
				curDraggin.pos.x = largeur/2;
				tabCartesDanslaTimeline.push(curDraggin)
			}
			else{
			if(compteurDeCartesDansLaTimeline == 1){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) +(i*150);
					}

				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}

				}
				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 2){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 3){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 4){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 5){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 6){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 7){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.annee<=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 8){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.annee<=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[6].annee && curDraggin.annee<=tabCartesDanslaTimeline[7].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[6].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[7].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[7].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[7].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 9){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.annee<=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[6].annee && curDraggin.annee<=tabCartesDanslaTimeline[7].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[6].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[7].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[7].annee && curDraggin.annee<=tabCartesDanslaTimeline[8].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[7].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[8].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[8].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[8].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
					timelinePleine()
				}

				else{gameOver()}
			}
	}
		console.log("tab trié : ",tabCartesDanslaTimeline)
		tirerUneCarte();
		score++;
		compteurDeCartesDansLaTimeline++
		curDraggin.class = "set"
		tutoriel()


}
		else{curDraggin.pos.y = 200; curDraggin.pos.x = positionDeckX}			

	}
		setCursor("pointer")
		curDraggin = null

})


function gameOver () {
	play("sonGameOver",{ volume : 0.1})
	if (score>highscore){
		highscore = score
		setData("highscore", highscore)
	}
	score--;
	shake(60)
	tabCartesDanslaTimeline.push(curDraggin)
	tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
	curDraggin.pos.y = 468;
	for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
		tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
	}
	afficherDates()
	valeurGameOver = true
	const cercleReset = add([
		pos(largeur-70,hauteur/9),
		circle(50),
		z(5),
		color(255,255,255),
		anchor("center"),
		"cercleReset",
]);
const texteGameOver = add([
	text("Appuyez sur reset pour recommencer", {
		font: "VCR",
		size: 28,
	}),
	pos(largeur/2, 225),
	anchor("center"),
	z(50),
	color(255, 255, 255),
	"texteGameOver"
]);
}

// Création d'un tableau de longueur "donnee.length" qui contient 
// un arrangement (donc sans répétition) des nombres allant de 0 à donnee.length.
function genererTabAleatoire (max){	
	while(tabAleatoire.length<max){
		let unNombreAleatoire = Math.floor(Math.random()*max)
		if(tabAleatoire.includes(unNombreAleatoire)){}
		else{tabAleatoire.push(unNombreAleatoire)}
	}
}
genererTabAleatoire(donnees.length)

function genererTabAleatoire2 (max){	
	while(tabAleatoire2.length<max){
		let unNombreAleatoire = Math.floor(Math.random()*max)
		if(tabAleatoire2.includes(unNombreAleatoire)){}
		else{tabAleatoire2.push(unNombreAleatoire)}
	}
}
genererTabAleatoire2(donnees.length)


tabAleatoire3.push(tabAleatoire.concat(tabAleatoire2))

function recommencerLeJeu() {

	for (let i = 0; i<tabCartesDanslaTimeline.length; i++){
		destroy(tabCartesDanslaTimeline[i])
	}
	while (tabCartesDanslaTimeline.length > 0) {
	  tabCartesDanslaTimeline.pop();
	}
	compteurDeCartesDansLaTimeline = 0
	score = 0
	destroyAll("datesOnScreen")
	valeurGameOver = false
	destroyAll("texte0")
	destroyAll("texte1")
	destroyAll("texte2")
	destroyAll("texte3")
	destroyAll("texteGameOver")
	destroyAll("cercleReset")
	tutoriel()
  }

  function timelinePleine() {
	play("sonVictoire",{ volume : 0.4})
		for (i = 0; i < tabCartesDanslaTimeline.length; i++) {
			if (i != 4) {
				destroy(tabCartesDanslaTimeline[i])
			}
		}
// garde l'élément tabCartesDanslaTimeline[4]
	tabCartesDanslaTimeline.pop()
	while (tabCartesDanslaTimeline.length > 1) {
	  tabCartesDanslaTimeline.pop();
	  tabCartesDanslaTimeline.shift();
	}
	tabCartesDanslaTimeline[0].pos.y = 468
	tabCartesDanslaTimeline[0].pos.x = largeur/2
	compteurDeCartesDansLaTimeline = 0
}


// Création d'une fonction "piochant" une carte parmis les donnees
function tirerUneCarte(){
	let indexActuelDansTabAleatoire = tabAleatoire[compteurDeCartesPiochees]
	let derniereCartePiochee = donnees[indexActuelDansTabAleatoire]
	compteurDeCartesPiochees++
	
	let NouvelleCarte = add([
		sprite(`${derniereCartePiochee.nom}`),
		pos(positionDeckX,200),
		area(),
		anchor("center"),
		z(2),
		drag(),
		"NouvelleCarte",
	])
	NouvelleCarte.onClick(() => {
		if (valeurGameOver) {
			window.open(`${derniereCartePiochee.imdb}`, '_blank')
		}
	})
	NouvelleCarte.annee = derniereCartePiochee.annee
    return derniereCartePiochee;
}
tirerUneCarte()

function afficherDates(){
	for(let i =0; i<tabCartesDanslaTimeline.length;i++){
	let datesOnScreen = add([
		text(tabCartesDanslaTimeline[i].annee, {
			font: "VCR",
			size: 28,
		}),
		pos(tabCartesDanslaTimeline[i].pos.x, 335),
		anchor("center"),
		z(50),
		color(255, 255, 255),
		"datesOnScreen"
	]);
}
}

function tutoriel(){
	if(valeurGameOver == false){
	if(score==0){
		const texte0 = add([
			text("Glissez l'affiche dans la frise chronologique", {
				font: "VCR",
				size: 28,
			}),
			pos(largeur/2.3, 225),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte0"
		]);
}
	else if(score==1){
		destroyAll("texte0")
		const texte1 = add([
			text("<= Plus vieux ? ou plus récent ? =>", {
				font: "VCR",
				size: 28,
			}),
			pos(largeur/2, 225),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte1"
		]);
	}
	else if(score==2){
		destroyAll("texte1")
		const texte1 = add([
			text("Bravo ! Et maintenant ?", {
				font: "VCR",
				size: 28,
			}),
			pos(largeur/2, 225),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte2"
		]);
	}
	else if(score==10){
		const texte1 = add([
			text("Jusqu'où peux-tu aller ?", {
				font: "VCR",
				size: 28,
			}),
			pos(largeur/2, 225),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte3"
		]);
	}
	else{
		destroyAll("texte2")
		destroyAll("texte3")
	}
}
else{
	destroyAll("texte0")
	destroyAll("texte1")
	destroyAll("texte2")
	destroyAll("texte3")
}
}

tutoriel()




const timeline = add([
    pos(largeur*0.5, hauteur*0.78),
    rect(largeurTimeline, hauteurTimeline),
    outline(4),
	z(0),
    color(255,140,0),
    anchor("center"),
    "timeline",
]);
const scoreTexte = add([
    text("SCORE", {
        font: "VCR",
    }),
    pos(20, hauteur/10),
    anchor("left"),
    z(50),
    color(255, 255, 255),
]);
const scoreNombre = add([
text(score, {
    font: "VCR",
}),
pos(150, hauteur/10),
anchor("left"),
z(50),
color(77, 255, 0),
{
    update() {
        this.text = score
    }
}
]);
const highscoreTexte = add([
    text("HIGHSCORE", {
        font: "VCR",
		size : 20
    }),
    pos(20, hauteur/10 +30),
    anchor("left"),
    z(50),
    color(255, 255, 255),
]);
const highscoreNombre = add([
text(highscore, {
    font: "VCR",
	size : 20
}),
pos(150, hauteur/10 +30),
anchor("left"),
z(50),
color(77, 255, 0),
{
    update() {
        this.text = getData("highscore")
    }
}
]);
const deck = add([
	sprite("card back"),
	pos(positionDeckX,200),
	anchor("center"),
	scale(1.5),
	area(),
	z(1),
	"deck",
])
const reset = add([
	sprite("reset"),
	color(0, 65, 255),
	pos(largeur-70,hauteur/9),
	anchor("center"),
	scale(0.15),
	area(),
	z(10),
	"reset",
])
onClick("reset", (reset) => recommencerLeJeu())

//fermeture de la scene "game"
//})

//fermeture de d3
})
